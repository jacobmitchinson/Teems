var request = require('request');

var Players = function() { 

}

Players.prototype.all = function(team, callback) {
  var playersURL = team._links.players.href;
  var options = {
                  headers: {
                  'X-Auth-Token': process.env.FOOTBALL_DATA
                  },
                  uri: playersURL,
                  method: 'GET'
                }
  request(options, function(err, res, body) { 
    callback(err, body);
  });
};

Players.prototype.find = function(team, player, callback) {
  var that = this;
  this.all(team, function(err, players) { 
    var wantedPlayer = that._searchForPlayer(JSON.parse(players), player);
    callback(err, wantedPlayer);
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