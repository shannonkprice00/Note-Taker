const fs = require("fs");
const util = require("util");

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 3), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let parsedData;
      try {
        parsedData = JSON.parse(data);
      } catch (err) {
        console.error(err);
      }
      if (!Array.isArray(parsedData)) {
        console.error("parsedData is not an array");
        parsedData = [];
      }
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

const readAndDelete = (noteId, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const newParsedData = JSON.parse(data);
      const filteredData = newParsedData.filter((obj) => obj.id !== noteId);

      if (filteredData.length === newParsedData.length) {
        console.log(`Object with id:${noteId} not found`);
      } else {
        writeToFile(file, filteredData);
        console.log(`Object with id:${noteId} removed`);
      }
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete };
