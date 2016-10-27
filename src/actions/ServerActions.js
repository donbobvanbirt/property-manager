import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  gotAllProperties(data) {
    AppDispatcher.dispatch({
      type: 'GOT_ALL_PROPERTIES',
      payload: { data }
    })
    // console.log('data', data);
  }
}

export default ServerActions
