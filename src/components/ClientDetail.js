import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

import PropertyActions from '../actions/PropertyActions'
import PropertyStore from '../stores/PropertyStore';
import InfoList from './InfoList'

export default class ClientDetail extends Component {
  constructor() {
    super();
    this.state = {
      client: PropertyStore.getClient(),
      prop: PropertyStore.getClientProp()
    }
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    let { id } = this.props.params;
    PropertyActions.getClient(id);
    PropertyActions.getClientProp(id);
    PropertyStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    PropertyStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      client: PropertyStore.getClient(),
      prop: PropertyStore.getClientProp()
    })
  }

  render() {
    console.log('this.state', this.state)
    let { client, prop } = this.state;
    let info = ['loading...'];
    let propInfo = ['Not currently renting']

    if(client) {
      let { name, contact } = client;
      info = [`${name.first} ${name.last}`, `Email: ${contact.email}`, `Phone: ${contact.phone}`]
    }
    if(prop && prop[0]) {
      let { apt, bedrooms, maxTenants, rent } = prop[0];
      propInfo = [`Apartment number ${apt}`, `${bedrooms} Bedrooms`, `${maxTenants} Max Tenants`, `${rent} per Month`]
    }

    return (
      <div>
        <Header as='h2'>Client:</Header>
        <InfoList info={info}/>
        <Header as='h2'>Current Apartment:</Header>
        <InfoList info={propInfo}/>
      </div>
    )
  }

}
