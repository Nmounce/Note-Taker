const express = require('express');
const path = require('path');
const noteData = require('./db/notes.json');
const fs = require('fs');
const uuid = require('./helpers/uuid');

const PORT = process.env.port || 3001;

const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {

    res.json(noteData)
});

app.post('/api/notes', (req, res) => {
    const data = req.body;
    data.id = uuid();
    noteData.push(data)
    fs.writeFileSync('./db/notes.json', JSON.stringify(noteData));
    res.json(noteData);
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(PORT, () => {
    console.log('Hello')
});