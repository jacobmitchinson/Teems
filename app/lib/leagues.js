var request = require('request');

var Leagues = function() {};

Leagues.prototype.all = function(callback) {
  request.get('http://api.football-data.org/alpha/soccerseasons', function(err, res, body) { 
    callback(err, body);
  }); 
};

Leagues.prototype.find = function(league, callback) {
  var that = this;
  this.all(function(err, leagues) { 
    var leagueJSON = that._findLeague(JSON.parse(leagues), league);
    callback(err, leagueJSON);
  });
};

Leagues.prototype._findLeague = function(leagues, league) {
  for(var i = 0; i < leagues.length; i++) { 
    var leagueNameJSON = leagues[i].caption;
    var regEx = new RegExp(league, 'g');
    var match = leagueNameJSON.match(regEx);
    if(match) { 
      return leagues[i];
    };
  }
};

module.exports = Leagues;