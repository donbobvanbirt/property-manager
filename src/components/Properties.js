import React, { Component } from 'react';
import { Table, Form, Button } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

import PropertyStore from '../stores/PropertyStore';
import PropertyActions from '../actions/PropertyActions'

export default class Properties extends Component {
  constructor() {
    super();

    this.state = {
      properties: PropertyStore.getAllProperties()
    }

    this._onChange = this._onChange.bind(this);
    this.submitNewProp = this.submitNewProp.bind(this);
  }

  componentWillMount() {
    PropertyActions.getAllProperties();
    PropertyStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    PropertyStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      properties: PropertyStore.getAllProperties()
    })
  }

  submitNewProp (e) {
    e.preventDefault();
    let { aptNum, rent, size, maxTenants } = this.refs;
    let propObj = {
      apt: aptNum.value,
      rent: rent.value,
      bedrooms: size.value,
      maxTenants: maxTenants.value
    }
    PropertyActions.addNewProp(propObj);
    aptNum.value = '';
    rent.value = '';
    size.value = '';
    maxTenants.value = '';
  }

  selectProp(id) {
    browserHistory.push(`/property/${id}`)
  }

  render() {
    let { properties } = this.state;
    let list = 'loading...';
    console.log('properties', properties)

    if (properties) {
      list = (

        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Apt Number</Table.HeaderCell>
              <Table.HeaderCell>Size</Table.HeaderCell>
              <Table.HeaderCell>Monthly Rate</Table.HeaderCell>
              <Table.HeaderCell>Availability</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>

            {properties.map(unit => {
              let { apt, bedrooms, rent, _id } = unit;
              return (
                <Table.Row key={_id} onClick={() => this.selectProp(_id)}>
                  <Table.Cell>{apt}</Table.Cell>
                  <Table.Cell>{bedrooms} bedrooms</Table.Cell>
                  <Table.Cell>{rent}</Table.Cell>
                  <Table.Cell>No</Table.Cell>
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
        <Form onSubmit={this.submitNewProp} success>
          <Form.Field>
            <label>Apartment Number</label>
            <input name="aptNum" ref="aptNum" placeholder='' />
          </Form.Field>

          <Form.Field>
            <label>Bedrooms</label>
            <input name="size" ref="size" placeholder='' />
          </Form.Field>

          <Form.Field>
            <label>Monthly Rate</label>
            <input name="rent" ref="rent" placeholder='' />
          </Form.Field>

          <Form.Field>
            <label>Maximum Tenants</label>
            <input name="maxTenants" ref="maxTenants" placeholder='' />
          </Form.Field>

          <Button>Submit</Button>
        </Form>
      </div>
    )
  }
}
