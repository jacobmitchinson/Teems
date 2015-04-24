var http = require('http');

var Leagues = function() {};

Leagues.prototype.all = function(callback) {
  this._request('http://api.football-data.org/alpha/soccerseasons', function(res) { 
    callback(res.statusCode);
  }); 
};

Leagues.prototype.find = function(league, callback) {
  var that = this;
  this.all(function(leagues) { 
    var leagueJSON = that._findLeague(leagues, league);
    callback(leagueJSON);
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

Leagues.prototype._request = function(url, callback) {
  http.get(url, callback);
};

module.exports = Leagues;