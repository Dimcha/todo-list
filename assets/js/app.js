var React = require('react');
var ReactDOM = require('react-dom');
var $ = require ('jquery')

var List = React.createClass({
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

var Form = React.createClass({
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
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Enter new task"
          className="form-control"
          name="value"
          value={this.state.value}
          onChange={this.handleTaskChange}
        />
        <input type="submit" value="Save" className="btn btn-primary" />
      </form>
    );
  }
});

var TaskContainer = React.createClass({
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
      <div className="taskContainer">
        <Form onFormSubmit={this.handleFormSubmit} />
        <List data={this.state.data} url={this.props.url} reload={this.loadTasksFromServer} />
      </div>
    );
  }
});

var Task = React.createClass({
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

var TaskField = React.createClass({
  getInitialState: function() {
    return {
      value: this.props.initialValue,
      initialValue: this.props.initialValue
    };
  },

  render: function() {
    className = "col-md-6 wrap-task" + (this.props.checked ? ' done' : '')

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

var DeleteButton = React.createClass({
  handleClick: function() {
    this.props.deleteCallback(this.props.id);
  },

  render: function() {
    return (
      <div className="col-md-1">
        <a onClick={this.handleClick}>X</a>
      </div>
    );
  },
});

var TaskCheckbox = React.createClass({
  handleChange: function() {
    this.props.updateCallback({
      id: this.props.id,
      checked: this.refs.box.checked
    });
  },

  render: function() {
    return (
      <div className="col-md-1">
        <input type="checkbox" ref="box" checked={this.props.checked} onChange={this.handleChange} />
      </div>
    );
  }
});

ReactDOM.render(
  <TaskContainer url="/api/tasks" pollInterval={10000} />,
  document.getElementById('main')
);
