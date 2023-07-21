const express = require('express');
const app =express()
const port = 8080
const knex = require('knex')(require('./knexfile.js')['development']);
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

app.get('/users', (req, res) => {
    knex('users')
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
    .insert({ ...itemData, user_id: req.params.user_id })
    .returning('*')
    .then(() => {

        res.status(200).json({itemData });
      })
    .catch(err => 
        res.status(404).json({
            message: 'Your request was denied'
        })
    );
})

app.post('/users', (req, res) => {
    const userData = req.body
    knex('users')
    .insert(userData)
    .then(() => {
        res.status(200).json({userData });
      })
    .catch(err => 
        res.status(500).json({
            message: 'Your request was denied'
        })
    );
})

app.patch('/items/:id', (req, res) => {
    const itemId = req.params.id
    console.log(itemId)
    knex('items')
    .where('id', itemId)
    .update(req.body)
    .then(() => {
        console.log(req.body)
        res.status(200).json({itemId });
      })
    .catch(err => 
        res.status(404).json({
            message: 'Your request was denied'
        })
    );
})


app.patch('/users/:id', (req, res) => {
    const userId = req.params.id
    knex('users')
    .where('id', userId)
    .update(req.body)
    .then(() => {
        res.status(200).json({userId });
      })
    .catch(err => 
        res.status(404).json({
            message: 'Your request was denied'
        })
    );
})


// This endpoint is used for deleting items off the inventory page.
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

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id
    knex('users')
    .where('id', userId)
    .del()
    .then(() => {
        res.status(200).json({userId });
      })
    .catch(err => 
        res.status(404).json({
            message: 'Your request was denied'
        })
    );
})

app.post('/login/createAccount', async (req, res) => {
    const { id, first_name, last_name, username, password, role_id, } = req.body;
    const hashedPass = await bcrypt.hashSync(password, 10)
    try {
      const newUser = {
        // id: id,
        last_name: last_name,
        first_name: first_name,
        username: username,
        role_id : role_id,
        password : hashedPass
      };
      console.log(newUser)
      let addedUser = await knex('users')
        .insert(newUser)
        .returning('*');
      addedUser = addedUser.map(user => {
        delete user.password;
        return user;
      });
      res.status(200).json({message: "Account creation success", addedUser});
    } catch (err) {
      res.status(500).json({ message: "Error adding new user" });
    }
  });

app.post('/login', async (req, res) => {
    const {username, password} = req.body
    try {
        const user = await knex('users')
        .select('id', 'username','password')
        .where('username', username)
        .first();
        console.log('user', user)
        if (user) {
            const passwordCheck = bcrypt.compareSync(password, user.password);
            console.log(passwordCheck)
            if (passwordCheck) {
                const token = jwt.sign({ id: user.id }, { algorithm: 'RS256' }, function(err, token) {
                    console.log('token',token);
                })
              res.status(201).json({id: user.id, token: token});
            } else {
              res.status(401).json({  message: 'Valid username or password not detected' });
            }
          } else {
            res.status(402).json({  message: 'Valid username or password not detected' });
          }
        } catch (error) {
          console.error('login error detected:', error);
          res.status(500).json({ message: 'login error detected' });
        }
      });

      app.get('/users/:id/items', (req, res) => {
        const userId = req.params.id;
        knex('items')
          .select('*')
          .where('user_id', userId)
          .then(data => res.status(200).json(data))
          .catch(err =>
            res.status(404).json({
              message: 'Error, data not found'
            })
          );
      });

      app.post('/users/:id/items', async (req, res) => {
        const userId = req.params.id;
        const { item_name, description, quantity } = req.body;
        const user = await knex('users').where('id', userId).first();
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        try {
        console.log(userId)
          const newItem = await knex('items').insert({
            item_name,
            description,
            quantity,
            user_id: user_Id
          }).returning('*');
      
          res.status(201).json(newItem);
        } catch (error) {
          console.error('Error creating item:', error);
          res.status(500).json({ message: 'Failed to create item' });
        }
      });

app.listen(port, () => {
    console.log(`server is listening on ${port}`)
})