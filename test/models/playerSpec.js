'use strict';
var expect = require('chai').expect;
var Player = require('../../app/models/player').Player;
var config = require('../../app/config/databaseSetup');
var mongoose = require('mongoose');
var player;

function clearDB(done) {
  for(var i in mongoose.connection.collections) { 
    mongoose.connection.collections[i].remove(function() {});
  }
  return done();
};

function checkReadyState(done) { 
  if(mongoose.connection.readyState === 0) { 
    mongoose.connect(config.db.test, function(err) {
      if(err) { 
        throw err;
      }
      return clearDB(done);
    });
  } else { 
    return clearDB(done);
  }
};

beforeEach(function(done) { 
  checkReadyState(done);
  player = { 
    name: 'Berahino', 
    screenName: 'Test',
    twitterID: '12345'
  }
});

afterEach(function(done) { 
  mongoose.disconnect();
  return done();
});

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