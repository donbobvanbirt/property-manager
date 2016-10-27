import React, { Component } from 'react';
import { Header, Dropdown, Button, Modal, Icon, Form } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

import PropertyActions from '../actions/PropertyActions'
import PropertyStore from '../stores/PropertyStore';
import InfoList from './InfoList'

export default class PropDetail extends Component {
  constructor() {
    super();
    this.state = {
      property: PropertyStore.getProperty(),
      clients: PropertyStore.getAllClients(),
      open: false
    }
    this._onChange = this._onChange.bind(this);
    this.deleteProp = this.deleteProp.bind(this);
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
    this.editProp = this.editProp.bind(this);
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

  editProp() {
    let { _id } = this.state.property;
    let { aptNum, rent, size, maxTenants } = this.refs;
    let propObj = {
      apt: aptNum.value,
      rent: rent.value,
      bedrooms: size.value,
      maxTenants: maxTenants.value
    }
    PropertyActions.editProp(propObj, _id);
    aptNum.value = '';
    rent.value = '';
    size.value = '';
    maxTenants.value = '';

    this.close();
  }

  show() {
    this.setState({ open: true })
  }

  close() {
    this.setState({ open: false })
  }

  render() {
    let { property, clients, open } = this.state;
    let info = ['loading...'];
    let tenantList = ['Currently vacant'];
    let addTenant, editForm = '';
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

      editForm = (
            <Form onSubmit={this.submitNewProp} success>
              <Form.Field>
                <label>Apartment Number</label>
                <input name="aptNum" ref="aptNum" defaultValue={apt} />
              </Form.Field>
              <Form.Field>
                <label>Bedrooms</label>
                <input name="size" ref="size" defaultValue={bedrooms} />
              </Form.Field>
              <Form.Field>
                <label>Monthly Rate</label>
                <input name="rent" ref="rent" defaultValue={rent} />
              </Form.Field>
              <Form.Field>
                <label>Maximum Tenants</label>
                <input name="maxTenants" ref="maxTenants" defaultValue={maxTenants} />
              </Form.Field>
            </Form>
      )

    }

    return (
      <div>
        <Header as='h2'>Property:</Header>
        <InfoList info={info} />
        <Header as='h2'>Tenants:</Header>
        <InfoList info={tenantList} />

        {addTenant}
        <Button onClick={this.deleteProp} floated='right' negative>Delete Property</Button>
        <Button onClick={this.show} floated='right' primary>Edit Property</Button>

        <Modal size='small' open={open} onClose={this.close}>
          <Modal.Header>
            Edit Property
          </Modal.Header>
          <Modal.Content>

            {editForm}

          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close}>Cancel</Button>
            <Button onClick={this.editProp} positive>Submit</Button>
          </Modal.Actions>
        </Modal>

      </div>
    )
  }
}
