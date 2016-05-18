var React = require('react');
var DeleteButton = require('./delete-button');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      value: this.props.initialValue,
      initialValue: this.props.initialValue
    };
  },

  render: function() {
    className = "task wrap-task" + (this.props.checked ? ' done' : '')

    return (
      <div>
        <div className={className}>
          {this.state.value}
        </div>
        <DeleteButton
          id={this.props.id}
          deleteCallback={this.props.deleteCallback}
        />
      </div>
    );
  }
});
