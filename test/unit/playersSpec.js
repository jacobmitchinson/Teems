var expect = require('chai').expect;
var nock = require('nock');
var Players = require('../../app/lib/players');

describe('Players', function() { 

  var url = 'http://api.football-data.org';
  var westBrom = {"_links":{"self":{"href":"http://api.football-data.org/alpha/teams/74"},"fixtures":{"href":"http://api.football-data.org/alpha/teams/74/fixtures"},"players":{"href":"http://api.football-data.org/alpha/teams/74/players"}},"name":"West Bromwich Albion","code":"WBA","shortName":"West Bromwich","squadMarketValue":"80,500,000 €","crestUrl":"http://upload.wikimedia.org/wikipedia/de/8/8b/West_Bromwich_Albion.svg"}
  var westBromAllPlayers = '{"_links":{"_self":{"href":"http://api.football-data.org/alpha/teams/74/players"},"team":{"href":"http://api.football-data.org/alpha/teams/74"}},"count":22,"players":[{"id":425,"name":"Darren Fletcher","position":"Central Midfield","jerseyNumber":24,"dateOfBirth":"1984-02-01","nationality":"Scottland","contractUntil":"2017-06-30","marketValue":"2,000,000 €"},{"id":1791,"name":"Ben Foster","position":"Keeper","jerseyNumber":1,"dateOfBirth":"1983-04-03","nationality":"England","contractUntil":"2018-06-30","marketValue":"4,000,000 €"},{"id":1792,"name":"Boaz Myhill","position":"Keeper","jerseyNumber":13,"dateOfBirth":"1982-11-09","nationality":"Wales","contractUntil":"2015-06-30","marketValue":"1,000,000 €"},{"id":1794,"name":"Joleon Lescott","position":"Centre Back","jerseyNumber":6,"dateOfBirth":"1982-08-16","nationality":"England","contractUntil":"2016-06-30","marketValue":"4,000,000 €"},{"id":1795,"name":"Jonas Olsson","position":"Centre Back","jerseyNumber":3,"dateOfBirth":"1983-03-10","nationality":"Sweden","contractUntil":"2016-06-30","marketValue":"2,500,000 €"},{"id":1796,"name":"Craig Dawson","position":"Centre Back","jerseyNumber":25,"dateOfBirth":"1990-05-06","nationality":"England","contractUntil":"2017-06-30","marketValue":"2,000,000 €"},{"id":1797,"name":"Gareth McAuley","position":"Centre Back","jerseyNumber":23,"dateOfBirth":"1979-12-05","nationality":"Northern Ireland","contractUntil":"2015-06-30","marketValue":"500,000 €"},{"id":1798,"name":"Sébastien Pocognoli","position":"Left-Back","jerseyNumber":15,"dateOfBirth":"1987-08-01","nationality":"Belgium","contractUntil":"2017-06-30","marketValue":"2,000,000 €"},{"id":1799,"name":"Jason Davidson","position":"Left-Back","jerseyNumber":14,"dateOfBirth":"1991-06-29","nationality":"Australia","contractUntil":"2016-06-30","marketValue":"500,000 €"},{"id":1800,"name":"Andre Wisdom","position":"Right-Back","jerseyNumber":2,"dateOfBirth":"1993-05-09","nationality":"England","contractUntil":"2015-05-31","marketValue":"6,000,000 €"},{"id":1801,"name":"Cristian Gamboa","position":"Right-Back","jerseyNumber":16,"dateOfBirth":"1989-10-24","nationality":"Costa Rica","contractUntil":"2017-06-30","marketValue":"2,000,000 €"},{"id":1802,"name":"Youssuf Mulumbu","position":"Defensive Midfield","jerseyNumber":21,"dateOfBirth":"1987-01-25","nationality":"Congo DR","contractUntil":"2015-06-30","marketValue":"4,000,000 €"},{"id":1803,"name":"Claudio Yacob","position":"Defensive Midfield","jerseyNumber":5,"dateOfBirth":"1987-07-18","nationality":"Argentina","contractUntil":"2015-06-30","marketValue":"4,000,000 €"},{"id":1804,"name":"Chris Baird","position":"Defensive Midfield","jerseyNumber":4,"dateOfBirth":"1982-02-25","nationality":"Northern Ireland","contractUntil":"2015-06-30","marketValue":"500,000 €"},{"id":1805,"name":"Craig Gardner","position":"Central Midfield","jerseyNumber":8,"dateOfBirth":"1986-11-25","nationality":"England","contractUntil":"2017-06-30","marketValue":"3,000,000 €"},{"id":1807,"name":"Chris Brunt","position":"Left Midfield","jerseyNumber":11,"dateOfBirth":"1984-12-14","nationality":"Northern Ireland","contractUntil":"2017-06-30","marketValue":"4,000,000 €"},{"id":1808,"name":"James Morrison","position":"Attacking Midfield","jerseyNumber":7,"dateOfBirth":"1986-05-25","nationality":"Scottland","contractUntil":"2016-06-30","marketValue":"5,000,000 €"},{"id":1810,"name":"Stéphane Sessègnon","position":"Attacking Midfield","jerseyNumber":29,"dateOfBirth":"1984-06-01","nationality":"Benin","contractUntil":"2016-06-30","marketValue":"5,000,000 €"},{"id":1813,"name":"Brown Ideye","position":"Centre Forward","jerseyNumber":9,"dateOfBirth":"1988-10-10","nationality":"Nigeria","contractUntil":"2017-06-30","marketValue":"8,000,000 €"},{"id":1814,"name":"Saido Berahino","position":"Centre Forward","jerseyNumber":18,"dateOfBirth":"1993-08-04","nationality":"England","contractUntil":"2017-06-30","marketValue":"12,000,000 €"},{"id":1815,"name":"Victor Anichebe","position":"Centre Forward","jerseyNumber":10,"dateOfBirth":"1988-04-23","nationality":"Nigeria","contractUntil":"2017-06-30","marketValue":"3,500,000 €"},{"id":3628,"name":"Callum McManaman","position":"Right Wing","jerseyNumber":19,"dateOfBirth":"1991-04-25","nationality":"England","contractUntil":"2018-06-30","marketValue":"5,000,000 €"}]}';
  var berahino = {"id":1814,"name":"Saido Berahino","position":"Centre Forward","jerseyNumber":18,"dateOfBirth":"1993-08-04","nationality":"England","contractUntil":"2017-06-30","marketValue":"12,000,000 €"}

  function mockEndPoint(queryString, data) {  
    nock(url)
      .get('/' + queryString)
      .reply(200, data)
  };

  it('should get all players from a team', function(done) { 
    mockEndPoint('alpha/teams/74/players', westBromAllPlayers);
    var players = new Players();
    players.all(westBrom, function(err, players) { 
      expect(players).to.eql(westBromAllPlayers);
      done();
    });
  });

  it('should get a specific player from a team', function(done) { 
    mockEndPoint('alpha/teams/74/players', westBromAllPlayers);
    var players = new Players();
    players.find(westBrom, 'Saido Berahino', function(err, player) { 
      expect(player).to.eql(berahino);
      done();
    });
  });
});