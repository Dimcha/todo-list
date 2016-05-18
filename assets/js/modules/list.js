var React = require('react');
var Task = require('./task');

module.exports = React.createClass({
  render: function() {
    var url = this.props.url
    var reload = this.props.reload
    var tasks = this.props.data.map(function(task) {
      return (
        <Task
          id={task.id}
          key={task.id}
          checked={task.checked}
          value={task.value}
          url={url}
          reload={reload}
        />
      );
    });

    return (
      <div className="list">
        {tasks}
      </div>
    );
  }
});
