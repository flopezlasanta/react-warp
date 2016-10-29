import React from 'react'
import { render } from 'react-dom'

import { Panel, Navbar, Nav, NavItem, NavDropdown, MenuItem, Tabs, Tab } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import '../css/react-bootstrap-table-all.css'

import { Github } from './github.jsx';
import { Debug } from './debug.jsx';
import { reducer } from './logger.jsx';

const linkedin = "https://es.linkedin.com/in/flopezlasanta";
const github = "https://github.com/flopezlasanta";

const footer = "By flopezlasanta 2016";

const store = createStore(reducer);

class AppClass extends React.Component {

	constructor(props) {
		super(props);

		this.state = {tabKey: 1};
		this.handleSelectTab = this.handleSelectTab.bind(this);
	}

	handleSelectTab(tabKey) { this.setState({tabKey}); }

	render () { 
		return (
		<Provider store={store}> 
		<Panel footer={footer}>
			<Navbar inverse>
		        <Navbar.Header>
		    		<Navbar.Brand>
						<a href="#">React Warp 1.0</a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight>
						<NavItem href={linkedin}>LinkedIn</NavItem>
						<NavItem href={github}>Github</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<Tabs id="tabs" activeKey={this.state.tabKey} onSelect={this.handleSelectTab}>
				<Tab eventKey={1} title="Github"><Github/></Tab>
				<Tab eventKey={4} title="Debug"><Debug/></Tab>				
			</Tabs>     
		</Panel>
		</Provider>
		);
	}
}

render(<AppClass/>, document.getElementById('root'));

