var expect = require('chai').expect;
var nock = require('nock');
var Players = require('../../app/lib/players');
var data = require('../data')

describe('Players', function() { 

  var url = 'http://api.football-data.org';
  var players;

  function mockEndPoint(queryString, data) {  
    nock(url)
      .get('/' + queryString)
      .reply(200, data)
  };

  beforeEach(function() { 
    mockEndPoint('alpha/soccerseasons/354', data.premierLeagueJSON);
    mockEndPoint('alpha/soccerseasons/354/teams', data.teamsJSON);
    mockEndPoint('alpha/soccerseasons', data.allLeaguesJSON);
    mockEndPoint('alpha/teams/74/players', data.westBromAllPlayers);
    players = new Players();
  });

  it('should get all players from a team', function(done) { 
    players.all('PL', 'WBA', function(err, players) { 
      expect(players).to.eql(data.westBromAllPlayers);
      done();
    });
  });

  it('should get all player names from a team', function(done) { 
    players.allNames('PL', 'WBA', function(err, players) { 
      expect(players).to.eql(data.westBromPlayersArray);
      done();
    });
  });

  it('should get a specific player from a team', function(done) { 
    players.find('PL', 'WBA', 'Saido Berahino', function(err, player) { 
      expect(player).to.eql(data.berahino);
      done();
    });
  });
});