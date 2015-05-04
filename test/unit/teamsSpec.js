var expect = require('chai').expect; 
var nock = require('nock');
var Teams = require('../../app/lib/teams.js');
var data = require('../data');

describe('Teams', function() { 
  
  var url = 'http://api.football-data.org';
  var teams;

  function mockEndPoint(queryString, data) {  
    nock(url)
      .get('/' + queryString)
      .reply(200, data)
  };

  beforeEach(function() {
    mockEndPoint('alpha/soccerseasons/354', data.premierLeagueJSON);
    mockEndPoint('alpha/soccerseasons/354/teams', data.teamsJSON);
    mockEndPoint('alpha/soccerseasons', data.allLeaguesJSON);
    teams = new Teams();
  });

  it('should get all teams', function(done) { 
    teams.all('PL', function(err, body) { 
      expect(body).to.eql(data.teamsJSON);
      done();
    });
  });

  it('should get a specific team', function(done) { 
    teams.find('PL', 'WBA', function(err, team) { 
      expect(team).to.eql(data.westBrom);
      done();
    });
  });

  it('should return saved team if already saved', function(done) { 
    teams.currentTeam = { code: 'WBA' };
    teams.find('PL', 'WBA', function(err, team) { 
      expect(team).to.eql(teams.currentTeam);
      done();
    });
  });
});