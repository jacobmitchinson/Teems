var expect = require('chai').expect; 
var nock = require('nock');
var Leagues = require('../../app/lib/leagues.js');
var leagues = new Leagues(); 

describe('League', function() { 

  var url = 'http://api.football-data.org';
  var allLeaguesJSON = '[{"_links":{"self":{"href":"http://api.football-data.org/alpha/soccerseasons/351"},"teams":{"href":"http://api.football-data.org/alpha/soccerseasons/351/teams"},"fixtures":{"href":"http://api.football-data.org/alpha/soccerseasons/351/fixtures"},"leagueTable":{"href":"http://api.football-data.org/alpha/soccerseasons/351/leagueTable"}},"caption":"1. Bundesliga 2014/15","league":"BL1","year":"2014","numberOfTeams":18,"numberOfGames":306,"lastUpdated":"2015-04-19T18:14:17Z"},{"_links":{"self":{"href":"http://api.football-data.org/alpha/soccerseasons/352"},"teams":{"href":"http://api.football-data.org/alpha/soccerseasons/352/teams"},"fixtures":{"href":"http://api.football-data.org/alpha/soccerseasons/352/fixtures"},"leagueTable":{"href":"http://api.football-data.org/alpha/soccerseasons/352/leagueTable"}},"caption":"2. Bundesliga 2014/15","league":"BL2","year":"2014","numberOfTeams":18,"numberOfGames":306,"lastUpdated":"2015-04-21T09:55:01Z"},{"_links":{"self":{"href":"http://api.football-data.org/alpha/soccerseasons/353"},"teams":{"href":"http://api.football-data.org/alpha/soccerseasons/353/teams"},"fixtures":{"href":"http://api.football-data.org/alpha/soccerseasons/353/fixtures"},"leagueTable":{"href":"http://api.football-data.org/alpha/soccerseasons/353/leagueTable"}},"caption":"3. Bundesliga 2014/15","league":"BL3","year":"2014","numberOfTeams":20,"numberOfGames":380,"lastUpdated":"2015-04-19T15:26:04Z"},{"_links":{"self":{"href":"http://api.football-data.org/alpha/soccerseasons/354"},"teams":{"href":"http://api.football-data.org/alpha/soccerseasons/354/teams"},"fixtures":{"href":"http://api.football-data.org/alpha/soccerseasons/354/fixtures"},"leagueTable":{"href":"http://api.football-data.org/alpha/soccerseasons/354/leagueTable"}},"caption":"Premier League 2014/15","league":"PL","year":"2014","numberOfTeams":20,"numberOfGames":380,"lastUpdated":"2015-04-19T18:15:55Z"},{"_links":{"self":{"href":"http://api.football-data.org/alpha/soccerseasons/355"},"teams":{"href":"http://api.football-data.org/alpha/soccerseasons/355/teams"},"fixtures":{"href":"http://api.football-data.org/alpha/soccerseasons/355/fixtures"},"leagueTable":{"href":"http://api.football-data.org/alpha/soccerseasons/355/leagueTable"}},"caption":"Ligue 1 2014/15","league":"FL1","year":"2014","numberOfTeams":20,"numberOfGames":380,"lastUpdated":"2015-04-19T20:53:07Z"},{"_links":{"self":{"href":"http://api.football-data.org/alpha/soccerseasons/356"},"teams":{"href":"http://api.football-data.org/alpha/soccerseasons/356/teams"},"fixtures":{"href":"http://api.football-data.org/alpha/soccerseasons/356/fixtures"},"leagueTable":{"href":"http://api.football-data.org/alpha/soccerseasons/356/leagueTable"}},"caption":"Ligue 2 2014/15","league":"FL2","year":"2014","numberOfTeams":20,"numberOfGames":380,"lastUpdated":"2015-04-21T09:55:10Z"},{"_links":{"self":{"href":"http://api.football-data.org/alpha/soccerseasons/357"},"teams":{"href":"http://api.football-data.org/alpha/soccerseasons/357/teams"},"fixtures":{"href":"http://api.football-data.org/alpha/soccerseasons/357/fixtures"},"leagueTable":{"href":"http://api.football-data.org/alpha/soccerseasons/357/leagueTable"}},"caption":"Serie A 2014/15","league":"SA","year":"2014","numberOfTeams":20,"numberOfGames":380,"lastUpdated":"2015-04-21T09:55:41Z"},{"_links":{"self":{"href":"http://api.football-data.org/alpha/soccerseasons/358"},"teams":{"href":"http://api.football-data.org/alpha/soccerseasons/358/teams"},"fixtures":{"href":"http://api.football-data.org/alpha/soccerseasons/358/fixtures"},"leagueTable":{"href":"http://api.football-data.org/alpha/soccerseasons/358/leagueTable"}},"caption":"Primera Division 2014/15","league":"PD","year":"2014","numberOfTeams":20,"numberOfGames":380,"lastUpdated":"2015-04-21T09:55:27Z"},{"_links":{"self":{"href":"http://api.football-data.org/alpha/soccerseasons/359"},"teams":{"href":"http://api.football-data.org/alpha/soccerseasons/359/teams"},"fixtures":{"href":"http://api.football-data.org/alpha/soccerseasons/359/fixtures"},"leagueTable":{"href":"http://api.football-data.org/alpha/soccerseasons/359/leagueTable"}},"caption":"Segunda Division 2014/15","league":"SD","year":"2014","numberOfTeams":22,"numberOfGames":462,"lastUpdated":"2015-04-19T20:52:39Z"},{"_links":{"self":{"href":"http://api.football-data.org/alpha/soccerseasons/360"},"teams":{"href":"http://api.football-data.org/alpha/soccerseasons/360/teams"},"fixtures":{"href":"http://api.football-data.org/alpha/soccerseasons/360/fixtures"},"leagueTable":{"href":"http://api.football-data.org/alpha/soccerseasons/360/leagueTable"}},"caption":"Eredivisie.2014/15","league":"DED","year":"2014","numberOfTeams":18,"numberOfGames":306,"lastUpdated":"2015-04-19T18:15:06Z"},{"_links":{"self":{"href":"http://api.football-data.org/alpha/soccerseasons/361"},"teams":{"href":"http://api.football-data.org/alpha/soccerseasons/361/teams"},"fixtures":{"href":"http://api.football-data.org/alpha/soccerseasons/361/fixtures"},"leagueTable":{"href":"http://api.football-data.org/alpha/soccerseasons/361/leagueTable"}},"caption":"Serie B 2014/15","league":"SB","year":"2014","numberOfTeams":22,"numberOfGames":462,"lastUpdated":"2015-04-21T09:55:17Z"},{"_links":{"self":{"href":"http://api.football-data.org/alpha/soccerseasons/362"},"teams":{"href":"http://api.football-data.org/alpha/soccerseasons/362/teams"},"fixtures":{"href":"http://api.football-data.org/alpha/soccerseasons/362/fixtures"},"leagueTable":{"href":"http://api.football-data.org/alpha/soccerseasons/362/leagueTable"}},"caption":"Champions League 2014/15","league":"CL","year":"2014","numberOfTeams":32,"numberOfGames":120,"lastUpdated":"2015-04-22T21:36:16Z"},{"_links":{"self":{"href":"http://api.football-data.org/alpha/soccerseasons/368"},"teams":{"href":"http://api.football-data.org/alpha/soccerseasons/368/teams"},"fixtures":{"href":"http://api.football-data.org/alpha/soccerseasons/368/fixtures"},"leagueTable":{"href":"http://api.football-data.org/alpha/soccerseasons/368/leagueTable"}},"caption":"Primeira Liga 2014/15","league":"PPL","year":"2014","numberOfTeams":18,"numberOfGames":306,"lastUpdated":"2015-04-21T09:55:50Z"}]'
  var premierLeagueJSON = { _links:
                           {self: { href: 'http://api.football-data.org/alpha/soccerseasons/354' },
                            teams: { href: 'http://api.football-data.org/alpha/soccerseasons/354/teams' },
                            fixtures: { href: 'http://api.football-data.org/alpha/soccerseasons/354/fixtures' },
                            leagueTable: { href: 'http://api.football-data.org/alpha/soccerseasons/354/leagueTable' } },
                            caption: 'Premier League 2014/15',
                            league: 'PL',
                            year: '2014',
                            numberOfTeams: 20,
                            numberOfGames: 380,
                            lastUpdated: '2015-04-19T18:15:55Z' }

  function mockEndPoint(queryString, data) { 
    nock(url)
      .get('/' + queryString)
      .reply(200, data)
  };

  beforeEach(function() { 
    mockEndPoint('alpha/soccerseasons', allLeaguesJSON);
  });

  it('should get all leagues', function(done) { 
    leagues.all(function(err, data) {
      expect(data).to.eql(allLeaguesJSON);
      done();
    });
  });

  it('should get a specific league', function(done) { 
    mockEndPoint('alpha/soccerseasons/354', premierLeagueJSON);
    leagues.find('Premier League', function(err, data) { 
      expect(data).to.eql(premierLeagueJSON);
      done();
    });
  });
});