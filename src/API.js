import axios, { get, post } from 'axios'
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

  getAllClients() {
    get('/api/clients')
    .then(res => {
      let { data } = res;
      console.log("data", data)
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
