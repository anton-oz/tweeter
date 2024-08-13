const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://justindholderman:5HT5DWFCxQf5Y23D@cluster0.rwmnv.mongodb.net/tweeter?retryWrites=true&w=majority&appName=Cluster0'
)
module.exports = mongoose.connection;
