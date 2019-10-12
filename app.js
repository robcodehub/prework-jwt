const express = require('express');
const app = express();
module.exports = app;


app.get('/api/sessions', (req, res, next)=> {
  if(!req.user) {
    next({ status: 401 })
  }
});

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).send({error: err});
});
