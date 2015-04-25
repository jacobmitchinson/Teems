var request = require('request');

var Teams = function() {

};

Teams.prototype.all = function(league, callback) {
  var leagueURL = league._links.teams.href;
  request.get(leagueURL, function(err, res, body) { 
    callback(err, body);
  });
};

Teams.prototype.find = function(league, team, callback) {
  var that = this;
  this.all(league, function(err, teams) { 
    var teamJSON = that._findTeam(JSON.parse(teams), team);
    callback(err, teamJSON);
  });
};

Teams.prototype._findTeam = function(teams, team) {
  for(var i = 0; i < teams.teams.length; i++) { 
    var teamNameJSON = teams.teams[i].code;
    var regEx = new RegExp(team, 'g');
    var match = teamNameJSON.match(regEx);
    if(match) { 
      return teams.teams[i];
    };
  }
};


module.exports = Teams;