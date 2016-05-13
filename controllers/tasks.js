var mysql = require('mysql');
var db = require('./../db');

exports.findAll = function(req, res) {
  db.get().query('SELECT * FROM tasks', function (err, rows) {
    if (err) return res.status(500).send(err);

    res.send(rows);
  })
};

exports.findById = function(req, res) {
  var id = req.params.id;

  db.get().query('SELECT * FROM tasks WHERE id = ?', id, function (err, rows) {
    if (err) return res.status(500).send(err);

    res.send(rows);
  })
};

exports.create = function(req, res) {
  var task = req.body;

  db.get().query('INSERT INTO tasks SET ?', task, function (err, rows) {
    if (err) return res.status(500).send(err);

    res.send(rows);
  })
};

exports.update = function(req, res) {
  var task = req.body;

  db.get().query('UPDATE tasks SET checked = ? WHERE id = ?', [task.checked == 'true', task.id], function (err, rows) {
    if (err) return res.status(500).send(err);

    res.send(rows);
  })
};

exports.delete = function(req, res) {
  var task = req.body;

  db.get().query('DELETE FROM tasks WHERE id = ?', task.id, function (err, rows) {
    if (err) return res.status(500).send(err);

    res.send(rows);
  })
};
