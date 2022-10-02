const express = require('express')
const app = express()
const port = process.env.PORT || 3001;
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex')
const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        password : 'test',
        database : 'smart-brain'
  }
});
const signin = require('./controllers/signin')
const register = require('./controllers/register')
const image = require('./controllers/image')
const profile = require('./controllers/profile')

app.use(cors())
app.use(express.json())

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })

app.get('/', (req, res) => res.send('success.'))
app.post('/signin', (req,res) =>{signin.handleSignIn(req,res,db,bcrypt)})
app.post('/register', (req,res)=>{register.handleRegister(req,res,db,bcrypt)})
app.put('/image', (req,res)=>{image.handleImage(req,res,db)})
app.post('/image', (req,res)=>{image.handleAPIcall(req,res)})
app.get('/profile/:id', (req,res)=>{profile.handleProfileGET(req,res,db)})


