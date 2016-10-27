import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher'

let properties = null;
let clients = null;

class PropertyStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch(action.type) {
        case 'GOT_ALL_PROPERTIES':
          properties = action.payload.data;
          this.emit('CHANGE');
          break;
        case 'GOT_ALL_CLIENTS':
          clients = action.payload.data;
          this.emit('CHANGE');
          break;
      }
    })
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

  getAllProperties() {
    return properties;
  }

  getAllClients() {
    return clients;
  }
}

export default new PropertyStore();
