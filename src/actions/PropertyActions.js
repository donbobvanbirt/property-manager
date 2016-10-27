import API from '../API'

const PropertyActions = {
  getAllProperties() {
    API.getAllProperties();
  },

  addNewProp(obj) {
    API.addNewProp(obj);
  }
}

export default PropertyActions;
