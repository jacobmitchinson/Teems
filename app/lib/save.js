'use strict';
var Leagues = require('./leagues');
var Teams = require('./teams');
var Players = require('./players');
var FootBallerTwitterID = require('./tweets');
var Player = require('../models/player').Player;
var config = require('../config/databaseSetup');
var mongoose = require('mongoose');
mongoose.connect(config.db[process.env.NODE_ENV]);

var Save = function() { 
  this.twitterID = new FootBallerTwitterID();
  this.players = new Players();
}

Save.prototype.player = function(league, team, player, callback) {
  var that = this;
  this.players.find(league, team, player, function(err, desiredPlayer) { 
    that.twitterID.get(desiredPlayer.name, function(err, twitterPlayer) { 
      var playerJSON = that._generatePlayer(desiredPlayer, twitterPlayer);
      that._addToDatabase(playerJSON, callback);
    });
  });  
};

Save.prototype._generatePlayer = function(desiredPlayer, twitterPlayer) {
  desiredPlayer.marketValue = this._generateMarketValue(desiredPlayer);
  desiredPlayer.twitterID = twitterPlayer['id']; 
  desiredPlayer.location = twitterPlayer['location'];
  desiredPlayer.followersCount = twitterPlayer['followers_count'];
  return desiredPlayer;
};

Save.prototype._generateMarketValue = function(desiredPlayer) {
  var str = desiredPlayer.marketValue.slice(0, -1);
  var num = parseFloat(str.replace(/\,/g, ""));
  return num;
};

Save.prototype._addToDatabase = function(desiredPlayer, callback) {
  Player.create(desiredPlayer, function(err, createdPlayer) { 
    console.log(err);
    callback(true) 
  });
};

module.exports = Save;