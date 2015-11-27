var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
  body: String,
  createdAt : { type : Date, default: Date.now },
  updatedAt : { type : Date, default: Date.now }
});

module.exports = mongoose.model('Note', NoteSchema);