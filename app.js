var express = require('express');
var app = express();

app.get('/',function(req,res) {
  res.send("Hello World from Github ! :) 2");
});

app.listen(4000);
