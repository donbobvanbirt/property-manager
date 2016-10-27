import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { Container, Menu } from 'semantic-ui-react'

export default class Layout extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: ''
    }
  }

  handleItemClick (name) {
    this.setState({ activeItem: name });
    browserHistory.push(`/${name}`)
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Container>
          <Menu inverted>
            <Menu.Item header>Property Management</Menu.Item>
            <Menu.Item name='Home' active={activeItem === ''} onClick={() => this.handleItemClick('')}></Menu.Item>
            <Menu.Item name='Properties' active={activeItem === 'properties'} onClick={() => this.handleItemClick('properties')}></Menu.Item>
            <Menu.Item name='Clients' active={activeItem === 'clients'} onClick={() => this.handleItemClick('clients')}></Menu.Item>
          </Menu>
          {this.props.children}
        </Container>
      </div>
    )
  }
}
