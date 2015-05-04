'use strict';
var expect = require('chai').expect;
var Player = require('../../app/models/player').Player;
var helper = require('../specHelper');
var player =  { 
                name: 'Berahino', 
                team: 'WBA',
                position: 'Centre Forward',
                jerseyNumber: 18,
                screenName: 'Test',
                nationality: 'English',
                location: 'Birmingham',
                dateOfBirth: '1993-08-04',
                twitterID: '12345',
                contractUntil: '2017-06-30',
                followersCount: 46032,
                friendCount: 241
              }

describe('Player Model', function() { 

  it('should create a player with a name in the database', function(done) { 
    Player.create(player, function(err, createdPlayer) {
      expect(createdPlayer.name).to.equal('Berahino');
      done();
    });
  });

  it('should create a player with a team', function(done) { 
    Player.create(player, function(err, createdPlayer) {
      expect(createdPlayer.team).to.equal('WBA');
      done();
    });
  });

  it('should create a player with a position', function(done) {
    Player.create(player, function(err, createdPlayer) {
      expect(createdPlayer.position).to.equal('Centre Forward');
      done();
    });
  });

  it('should create a player with a DOB', function(done) {
    Player.create(player, function(err, createdPlayer) {
      expect(createdPlayer.dateOfBirth).to.equal('1993-08-04');
      done();
    });
  });

  it('should create a player with a nationality', function(done) { 
    Player.create(player, function(err, createdPlayer) {
      expect(createdPlayer.nationality).to.equal('English');
      done();
    });
  }); 

  it('should create a player with a location', function(done) { 
    Player.create(player, function(err, createdPlayer) {
      expect(createdPlayer.location).to.equal('Birmingham');
      done();
    });
  });

  it('should create a player with a screenName in the database', function(done) { 
    Player.create(player, function(err, createdPlayer) {
      expect(createdPlayer.screenName).to.equal('Test');
      done();
    });
  });

  it('should create a player with a twitterID in the database', function(done) { 
    Player.create(player, function(err, createdPlayer) {
      expect(createdPlayer.twitterID).to.equal(12345);
      done();
    });
  });

  it('should create a player with contract end date', function(done) { 
    Player.create(player, function(err, createdPlayer) {
      expect(createdPlayer.contractUntil).to.equal('2017-06-30');
      done();
    });
  });

  it('should create a player with their follower count', function(done) { 
    Player.create(player, function(err, createdPlayer) {
      expect(createdPlayer.followersCount).to.equal(46032);
      done();
    });
  });

  it('should create a player with their friend count', function() { 
    Player.create(player, function(err, createdPlayer) {
      expect(createdPlayer.followersCount).to.equal(241);
      done();
    });
  });
});