import React, { Component } from 'react';
import { Header, Dropdown, Button } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

import PropertyActions from '../actions/PropertyActions'
import PropertyStore from '../stores/PropertyStore';
import InfoList from './InfoList'

export default class PropDetail extends Component {
  constructor() {
    super();
    this.state = {
      property: PropertyStore.getProperty(),
      clients: PropertyStore.getAllClients()
    }
    this._onChange = this._onChange.bind(this);
    this.deleteProp = this.deleteProp.bind(this);
  }

  componentWillMount() {
    PropertyActions.getProperty(this.props.params.id);
    PropertyActions.getAllClients();
    PropertyStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    PropertyStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      property: PropertyStore.getProperty(),
      clients: PropertyStore.getAllClients()
    })
  }

  deleteProp() {
    // console.log(this.state.property._id)
    PropertyActions.deleteProp(this.state.property._id);
    browserHistory.push('/properties');
  }

  render() {
    let { property, clients } = this.state;
    let info = ['loading...'];
    let tenantList = ['Currently vacant'];
    let addTenant = '';
    console.log('clients', clients);

    if (property) {
      let { _id, apt, bedrooms, maxTenants, rent, tenants } = property;
      info = [`Apartment Number ${apt}`, `${bedrooms} Bedrooms`, `${maxTenants} tenants max`, `${rent} Per Month`]
      if (tenants.length > 0) {
        tenantList = tenants.map(client => {
          let { name, contact } = client;
          return `Name: ${name.first} ${name.last}, Email: ${contact.email}, Phone: ${contact.phone}`
        })
      }

      if (maxTenants - tenants.length) {
        addTenant = (
          <div>
            {/* <Header as='h3'>Add new tenant:</Header> */}
            <Dropdown text='Add new tenant:'>
              <Dropdown.Menu>

                {clients.map(client => {
                  let { name } = client;
                  return (
                    <Dropdown.Item text={name.first} />

                  )
                })}

              </Dropdown.Menu>
            </Dropdown>
          </div>
        )
      }
    }

    return (
      <div>
        <Header as='h2'>Property:</Header>
        <InfoList info={info} />
        <Header as='h2'>Tenants:</Header>
        <InfoList info={tenantList} />

        {addTenant}
        <Button onClick={this.deleteProp} floated='right' negative>Delete Property</Button>
      </div>
    )
  }
}
