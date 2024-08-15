const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI ? "mongodb+srv://justindholderman:5HT5DWFCxQf5Y23D@cluster0.rwmnv.mongodb.net/tweeter?retryWrites=true&w=majority&appName=Cluster0" : 'mongodb://127.0.0.1:27017/tweeter'
);
module.exports = mongoose.connection;
