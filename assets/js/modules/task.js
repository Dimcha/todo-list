var React = require('react');
var $ = require ('jquery');
var TaskCheckbox = require('./task-checkbox');
var TaskField = require('./task-field');

module.exports = React.createClass({
  updateTask: function(task) {
    $.ajax({
      type: 'PUT',
      url: this.props.url + '/' + task.id,
      data: task,
      success: function() {
        this.props.reload();
      }.bind(this)
    });
  },

  removeTask: function(id) {
    $.ajax({
      type: 'DELETE',
      url: this.props.url + "/" + id,
      data: {id: id},
      success: function() {
        this.props.reload();
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div className="row">
        <TaskCheckbox
          id={this.props.id}
          checked={this.props.checked}
          updateCallback={this.updateTask}
        />
        <TaskField
          id={this.props.id}
          initialValue={this.props.value}
          checked={this.props.checked}
          deleteCallback={this.removeTask}
        />
      </div>
    );
  }
});
