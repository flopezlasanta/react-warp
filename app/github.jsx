import React from 'react';
import { render } from 'react-dom'

import { SuperTable, linkFormat, booleanFormat } from './components.jsx';
import { fake } from './data.jsx';

const entity = "Github";
const endpoint = "https://api.github.com/users/flopezlasanta/repos";
const fakeData = fake.github;
const fields = [
  { title: 'ID', dataField: 'id', isKey: true, dataAlign: 'left', dataSort: true },
  { title: 'Name', dataField: 'name', dataAlign: 'left', dataSort: true, },
  { title: 'URL', dataField: 'html_url', dataAlign: 'left', dataSort: true, dataFormat: linkFormat },
  { title: 'Language', dataField: 'language', dataAlign: 'left', dataSort: true },
  { title: 'Fork', dataField: 'fork', dataAlign: 'left', dataSort: true, dataFormat: booleanFormat },
  { title: 'Size', dataField: 'size', dataAlign: 'left', dataSort: true }
];
const options = { sortName: 'login', sortOrder: 'asc' };
const entities = (data) => (data);
const className = '';

export class Github extends React.Component {
  constructor(props) { super(props); }
  render() { return ( <SuperTable entity={entity} endpoint={endpoint} fakeData={fakeData} fields={fields} options={options} entities={entities} className={className}/> ); }
}
