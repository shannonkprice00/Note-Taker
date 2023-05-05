const notes = require('express').Router();
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');
const {v4 : uuidv4} = require('uuid');

// Get route for retrieving all note items
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for note items`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Post route for a new note
notes.post('/', (req, res) => {
    console.info(`${req.method} request recieved to add new note`);
    console.log(req.body);

    const { title, text } = req.body;

    if(req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`)
    } else {
        res.err('Error in adding note');
    }
});

// Delete route to delete notes
notes.delete('/:id', (req, res) => {
    console.info(`${req.method} request recieved to delete note`);
    // grab the id from the url req
    const id = req.params.id
    console.log(id);

    if(id != null) {
        readAndDelete(id, './db/db.json')
        res.json(`Note deleted successfully 🗑️`)
    } else {
        res.err('Error in deleting note');
    }
})

module.exports = notes;