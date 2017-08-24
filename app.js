var express = require('express');
var app = express();

app.get('/',function(req,res) {
  res.send("Hello World from Github ! :) 44a");
});

app.listen(4000);
