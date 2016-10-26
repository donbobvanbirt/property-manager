import React, { Component } from 'react';
import SampleStore from '../stores/SampleStore';

export default class SampleSmartComponent extends Component {
  constructor() {
    super();

    this.state = {
      data: SampleStore.getData()
    }

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    SampleStore.startListening(this._onChange);    
  }

  componentWillUnmount() {
    SampleStore.stopListening(this._onChange);    
  }

  _onChange() {
    this.setState({
      data: SampleStore.getData()
    })
  }

  render() {
    let { data } = this.state;

    return (
      <h3 className="text-center">Data: {data}</h3>
    )
  }
}
