const express = require('express');
const command = require('./src/command');
const app = express();

app.get('/call/:ip/:number', function(req, res){
  const {ip, number} = req.params;
  
  command.callPhone(ip.replace(/\-/g, '.'), number);
  res.send('true');
});

app.listen(3000);