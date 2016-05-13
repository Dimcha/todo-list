// var mysql         = require('mysql');
// var React         = require('react');
var express       = require('express');
var webpack       = require('webpack');
var webpackConfig = require('./webpack.config');
var bodyParser    = require('body-parser');
var compiler      = webpack(webpackConfig);
var app           = express();
var db            = require('./db');

app.use(require('webpack-dev-middleware')(
  compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  })
);

app.use(require('webpack-hot-middleware')(
  compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  })
);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/assets'));

// Connect to MySQL on start
db.connect(function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.')
    process.exit(1)
  }

  tasks   = require('./controllers/tasks');

  app.engine('html', require('ejs').renderFile);

  app.get('/', function(req, res) {
    res.render('index.html');
  });

  app.get(    '/api/tasks',       tasks.findAll);
  app.get(    '/api/tasks/:id',   tasks.findById);
  app.post(   '/api/tasks',       tasks.create);
  app.put(    '/api/tasks/:id',   tasks.update);
  app.delete( '/api/tasks/:id',   tasks.delete);

  app.listen(3000)
  console.log('Listening on port 3000...')
})
