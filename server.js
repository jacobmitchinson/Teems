var app = require('express')();
var http = require('http');
var config = require('./config');
var mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.use('/js', express.static(__dirname + '/public/js'))
app.use('/css', express.static(__dirname + '/public/css'));

app.configure(function() { 
  app.set('dbUrl', config.db[app.settings.env]);
  mongoose.connect(app.get('dbUrl'));
});

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(9990, function() {
  console.log("Server listening on port 9990");
});