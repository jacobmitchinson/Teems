'use strict';
var expect = require('chai').expect;
var Player = require('../../app/models/player').Player;
var helper = require('./specHelper');
var player =  { 
                name: 'Berahino', 
                screenName: 'Test',
                twitterID: '12345'
              }

describe('Player Model', function() { 

  it('should create a player with a name in the database', function(done) { 
    Player.create(player, function(err, createdPlayer) {
      expect(createdPlayer.name).to.equal('Berahino');
      done();
    });
  });

  it('should create a player with a screenName in the database', function(done) { 
    Player.create(player, function(err, createdPlayer) {
      expect(createdPlayer.screenName).to.equal('Test');
      done();
    });
  });

  it('should create a player with a screenName in the database', function(done) { 
    Player.create(player, function(err, createdPlayer) {
      expect(createdPlayer.twitterID).to.equal('12345');
      done();
    });
  });
});