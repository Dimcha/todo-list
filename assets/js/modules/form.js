var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {value: ''};
  },
  handleTaskChange: function(e) {
    this.setState({value: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();

    var value = this.state.value.trim();

    if (!value) {
      return;
    }

    this.props.onFormSubmit({value: value});
    this.setState({value: ''});
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Enter new task"
          className="form-control"
          name="value"
          value={this.state.value}
          onChange={this.handleTaskChange}
        />
        <input type="submit" value="Save" className="button" />
      </form>
    );
  }
});
