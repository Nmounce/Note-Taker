const fb = require('express').Router();
const {
    readAndAppend
} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the feedback
fb.get('/', (req, res) =>
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
fb.post('/', (req, res) => {
    // Destructuring assignment for the items in req.body
    const {
        noteTitle,
        noteText
    } = req.body;

    // If all the required properties are present
    if (noteTitle && noteText) {
        // Variable for the object we will save
        const newNote = {
            noteTitle,
            noteText,
            note_id: uuid(),
        };

        readAndAppend(newNote, './db/notes.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting note');
    }
});

module.exports = fb;