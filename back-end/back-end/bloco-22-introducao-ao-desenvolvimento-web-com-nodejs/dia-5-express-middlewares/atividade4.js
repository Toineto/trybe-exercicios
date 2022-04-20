const express = require('express');
const fs = require('fs').promises;
const data = require('./data.json');

const app = express();
app.use(express.json());

app.post('/teams', async(req, res) => {
  const {name , initials , country, league} = req.body;
  const CAIXA_ALTA = initials.toUpperCase();

  if(name.length <= 5 || initials !== CAIXA_ALTA || country.length < 3) {
    return res.status(400).json({ "message": "invalid data" });
  }

  await fs.writeFile('./data.json', JSON.stringify([...data, req.body], null, 2));

  return res.status(200).json(req.body);
})

app.get('/teams', (req, res) => {
  return res.status(200).json({teams: data});
})

app.listen(3002, () => {
  console.log('alow alow porta 3002')
})