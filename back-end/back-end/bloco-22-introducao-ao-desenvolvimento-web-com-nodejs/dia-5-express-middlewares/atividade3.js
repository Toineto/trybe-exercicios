const express = require('express');

const app = express();
app.use(express.json());

const posts = [
  { id: 1, author: 'José Neto', comment: 'Mais um dia de Sol !' },
  { id: 2, author: 'Antonio Neto', comment: 'Hoje o dia está maneiro!' },
  { id: 3, author: 'Rodrigo Garga', comment: 'To aqui também' },
]

app.get('/posts/:id', (req, res, next) => {
  const { id } = req.params;

  if(!id) return res.status(404).json({"message": "post not found"});
  if(!posts.some(e => e.id === parseInt(id))) next(new Error('id n encontrado'));

  const result = posts.find(e => e.id === parseInt(id))

  return res.status(200).json(result);
});

app.get('/posts', (req, res) => {
  return res.status(200).json(posts);
});

app.use((err, req, res, next) => {
  console.log(err.message)
  return res.status(404).json({ "message": "Opsss, route not found!" })
})

app.listen(3002, () => {
  console.log('alow alow porta 3002')
})