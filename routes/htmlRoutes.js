//importing dependencies

const path = require('path');
const router = require('express').Router();

//getting the notes in db to interact with notes.html file

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

//getting all the routes to interact with the index.html file

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

//exporting routes

module.exports = router;