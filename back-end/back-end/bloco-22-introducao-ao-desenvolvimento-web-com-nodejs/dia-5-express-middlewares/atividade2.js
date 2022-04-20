const express = require('express');
const axios = require('axios').default;

const app = express();
app.use(express.json());

app.get('/btc/price', async(req, res) => {
  const { authorization } = req.headers;

  if(authorization.length !== 12) return res.status(401).json({ "message": "invalid token" });

  const {data} = await axios.get('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');

  return res.status(200).json(data.time);
})

app.listen(3002, () => {
  console.log('alow alow porta 3002')
})