var express = require('express');
var app = express();
var api = require('./routes/api');
var mysql = require('mysql');
var pool = mysql.createPool({
  // Enter your db connection params
  connectionLimit : 10,
  host: "",
  user: "",
  password: "",
  database: ""
});

app.use('/api', api(pool));
app.use('/', express.static(__dirname+'/public'));

app.listen(9000, function() {
  console.log('Listening on port 9000');
});
