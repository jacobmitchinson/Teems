var app = require('express')();
var http = require('http');

app.set('view engine', 'ejs');
app.use('/js', express.static(__dirname + '/public/js'))
app.use('/css', express.static(__dirname + '/public/css'));

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(9990, function() {
  console.log("Server listening on port 9990");
});