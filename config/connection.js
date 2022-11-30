// const { connect, connection } = require('mongoose');

// connect('mongodb://localhost27017/networkDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// module.exports = connection;

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/networkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

require ("../models/User")
module.exports = mongoose.connection;