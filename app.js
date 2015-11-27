var express = require('express');
var app = express();
var mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://localhost:27017/node_mongo_app_template', function(err, db) {
  if (err) {
    throw err;
  }
});

require('dotenv').load();
app.set('view engine', 'jade');
app.use(express.static('public'));

app.get('/', function (req, res) {
  // NOTE: In Node.js, __dirname is always the directory in which the currently executing script resides.
  res.render(__dirname + '/public/views/hello_world.jade',
    { apiKey: process.env.api_key}
  )
})

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});