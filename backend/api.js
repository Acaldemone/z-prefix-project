const express = require('express');
const app =express()
const port = 8080
const knex = require('knex')(require('./knexfile.js')['development']);
const cors = require('cors');

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('express is running')
})

app.get('/items', (req, res) => {
    knex('items')
    .select('*')
    .then(data => res.status(200).json(data))
    .catch(err => 
        res.status(404).json({
            message: 'The data you are looking for could not be found. Please try again'
        })
    );
})

app.post('/items', (req, res) => {
    const itemData = req.body
    knex('items')
    .insert(itemData)
    .then(() => {
        res.status(200).json({itemData });
      })
    .catch(err => 
        res.status(404).json({
            message: 'Your request was denied'
        })
    );
})

app.patch('/items/:id', (req, res) => {
    const itemId = req.params.id
    knex('items')
    .where('id', itemId)
    .update(req.body)
    .then(() => {
        res.status(200).json({itemId });
      })
    .catch(err => 
        res.status(404).json({
            message: 'Your request was denied'
        })
    );
})

app.delete('/items/:id', (req, res) => {
    const itemId = req.params.id
    knex('items')
    .where('id', itemId)
    .del()
    .then(() => {
        res.status(200).json({itemId });
      })
    .catch(err => 
        res.status(404).json({
            message: 'Your request was denied'
        })
    );
})

app.listen(port, () => {
    console.log(`server is listening on ${port}`)
})