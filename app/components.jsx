import React from 'react';
import { render } from 'react-dom';
import { Well, Badge, ProgressBar, Panel } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import axios from 'axios';

import { mapStateToProps, mapDispatchToProps } from './logger.jsx';

@connect(mapStateToProps, mapDispatchToProps)
export class SuperTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      entity: this.props.entity,
      endpoint: this.props.endpoint,
      fakeData: this.props.fakeData,
      fields: this.props.fields,
      options: this.props.options,
      className: this.props.className,
      
      data: [],
      loading: true,
      error: null
    };
    this.log = this.props.log;
    this.entities = this.props.entities;

    this.fakeData = this.fakeData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.renderLoading = this.renderLoading.bind(this);    
    this.renderError = this.renderError.bind(this);    
    this.renderData = this.renderData.bind(this);        
  }

  componentDidMount() {
    this.log("Retrieving <b>" + this.state.entity +"</b> from <a href=" + this.state.endpoint + ">" + this.state.endpoint + "</a>...");
    this.fakeData();
    //this.fetchData();
    setTimeout(() => { this.refs.bstable.forceUpdate(); }, 1500);    
  }

  fakeData() {
    this.setState({ data: this.state.fakeData, loading: false, error: null });  
  }

  fetchData() {
    axios( { url: this.state.endpoint, timeout: 1200, method: 'get', responseType: 'json' } )
      .then(response => {
        this.log("Retrieved <b>" + this.entities(response.data).length + "</b> " + this.state.entity);   
        this.setState({ data: this.entities(response.data), loading: false, error: null });
      })
      .catch(errorMessage => {
        this.log(errorMessage);          
        this.setState({ data: [], loading: false, error: errorMessage });     
      });    
  }

  renderLoading() { return <ProgressBar active now={60} label="Loading..." />; }
  renderError() { return <Panel header="Error" bsStyle="danger">{this.state.error.message}</Panel>; }
  renderData() {
    if (this.state.error) { return this.renderError(); }

    return (
      <div id="table">
        <h4>{this.state.entity}</h4>        
        <Well>      
          Endpoint: <a href={this.state.endpoint}>here</a><br/>
          Number of {this.state.entity}: <Badge>{this.state.data.length}</Badge><br/>
        </Well>
        <BootstrapTable ref='bstable' data={this.state.data} bordered={false} striped condensed hover pagination search options={this.state.options}>
          { this.state.fields.map(field => <TableHeaderColumn key={field.dataField} {...field}> {field.title} </TableHeaderColumn>) }
        </BootstrapTable>
      </div>
    );
  }

  render() {
    return (
      <div id={this.state.entity} className={this.state.className}>
        <br/><br/>{ this.state.loading ? this.renderLoading() : this.renderData() }
      </div>
    );
  }
}

export const booleanFormat = (cell, row) => {
  if (cell == null) return ( <small><i>No value</i></small> )
  else return ( <input type='checkbox' checked={cell} readOnly/> )
}
export const linkFormat = (cell, row) => {
  return ( <a href={cell}>{cell}</a> )
}
