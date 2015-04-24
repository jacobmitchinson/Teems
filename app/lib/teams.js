var Teams = function(league) {
  this.league = league;
};

Teams.prototype.all = function(callback) {
  var leagueURL = this._league(premierLeagueJSON._links.teams.href);
  this._request(leagueLink, function(res) { 
    
  });
};

Teams.prototype._league = function() {
  return this.league;
};

Teams.prototype._request = function(url, callback) {
  http.get(url, callback);
};

module.exports = Teams;