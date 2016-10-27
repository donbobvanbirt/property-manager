import axios, { get, post, put } from 'axios'
import ServerActions from './actions/ServerActions'

const API = {
  getAllProperties() {
    get('/api/properties')
    .then(res => {
      let { data } = res;
      // console.log("data", data)
      ServerActions.gotAllProperties(data);
    })
    .catch(console.error)
  },

  getProperty(id) {
    get(`/api/properties/${id}`)
    .then(res => {
      let { data } = res;
      // console.log("data", data)
      ServerActions.gotProperty(data);
    })
    .catch(console.error)
  },

  deleteProp(id) {
    axios.delete(`/api/properties/${id}`)
    .then(res => {
      let { data } = res;
      // console.log("data", data)
      this.getAllProperties();
    })
    .catch(console.error)
  },

  editProp(obj, id) {
    axios.put(`/api/properties/${id}`, obj)
    .then(res => {
      let { data } = res;
      // console.log("data", data)
      this.getProperty(id);
    })
    .catch(console.error)
  },

  getAllClients() {
    get('/api/clients')
    .then(res => {
      let { data } = res;
      // console.log("data", data)
      ServerActions.gotAllClients(data);
    })
    .catch(console.error)
  },

  addNewProp(obj) {
    post('/api/properties', obj)
    .then(res => {
      let { data } = res;
      // console.log("data", data)
      this.getAllProperties();
    })
    .catch(console.error)
  },

  addNewTenant(propId, clientId) {
    put(`/api/properties/${propId}/addTenant/${clientId}`)
    .then(res => {
      let { data } = res;
      // console.log("data", data)
      this.getProperty(propId);
    })
    .catch(console.error)
  },

  getClient(id) {
    get(`/api/clients/${id}`)
    .then(res => {
      let { data } = res;
      // console.log("data", data)
      ServerActions.gotClient(data);
    })
    .catch(console.error)
  },

  getClientProp(id) {
    get(`/api/properties/clients/${id}`)
    .then(res => {
      let { data } = res;
      // console.log("data", data)
      ServerActions.gotClientProp(data);
    })
    .catch(console.error)
  },

  addNewClient(obj) {
    post('/api/clients', obj)
    .then(res => {
      let { data } = res;
      // console.log("data", data)
      this.getAllClients();
    })
    .catch(console.error)
  }

}

export default API;
