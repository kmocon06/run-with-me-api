//require dotenv to load environment variables
require('dotenv').config()
const express = require('express')
const server = express()
const PORT = process.env.PORT


//routes
server.get('/', (req, res) => {
  res.send('RUN WITH ME PROJECT')
})


//listener
server.listen(PORT, () => {
  const currentDate = new Date()
  console.log(`${currentDate.toLocaleString()}: Server listening on port ${PORT}`)
})