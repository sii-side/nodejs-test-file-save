const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const fs = require('fs')

app.use(express.static('docs'))
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true
}))
app.use(bodyParser.json())

app.post('/test', (req, res) => {
  const base64body = req.body.content.substring(req.body.content.indexOf(';base64,') + 8)
  const buffer = Buffer.from(base64body, 'base64')
  fs.writeFileSync(req.body.filename, buffer)
  res.send('Saved!')
})

app.listen(20000, () => {
  console.log('Listening at http://localhost:20000/')
})
