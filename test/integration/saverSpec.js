var expect = require('chai').expect;
var nock = require('nock');

describe('Save', function() { 

  it('should save a player twitter ID to the database', function() { 
    save.player('Premier League', 'WBA', 'Saido Berahino', function(err, data) { 
      expect(data).to.be.ok;
    });
  });

});