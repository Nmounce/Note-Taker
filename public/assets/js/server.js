const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');

const PORT = process.env.port || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/public/db', (req, res) => res.json(noteData));

app.listen(PORT, () => {
    console.log('Hello')
});