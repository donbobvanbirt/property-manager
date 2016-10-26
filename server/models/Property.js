const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  apt: { type: String },
  rent: { type: Number },
  bedrooms: { type: Number },
  maxTenants: { type: Number },
  tenants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }]
})

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
