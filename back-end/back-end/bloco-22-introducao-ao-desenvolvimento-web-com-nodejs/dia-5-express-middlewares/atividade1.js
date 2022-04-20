const express = require('express');
const { randomBytes } = require('crypto');

const app = express();
app.use(express.json());

app.post('/user/register', (req, res) => {
  const {username, email, password} = req.body;
  const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if(username.length <= 3 || (password.length <4 || password.length > 8) || !email.match(regexEmail)) {
    return res.status(400).json({message: 'invalid data'});
  }

  return res.status(201).json({ "message": "user created"});
});

app.post('/user/login', (req, res) => {
  const { email, password } = req.body;
  const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if((password.length <4 || password.length > 8) || !email.match(regexEmail)) {
    return res.status(400).json({ "message": "email or password is incorrect" });
  }
  const token = randomBytes(6).toString('hex');

  return res.status(201).json({token});
})

app.listen(3000, () => {
  console.log('alow alow porta 3000')
})