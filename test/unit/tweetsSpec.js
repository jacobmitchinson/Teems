var expect = require('chai').expect;
var nock = require('nock');
var Tweets = require('../../app/lib/tweets');
var jsonData = require('../data');

describe('Tweets', function() { 

  var searchUrl = 'https://api.twitter.com:443/';
  var apiUrl = 'https://api.twitter.com/';
  var tweets;

  function mockEndPoint(url, queryString, data) { 
    nock(url)
      .get('/' + queryString)
      .reply(200, data)
  };

  function mockSaidoBerahinoSearch() { 
    mockEndPoint(searchUrl, '1.1/users/search.json?q=Saido%20Berahino', jsonData.berahinoData);
  }

  function mockRateLimitNotExceeded() { 
    mockEndPoint(apiUrl, '1.1/application/rate_limit_status.json', jsonData.rateLimitData);
  }

  function mockRateLimitExceeded() { 
    mockEndPoint(apiUrl, '1.1/application/rate_limit_status.json', jsonData.rateLimitExceededData);
  }

  function updateEndPoint() { 
    setTimeout(function() {
      mockRateLimitNotExceeded();
    }, 2500);
  }

  function playerSearch(done) { 
    tweets.get('Saido Berahino', function(err, player, response) { 
      var berahino = jsonData.berahinoData[0];
      expect(player).to.eql(berahino);
      done();
    });
  }

  beforeEach(function() { 
    tweets = new Tweets();
  });

  it('should get a player ID', function(done) { 
    mockSaidoBerahinoSearch();
    mockRateLimitNotExceeded();
    playerSearch(done);
  });

  it('should wait if the rate limit has been exceeded', function(done) { 
    mockSaidoBerahinoSearch();
    mockRateLimitExceeded();
    tweets.waitTime = 3000;
    updateEndPoint();
    playerSearch(done);
  });

  it('should return false if search limit has not been exceeded', function(done) { 
    mockEndPoint(apiUrl, '1.1/application/rate_limit_status.json', jsonData.rateLimitData);
    tweets.isSearchLimitExceeded(function(err, data) { 
      expect(data).to.equal(false);
      done();
    }); 
  });

  it('should return true if search limit has been exceeded', function(done) { 
    mockRateLimitExceeded();
    tweets.isSearchLimitExceeded(function(err, data) { 
      expect(data).to.equal(true);
      done();
    });
  });
});