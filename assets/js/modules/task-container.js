var React = require('react');
var $ = require ('jquery');
var Form = require('./form');
var List = require('./list');

module.exports = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  loadTasksFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleFormSubmit: function(params) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: params,
      success: function(data) {
        this.loadTasksFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.loadTasksFromServer();
    setInterval(this.loadTasksFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      <div>
        <Form onFormSubmit={this.handleFormSubmit} />
        <List data={this.state.data} url={this.props.url} reload={this.loadTasksFromServer} />
      </div>
    );
  }
});
