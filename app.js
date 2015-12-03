// NOTE: In Node.js, __dirname is always the directory in which the currently executing script resides.

var express = require('express');
require('dotenv').load();

var mongoose = require('mongoose');
var noteModel = require('./models/note');
mongoose.connect('mongodb://localhost:27017/node_mongo_app_template');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'jade');
app.use(express.static('public'));

app.get('/', function (req, res) {
  noteModel.find({}, function(err, notes) {
    if (err) res.send(err);
    res.render(__dirname + '/public/views/home.jade',
      { notesToRender: notes }
    )
  });
});

app.get('/notes/new', function (req, res) {
  res.render(__dirname + '/public/views/notes/new.jade')
});

app.post('/notes', function (req, res) {
  var newNote = new noteModel();
  newNote.body = req.body.body;
  newNote.save(function(err) {
    if (err) res.send(err);
    res.redirect('/');
  });
});

app.get('/notes/delete/:id', function (req, res) {
  noteModel.findByIdAndRemove(req.params.id, req.body, function (err, deletedNote) {
    if (err) res.send(err);
    noteModel.find({}, function(err, notesToRender) {
      if (err) res.send(err);
      res.render(__dirname + '/public/views/home.jade',
        { deletedNote: deletedNote, notesToRender: notesToRender }
      )
    });
  });
});

var server = app.listen(3000, function (err) {
  if (err) throw err;
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});