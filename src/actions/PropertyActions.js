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

  editProp(obj, id) {
    API.editProp(obj, id);
  },

  addNewTenant(propId, clientId) {
    API.addNewTenant(propId, clientId);
  },

  addNewClient(obj) {
    API.addNewClient(obj);
  },

  getAllClients(obj) {
    API.getAllClients(obj);
  },

  getClientProp(id) {
    API.getClientProp(id);
  },

  getClient(id) {
    API.getClient(id);
  }
}

export default PropertyActions;
