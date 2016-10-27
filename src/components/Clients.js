import React, { Component } from 'react';
import { Table, Form, Button } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

import PropertyStore from '../stores/PropertyStore';
import PropertyActions from '../actions/PropertyActions'

export default class Clients extends Component {
  constructor() {
    super();

    this.state = {
      clients: PropertyStore.getAllClients()
    }

    this._onChange = this._onChange.bind(this);
    this.submitNewClient = this.submitNewClient.bind(this);
  }

  componentWillMount() {
    PropertyActions.getAllClients();
    PropertyStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    PropertyStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      clients: PropertyStore.getAllClients()
    })
  }

  submitNewClient (e) {
    e.preventDefault();
    let { firstName, lastName, email, phone } = this.refs;
    let clientObj = {
      contact: {
        email: email.value,
        phone: phone.value
      },
      name: {
        first: firstName.value,
        last: lastName.value
      }
    }
    // console.log('clientObj', clientObj)
    PropertyActions.addNewClient(clientObj);
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    phone.value = '';
  }

  selectProp(id) {
    console.log('id:', id);
  }

  render() {
    let { clients } = this.state;
    let list = 'loading...';
    console.log('clients', clients)

    if (clients) {
      list = (

        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>

            {clients.map(unit => {
              let { contact, name, _id } = unit;
              return (
                <Table.Row key={_id} onClick={() => this.selectProp(_id)}>
                  <Table.Cell>{name.first} {name.last}</Table.Cell>
                  <Table.Cell>{contact.email}</Table.Cell>
                  <Table.Cell>{contact.phone}</Table.Cell>
                </Table.Row>
              )
            })}

          </Table.Body>
        </Table>

      )
    }

    return (
      <div>
        {list}
        <Form onSubmit={this.submitNewClient} success>
          <Form.Field>
            <label>First Name</label>
            <input name="firstName" ref="firstName" placeholder='' />
          </Form.Field>

          <Form.Field>
            <label>Last Name</label>
            <input name="lastName" ref="lastName" placeholder='' />
          </Form.Field>

          <Form.Field>
            <label>Email</label>
            <input name="email" ref="email" placeholder='' />
          </Form.Field>

          <Form.Field>
            <label>Phone</label>
            <input name="phone" ref="phone" placeholder='' />
          </Form.Field>

          <Button>Add Client</Button>
        </Form>
      </div>
    )
  }
}
