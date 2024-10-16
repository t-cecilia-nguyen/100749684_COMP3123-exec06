const express = require('express');
const router = express.Router();
const NoteModel = require('../models/NotesModel');

//http://mongoosejs.com/docs/api.html#document_Document-save
router.post('/notes', async (req, res) => {
    try {
        // Validate request
        if(!req.body.noteTitle || !req.body.noteDescription || !req.body.priority) {
            return res.status(400).send({ message: "Note content cannot be empty" });
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
    try {
        //TODO - Write your code here to return onlt one note using noteid
        const note = await NoteModel.findById(req.params.noteId);
        if (!note) {
            return res.status(404).send({ message: "Note not found with id " + req.params.noteId });
        }
        res.send(note);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving note with id " + req.params.noteId });
    }
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
router.put('/notes/:noteId', async (req, res) => {
    try {
        // Validate request
        if(!req.body.noteTitle || !req.body.noteDescription || !req.body.priority) {
            return res.status(400).send({ message: "Note content can not be empty" });
        }
        //TODO - Write your code here to update the note using noteid
        const note = await NoteModel.findById(req.params.noteId);

        if (!note) {
            return res.status(404).send({ message: "Note not found with id " + req.params.noteId });
        }

        note.noteTitle = req.body.noteTitle;
        note.noteDescription = req.body.noteDescription;
        note.priority = req.body.priority;
        note.dateUpdated = new Date();

        await note.save();

        res.status(200).send(note);
    } catch (error) {
        res.status(500).send({ message: "Error updating note with id " + req.params.noteId });
    }
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
router.delete('/notes/:noteId', async (req, res) => {
    try {
        // Validate request
        const note = await NoteModel.findByIdAndDelete(req.params.noteId);
        if (!note) {
            return res.status(404).send({ message: "Note not found with id " + req.params.noteId });
        }
        //TODO - Write your code here to delete the note using noteid
        res.send({ message: "Note deleted successfully!" });
    } catch (error) {
        res.status(500).send({ message: "Could not delete note with id " + req.params.noteId });
    }
});

module.exports = router;