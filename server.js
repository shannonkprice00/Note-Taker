const express = require('express');
const path = require('path');
const api = require('./routes/index');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', api);

// Get route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

// Get route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
});

// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/404.html'))
);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT} 🚀`)
})