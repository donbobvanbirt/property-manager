import API from '../API'

const PropertyActions = {
  getAllProperties() {
    API.getAllProperties();
  },

  addNewProp(obj) {
    API.addNewProp(obj);
  },

  addNewClient(obj) {
    API.addNewClient(obj);
  },

  getAllClients(obj) {
    API.getAllClients(obj);
  }
}

export default PropertyActions;
