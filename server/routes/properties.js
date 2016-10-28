const express = require('express');
const router = express.Router();

const Property = require('../models/Property');

router.put('/:propId/addTenant/:clientId', (req, res) => {
  let { propId, clientId } = req.params;
  Property.findById(propId)
    .then(property => {
      property.tenants.push(clientId);
      return property.save();
    })
    .then(savedProp => {
      res.send(savedProp);
    })
    .catch(err => res.status(400).send(err))
})

router.route('/:id')
  .get((req, res) => {
    Property.findById(req.params.id)
    .populate('tenants')
    .then(properties => res.send(properties))
    .catch(err => res.status(400).send(err))
  })

  .put((req, res) => {
    Property.findOneAndUpdate({_id: req.params.id}, { $set: req.body })
    .then( res.send('property updated') )
    .catch(err => res.status(400).send(err))
  })

  .delete((req, res) => {
    let { id } = req.params;
    Property.remove({ _id: id })
    .then( res.send('property deleted') )
    .catch(err => res.status(400).send(err))
  })

router.route('/')
  .get((req, res) => {
    Property.find()
      .then(properties => res.send(properties))
      .catch(err => res.status(400).send(err))
  })
  .post((req, res) => {
    Property.create(req.body)
    .then(property => res.send(property))
    .catch(err => res.status(400).send(err))
  })

module.exports = router;
