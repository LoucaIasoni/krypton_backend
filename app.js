var express = require('express');
var app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
app.use(cors()); 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  req.header("Content-Type", "application/*+json");
  req.header("Accept", "application/json");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));           
app.use(bodyParser.json());
app.use(express.static('./dist/'));

app.get('/', function (req, res) {
  res.render('./dist/index.html', {});
});


// var  ProfessionsController = require('./professions/ProfessionsController');
// app.use('/professions', ProfessionsController);



module.exports = app;
