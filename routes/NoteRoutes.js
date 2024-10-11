const express = require('express');
const router = express.Router();
const NoteModel = require('../models/NotesModel');

//http://mongoosejs.com/docs/api.html#document_Document-save
router.post('/notes', async (req, res) => {
    // Validate request
    try {
        if(!req.body.noteTitle || !req.body.noteDescription || !req.body.priority) {
            return res.status(400).send({ message: "Note content can not be empty" });
        }
        //TODO - Create a new Note
        const note = new NoteModel({
            noteTitle: req.body.noteTitle,
            noteDescription: req.body.noteDescription,
            priority: req.body.priority,
        });
        //TODO - Write your code here to save the note
        await note.save();
        res.send(note);
    } catch (error) {
        res.status(500).send({ message: "Error creating note!" });
    }
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
router.get('/notes', async (req, res) => {
    //TODO - Write your code here to returns all note
    try {
        const notes = await NoteModel.find();
        res.send(notes);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving notes!" });
    }
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
router.get('/notes/:noteId', async (req, res) => {
    //TODO - Write your code here to return onlt one note using noteid
    try {
        const note = await NoteModel.findById(req.params.noteId);
        if (!note) {
            return res.status(404).send({ message: "Note not found with id " + req.params.noteId });
        }
        res.send(note);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving note with id " + req.params.noteId });
    }
});

// //TODO - Update a Note with noteId
// //http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
// app.put('/notes/:noteId', (req, res) => {
//     // Validate request
//     if(!req.body.content) {
//         return res.status(400).send({
//             message: "Note content can not be empty"
//         });
//     }
//     //TODO - Write your code here to update the note using noteid
// });

// //TODO - Delete a Note with noteId
// //http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
// app.delete('/notes/:noteId', (req, res) => {
//     // Validate request
//     if(!req.body.content) {
//         return res.status(400).send({
//             message: "Note content can not be empty"
//         });
//     }
//     //TODO - Write your code here to delete the note using noteid
// });

module.exports = router;