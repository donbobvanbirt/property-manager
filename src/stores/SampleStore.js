import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher'

let _data = 'initial data';

class SampleStore extends EventEmitter {
  constructor() {
    super();
    
    AppDispatcher.register(action => {
      switch(action.type) {
        case 'NEW_DATA':
          _data = action.payload.data;
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

  getData() {
    return _data;
  }
}

export default new SampleStore();
