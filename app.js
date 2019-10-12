const express = require('express');
const app = express();
const { User } = require('./db').models;
module.exports = app;

app.use(express.json())
app.use(require('express-session')({secret: process.env.SECRET}))

app.get('/api/sessions', (req, res, next)=> {
  if(req.session.user) {
    return res.send(req.session.user);
  }
    next({ status: 401 })
});

app.post('/api/sessions', (req, res, next) => {
  User.authentication(req.body)
  .then(user => {
    req.session.user = user
    res.sendStatus(204);
  })
.catch(next)
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).send({error: err});
});
