var express = require('express');
require('dotenv').load();

var mongoose = require('mongoose');
var noteModel = require('./models/note');
mongoose.connect('mongodb://localhost:27017/node_mongo_app_template');

var app = express();
app.set('view engine', 'jade');
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {
  noteModel.find({}, function(err, notes) {
    if (err) throw err;
    // NOTE: In Node.js, __dirname is always the directory in which the currently executing script resides.
    res.render(__dirname + '/public/views/home.jade',
      { notesToRender: notes}
    )
  });
})

app.get('/notes/new', function (req, res) {
  res.render(__dirname + '/public/views/notes/new.jade')
})

app.post('/notes', function (req, res) {
  var newNote = new noteModel();
  newNote.body = req.body.body;
  newNote.save(function(err) {
    if (err)
      res.send(err);
    res.redirect('/');
  });
})

var server = app.listen(3000, function (err) {
  if (err) throw err;
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});