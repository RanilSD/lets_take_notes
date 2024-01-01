//importing dependencies

const router = require('express').Router();
const archive = require('..db/archive');

//get route to respond with everything from the db

router.get('/notes', (req, res) => {
    archive
    .getNotes()
        .then((notes) => {
            return res.json(notes);
        })
        .catch((error) => res.status(500).json(error));
});

//post route to add notes and all other info pertaining with notes to the db

router.post('/notes', (req, res) => {
    archive
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((error) => res.status(500).json(error));
});

//delete route to delete note and all pertaining info with note from db

router.delete('/notes/:id', (req, res) => {
    archive
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((error) => res.status(500).json(error));
});

//exporting the routes

module.exports = router;