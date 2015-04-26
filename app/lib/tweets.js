var request = require('request');
var Twit = require('twit');

var findFootballer = function() { 
  this.twitter = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
}

findFootballer.prototype.get = function(footballerName, callback) {
  var that = this;
  this.twitter.get('users/search', {q: footballerName} ,function(err, data, response) {
    var player = that._findCorrectID(data, footballerName);
    callback(err, player, response);
  });
};

findFootballer.prototype._findCorrectID = function(data, footballerName) {
  for(var i = 0; i < data.length; i++) { 
    if(this._checkName(footballerName, data[i]) && this._checkVerified(data[i])) { 
      return data[i].id;
    }
  }
};

findFootballer.prototype._checkName = function(footballerName, data) {
  var playerName = data.name;
  var regEx = new RegExp(footballerName, 'g');
  var match = playerName.match(regEx);
  if(match) { 
    return true;
  }
};

findFootballer.prototype._checkVerified = function(data) {
  if(data.verified) { 
    return true;
  }
};

module.exports = findFootballer;

