var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({ 
  name: String,
  team: String,
  position: String,
  jerseyNumber: Number,
  dateOfBirth: String,
  contractUntil: String,
  nationality: String,
  location: String,
  marketValue: Number,
  twitterUrl: String,
  screenName: String,
  twitterID: Number,
  followersCount: Number,
  friendCount: Number 
});

// playerSchema.prototype.convertDOB = function(DOB) {
//   new Date('2011-04-11')
// };

exports.Player = mongoose.model('Player', playerSchema);