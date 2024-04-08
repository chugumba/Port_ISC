const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

console.log("server is running");

app.listen(5000)