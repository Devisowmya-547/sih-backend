require('dotenv').config()
const express = require('express')
const { MongoClient } = require('mongodb')
const app = express()
const port = 4000
const uri = process.env.MONGO_URL
const studentApp = require('./api/student.js')
const alumniApp = require('./api/alumni.js')
const sessionsApp = require('./api/sessions.js')


app.use(express.json())

MongoClient.connect(uri)
.then((client) => {
  const database = client.db('alumniHub')

  const studentCollection = database.collection('studentCollection')
  const alumniCollection = database.collection('alumniCollection')
  const sessionsCollection = database.collection('sessionsCollection')

  app.set('alumniCollection', alumniCollection)
  app.set('studentCollection', studentCollection)
  app.set('sessionsCollection', sessionsCollection)

  console.log('DB connection established')
})

app.use('/student', studentApp)
app.use('/alumni', alumniApp)
app.use('/sessions', sessionsApp)

app.listen(port, () => {
  console.log(`Server listening on port number ${port}\nhttps://localhost:4000`)
})