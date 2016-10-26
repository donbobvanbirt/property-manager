const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    first: { type: String, minlength: 1 },
    last: { type: String }
  },
  contact: {
    email: { type: String },
    phone: { type: String }
  }
})

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
