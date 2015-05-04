'use strict';
var expect = require('chai').expect;
var Player = require('../../app/models/player').Player;
var nock = require('nock');
var helper = require('../specHelper');
var Save = require('../../app/lib/save');
var jsonData = require('../data');

describe('Save', function() { 

  var apiUrl = 'https://api.twitter.com/';
  var save;

  function mockEndPoint(url, queryString, data) { 
    nock(url)
      .get('/' + queryString)
      .reply(200, data)
  };

  function mockRateLimitNotExceeded() { 
    mockEndPoint(apiUrl, '1.1/application/rate_limit_status.json', jsonData.rateLimitData);
  }

  function mockAllLeagues() { 
    mockEndPoint(jsonData.footballDataUrl, 'alpha/soccerseasons', jsonData.allLeaguesJSON);
  }

  function mockPremierLeague() { 
    mockEndPoint(jsonData.footballDataUrl, 'alpha/soccerseasons/354', jsonData.premierLeagueJSON);
  }

  function mockPremierLeagueTeams() { 
    mockEndPoint(jsonData.footballDataUrl, 'alpha/soccerseasons/354/teams', jsonData.teamsJSON);
  }
 
  function mockWestBromAllPlayers() { 
    mockEndPoint(jsonData.footballDataUrl, 'alpha/teams/74/players', jsonData.westBromAllPlayers);
  }

  function mockPlayer() {
  mockEndPoint(jsonData.twitterUrl, '1.1/users/search.json?q=Saido%20Berahino', jsonData.berahinoData); 
  }

  beforeEach(function() { 
    mockAllLeagues();
    mockPremierLeague();
    mockPremierLeagueTeams();
    mockWestBromAllPlayers();
    mockPlayer();
    mockRateLimitNotExceeded();
    save = new Save();
  });

  it('should save a players name', function(done) { 
   save.player('PL', 'WBA', 'Saido Berahino', function(err, data) { 
     Player.find({ name: /^Saido Berahino/ }, function(err, player) { 
       expect(player[0].name).to.equal('Saido Berahino');
       done();
     });
   }); 
  });

  it('should save a player twitter ID to the database', function(done) { 
    save.player('PL', 'WBA', 'Saido Berahino', function(err, data) { 
      Player.find({ name: /^Saido Berahino/ }, function(err, player) { 
        expect(player[0].twitterID).to.equal(479896709);
        done();
      });
    });
  });

  it('should save the market value of the player', function(done) { 
    save.player('PL', 'WBA', 'Saido Berahino', function(err, data) { 
      Player.find({ name: /^Saido Berahino/ }, function(err, player) { 
        expect(player[0].marketValue).to.equal(12000000);
        done();
      });
    });
  });
});