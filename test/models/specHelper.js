var config = require('../../app/config/databaseSetup');
var mongoose = require('mongoose');

beforeEach(function(done) { 
  startMongo(done);
});

afterEach(function(done) { 
  mongoose.disconnect();
  return done();
});

function startMongo(done) { 
  if(isMongoReady()) { 
    mongooseConnect(done);
  } else { 
    clearDB(done);
  };
}

function isMongoReady() { 
  if(mongoose.connection.readyState === 0) { 
    return true;
  } else { 
    return false;
  }
};

function mongooseConnect(done) { 
  mongoose.connect(config.db.test, function(err) {
    if(err) { 
      throw err;
    }
    return clearDB(done);
  });
}

function clearDB(done) {
  for(var i in mongoose.connection.collections) { 
    mongoose.connection.collections[i].remove(function() {});
  }
  return done();
};