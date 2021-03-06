require('dotenv').config()
const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
const sendToMeRouter = require('./sendToMe.js')
const app = express()
const port = process.env.PORT
const bodyParser = require('body-parser');


app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/sendtome', sendToMeRouter)

app.get('/', (req, res) => {
  res.json({status: 200, message: 'Hello!'})
})

app.listen(port, () => {
  console.log(`app is live on ${port}`)
})