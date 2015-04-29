var request = require('request');

var Teams = function() {

};

Teams.prototype.all = function(league, callback) {
  var leagueURL = league._links.teams.href;
  var options = {
                  headers: {
                  'X-Auth-Token': process.env.FOOTBALL_DATA
                  },
                  uri: leagueURL,
                  method: 'GET'
                }
  request(options, function(err, res, body) {
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
    if(teams.teams[i].code === team) { 
      return teams.teams[i];
    };
  }
};

module.exports = Teams;