const mongoose = require('mongoose');

//TODO - Create Note Schema here having fields
const noteSchema = new mongoose.Schema({
//      - noteTitle
    noteTitle: { type: String, required: true },
//      - noteDescription
    noteDescription: { type: String, required: true },
//      - priority (Value can be HIGH, LOW or MEDUIM)
    priority: { type: String, enum: ['HIGH', 'LOW', 'MEDIUM'], required: true },
//      - dateAdded
    dateAdded: { type: Date, default: Date.now },
//      - dateUpdated
    dateUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', noteSchema);