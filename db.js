var mysql = require('mysql');
var pool  = null;

exports.connect = function(done) {
  pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo_list'
  });

  done();
}

exports.get = function() {
  return pool;
}
