import React, { Component } from 'react';
import SampleSmartComponent from './SampleSmartComponent';

export default class Layout extends Component {
  render() {
    return (
      <div className='container'>
        <h1 className='text-center'>React Webpack</h1>
        <SampleSmartComponent/>
      </div>
    )
  }
}
