var expect = require('chai').expect; 
var nock = require('nock');
var Leagues = require('../../app/lib/leagues.js');
var leagues = new Leagues(); 
var data = require('../data');

describe('League', function() { 

  var url = 'http://api.football-data.org';

  function mockEndPoint(queryString, data) { 
    nock(url)
      .get('/' + queryString)
      .reply(200, data)
  };

  beforeEach(function() { 
    mockEndPoint('alpha/soccerseasons', data.allLeaguesJSON);
  });

  it('should get all leagues', function(done) { 
    leagues.all(function(err, league) {
      expect(league).to.eql(data.allLeaguesJSON);
      done();
    });
  });

  it('should get a specific league', function(done) { 
    mockEndPoint('alpha/soccerseasons/354', data.premierLeagueJSON);
    leagues.find('PL', function(err, league) { 
      expect(league).to.eql(data.premierLeagueJSON);
      done();
    });
  });

  it('should return saved league if already saved', function(done) { 
    leagues.currentLeague = { code: 'PL' };
    leagues.find('PL', function(err, league) { 
      expect(league).to.eql(leagues.currentLeague);
      done();
    });
  });
});