import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  gotAllProperties(data) {
    AppDispatcher.dispatch({
      type: 'GOT_ALL_PROPERTIES',
      payload: { data }
    })
    // console.log('data', data);
  },

  gotProperty(data) {
    AppDispatcher.dispatch({
      type: 'GOT_PROPERTY',
      payload: { data }
    })
    // console.log('data', data);
  },

  gotClient(data) {
    AppDispatcher.dispatch({
      type: 'GOT_CLIENT',
      payload: { data }
    })
    // console.log('data', data);
  },

  gotClientProp(data) {
    AppDispatcher.dispatch({
      type: 'GOT_CLIENT_PROP',
      payload: { data }
    })
    // console.log('data', data);
  },

  gotAllClients(data) {
    AppDispatcher.dispatch({
      type: 'GOT_ALL_CLIENTS',
      payload: { data }
    })
    // console.log('data', data);
  }
}

export default ServerActions
