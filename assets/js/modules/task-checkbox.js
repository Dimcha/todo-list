var React = require('react');

module.exports = React.createClass({
  handleChange: function() {
    this.props.updateCallback({
      id: this.props.id,
      checked: this.refs.box.checked
    });
  },

  render: function() {
    return (
      <div className="finished">
        <input type="checkbox" ref="box" checked={this.props.checked} onChange={this.handleChange} />
      </div>
    );
  }
});
