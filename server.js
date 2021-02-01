const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
const sendToMeRouter = require('./sendToMe.js')
const app = express()
const port = 3002

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/sendtome', sendToMeRouter)

app.listen(port, () => {
  console.log(`app is live on ${port}`)
})