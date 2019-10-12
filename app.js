const express = require('express');
const app = express();
module.exports = app;


app.get('/api/sessions', (req, res, next)=> {
  if(!req.user) {
    next({ status: 401 })
  }
});
