import API from '../API'

const PropertyActions = {
  getAllProperties() {
    API.getAllProperties();
  },

  getProperty(id) {
    API.getProperty(id);
  },

  addNewProp(obj) {
    API.addNewProp(obj);
  },

  deleteProp(obj) {
    API.deleteProp(obj);
  },

  addNewClient(obj) {
    API.addNewClient(obj);
  },

  getAllClients(obj) {
    API.getAllClients(obj);
  }
}

export default PropertyActions;
