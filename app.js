const express = require('express')
// const bodyParser = require('body-parser')
const app = express()
const { Sequelize } = require('sequelize');
const PORT = 3001;
// app.set('view engine', 'ejs')
const { users } = require('./models')
const sequelize = new Sequelize('postgres://postgres@localhost:5432/myForecast')
app.use(express.json())



// app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', async (req, res)=> {
   const allUsers = await users.findAll();
   console.log(allUsers);
   res.send(allUsers);
})

app.post('/createuser', async (req, res) => {
    await users.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    })
    res.redirect('/')
})

app.listen(PORT, async () => { try
    {
        await sequelize.authenticate() 
        console.log(`Example app listening on port ${PORT}`)}
    catch(error){
    console.log(error)}
})