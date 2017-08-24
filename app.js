var express = require('express');
var app = express();

app.get('/',function(req,res) {
  res.send("Finally I hope it's working !");
});

app.listen(4000);
