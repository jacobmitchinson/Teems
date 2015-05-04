var request = require('request');
var Teams = require('./teams');

var Players = function() { 
  this.teams = new Teams();
  this.options =  {
                    headers: {
                    'X-Auth-Token': process.env.FOOTBALL_DATA
                    },
                    method: 'GET'
                  }
}

Players.prototype.all = function(league, team, callback) {
  var that = this;
  this._getPlayersURL(league, team, function(err, playersURL) { 
    that.options.uri = playersURL;
    request(that.options, function(err, res, body) { 
      callback(err, body);
    });
  });
};

Players.prototype.find = function(league, team, player, callback) {
  var that = this;
  this.all(league, team, function(err, players) { 
    var wantedPlayer = that._searchForPlayer(JSON.parse(players), player);
    callback(err, wantedPlayer);
  });
};

Players.prototype.allNames = function(league, team, callback) {
  var that = this;
  var allPlayers = [];
  this.all(league, team, function(err, players) { 
    var players = JSON.parse(players);
    for(var i = 0; i < players.players.length; i++) { 
      allPlayers.push(players.players[i].name);
    };
    callback(err, allPlayers);  
  });
};

Players.prototype._getPlayersURL = function(league, team, callback) {
  var that = this;
  this.teams.find(league, team, function(err, desiredTeam) { 
    that.currentTeam = desiredTeam;
    var playersURL = desiredTeam._links.players.href;
    callback(err, playersURL);
  });
};

Players.prototype._searchForPlayer = function(players, player) {
  for(var i = 0; i < players.players.length; i++) { 
    var playerNameJSON = players.players[i].name;
    var regEx = new RegExp(player, 'g');
    var match = playerNameJSON.match(regEx);
    if(match) {
      return players.players[i];
    }
  };
};

module.exports = Players;