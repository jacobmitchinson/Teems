var request = require('request');
var options = {
                headers: {
                'X-Auth-Token': process.env.FOOTBALL_DATA
                },
                uri: 'http://api.football-data.org/alpha/soccerseasons',
                method: 'GET'
              }

var Leagues = function() {
  this.currentLeague = {};
};

Leagues.prototype.all = function(callback) {
  request(options, function (err, res, body) {
    callback(err, body);
  });
};

Leagues.prototype.find = function(league, callback) {
  if(this._check(league))  { 
    callback(null, this.currentLeague);
  } else { 
    this._searchLeague(league, callback)
  }
};

Leagues.prototype._searchLeague = function(league, callback) {
  var that = this;
  this.all(function(err, leagues) { 
    var leagueJSON = that._findLeague(JSON.parse(leagues), league);
    this.currentLeague = leagueJSON;
    callback(err, leagueJSON);
  });
};

Leagues.prototype._check = function(league) {
  if(league === this.currentLeague.code) { 
    return true;
  }
};

Leagues.prototype._findLeague = function(leagues, league) {
  for(var i = 0; i < leagues.length; i++) { 
    var leagueNameJSON = leagues[i].league;
    if(leagues[i].league === league) {
      return leagues[i];
    };
  }
};

module.exports = Leagues;