process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../testApp');
const Client = require('../models/Client');
const { expect } = chai;

chai.use(chaiHttp);

describe('API routes', () => {
  let userId;
  describe('GET /', () => {
    it('should respond with HTML', () => {
      return chai.request(app)
      .get('/')
      .then(res => {
        expect(res).to.have.status(200);
      })
    })
  })

  describe('/api/clients', () => {
    before(() => {
      return Client.remove({})
      .then(() => {

        return Client.create({
          name: {
            first: 'Joe',
            last: 'Blow'
          },
          contact: {
            email: 'joe@blow.com',
            phone: '9199336494'
          }
        })
      })
    })

    describe('GET', () => {
      it('should respond with client info', () => {
        return chai.request(app)
        .get('/api/clients')
        .then(res => {
          // console.log('res.body:', res.body)
          expect(res).to.have.status(200)
          // expect(res.body).to.have.length(1)
          expect(res.body[0].name.first).to.equal('Joe')
        })
      })
    })
    describe('POST', () => {
      it('should respond with added client', () => {

        let newClientObj = {
          name: {
            first: 'John',
            last: 'Doe'
          },
          contact: {
            email: 'anEmail@aWebsite.com',
            phone: '2345678910'
          }
        }
        return chai.request(app)
        .post('/api/clients')
        .send(newClientObj)
        .then(res => {
          userId = res.body._id;
          // console.log('userId:', userId)
          expect(res).to.have.status(200)
          expect(res.body.name.first).to.equal('John')
        })
      })
    })
  })

  describe('GET /api/clients/:id', () => {
    it('should respond with specific client', () => {
      return chai.request(app)
      .get(`/api/clients/${userId}`)
      .then(res => {
        // console.log('res.body:', res.body)
        expect(res).to.have.status(200)
        expect(res.body.name.first).to.equal('John')
      })
    })
  })

  describe('PUT /api/clients/:id', () => {
    it('should update the specified client', () => {
      return chai.request(app)
      .put(`/api/clients/${userId}`)
      .send({ name: {last: 'Lennon'} })
      .then(res => {
        // console.log('res.body:', res.body)
        expect(res).to.have.status(200)
        expect(res.body.name.last).to.equal('Lennon')
      })
    })
  })

  describe('DELETE /api/clients/:id', () => {
    it('should update the specified client', () => {
      return chai.request(app)
      .delete(`/api/clients/${userId}`)
      .then(res => {
        // console.log('res.body:', res.body)
        expect(res).to.have.status(200)
      })
    })
  })


})
