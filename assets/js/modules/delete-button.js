var React = require('react');

module.exports = React.createClass({
  handleClick: function() {
    this.props.deleteCallback(this.props.id);
  },

  render: function() {
    return (
      <div className="delete">
        <a onClick={this.handleClick}>X</a>
      </div>
    );
  },
});
