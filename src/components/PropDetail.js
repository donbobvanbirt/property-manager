import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'

import PropertyActions from '../actions/PropertyActions'
import PropertyStore from '../stores/PropertyStore';
import InfoList from './InfoList'

export default class PropDetail extends Component {
  constructor() {
    super();
    this.state = {
      property: PropertyStore.getProperty()
    }
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    PropertyActions.getProperty(this.props.params.id);
    PropertyStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    PropertyStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      property: PropertyStore.getProperty()
    })
  }

  render() {
    let { property } = this.state;
    let info = ['loading...'];
    let tenantList = ['Currently vacant'];
    console.log('property', property);

    if (property) {
      let { _id, apt, bedrooms, maxTenants, rent, tenants } = property;
      info = [`Apartment Number ${apt}`, `${bedrooms} Bedrooms`, `${maxTenants} tenants max`, `${rent} Per Month`]
      if (tenants.length > 0) {
        tenantList = tenants.map(client => {
          let { name, contact } = client;
          return `Name: ${name.first} ${name.last}, Email: ${contact.email}, Phone: ${contact.phone}`
        })
      }
    }

    return (
      <div>
        <Header as='h2'>Property:</Header>
        <InfoList info={info} />
        <Header as='h2'>Tenants:</Header>
        <InfoList info={tenantList} />
      </div>
    )
  }
}
