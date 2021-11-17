const mongoose = require('mongoose');

//shéma pour BDD MongoDB
const schemaChat = mongoose.Schema({

  userId: {type: String, required: true},
  username: {type: String, required: true},
  sessionId: {type: String, required:true},
  text: { type: String, required: true },

  
});

module.exports = mongoose.model('Test', schemaChat);