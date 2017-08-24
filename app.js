var express = require('express');
var app = express();

app.get('/',function(req,res) {
  res.send("Hello World from Github ! :) 44");
});

app.listen(4000);
