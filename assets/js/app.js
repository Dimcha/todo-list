var React = require('react');
var ReactDOM = require('react-dom');
var TaskContainer = require('./modules/task-container');

ReactDOM.render(
  <TaskContainer url="/api/tasks" pollInterval={10000} />,
  document.getElementById('main')
);
