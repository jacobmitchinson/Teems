var request = require('request');
var Twit = require('twit');

var Twitter = function() { 
  this.twitter = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
  this.waitTime = 900000;
}

Twitter.prototype.get = function(name, callback) {
  var that = this;
  this.isSearchLimitExceeded(function(err, isExceeded) { 
    that.check(name, isExceeded, callback);
  });
};

Twitter.prototype.check = function(name, isExceeded, callback) {
  if(isExceeded) { 
    this._wait(name, callback);
  } else { 
    this._userSearch(name, callback)
  }
};

Twitter.prototype._userSearch = function(name, callback) {
  var that = this;
  this.twitter.get('users/search', {q: name} ,function(err, data, response) {
    var player = that._findCorrectID(data, name);
    callback(err, player, response);
  });
};

Twitter.prototype._wait = function(name, callback) {
  var that = this;
  setTimeout(function() {
    that.isSearchLimitExceeded(function(err, isExceeded) { 
      that.check(name, isExceeded, callback);
    });
  }, this.waitTime);
};

Twitter.prototype.isSearchLimitExceeded = function(callback) {
  this._getRateLimit(function(err, data) { 
    if(data.resources.users["/users/search"].remaining === 0) { 
      callback(err, true);
    } else { 
      callback(err, false);
    }
  });
};

Twitter.prototype._getRateLimit = function(callback) {
  this.twitter.get('application/rate_limit_status', function(err, data) { 
    callback(err, data);
  });
};

Twitter.prototype._findCorrectID = function(data, footballerName) {
  for(var i = 0; i < data.length; i++) { 
    if(this._checkName(footballerName, data[i]) && this._checkVerified(data[i])) { 
      return data[i];
    }
  }
};

Twitter.prototype._checkName = function(footballerName, data) {
  var playerName = data.name;
  var regEx = new RegExp(footballerName, 'g');
  var match = playerName.match(regEx);
  if(match) { 
    return true;
  }
};

Twitter.prototype._checkVerified = function(data) {
  if(data.verified) { 
    return true;
  }
};

module.exports = Twitter;