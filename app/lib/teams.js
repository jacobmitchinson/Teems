var Leagues = require('./leagues');
var request = require('request');

var Teams = function() {
  this.leagues = new Leagues();
  this.currentTeam = {};
  this.options = {
                    headers: {
                    'X-Auth-Token': process.env.FOOTBALL_DATA
                    },
                    method: 'GET'
                  }  
};

Teams.prototype.all = function(league, callback) {
  var that = this;
  this._getLeagueURL(league, function(err, leagueURL) { 
    that.options.uri = leagueURL;
    request(that.options, function(err, res, teams) {
      callback(err, teams);
    });  
  });
};

Teams.prototype.find = function(league, team, callback) {
  if(this._isCurrentTeam(team)) { 
    callback(null, this.currentTeam);
  } else { 
    this._searchTeam(league, team, callback);
  }
};

Teams.prototype._searchTeam = function(league, team, callback) {
  var that = this;
  this.all(league, function(err, teams) { 
    var teamJSON = that._findTeam(JSON.parse(teams), team);
    that.currentTeam = teamJSON;
    callback(err, teamJSON);
  });
};

Teams.prototype._isCurrentTeam = function(team) {
  if(team === this.currentTeam.code) { 
    return true;
  }
};

Teams.prototype._getLeagueURL = function(league, callback) {
  this.leagues.find(league, function(err, foundLeague) { 
    var leagueURL = foundLeague._links.teams.href;
    callback(err, leagueURL);
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