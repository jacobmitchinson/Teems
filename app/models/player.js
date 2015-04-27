var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({ 
  name: String,
  screenName: String,
  twitterID: String 
});

exports.Player = mongoose.model('Player', playerSchema);