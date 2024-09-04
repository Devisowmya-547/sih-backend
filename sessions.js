const express = require('express');
const sessionsApp = express.Router();

let sessionsCollection

sessionsApp.use((req, res, next) => {
  sessionsCollection = req.app.get('sessionsCollection')
  next()
})

sessionsApp.put('/addWebinar', async (req, res) => {
  const webinar = req.body
  await sessionsCollection.findOneAndUpdate(
    {sessionType : "webinar"},
    {$addToSet : {arr : webinar}}
  )
  res.send({message : "webinar added successfully"})
})

sessionsApp.put('/addQna', async (req, res) => {
  const qna = req.body
  await sessionsCollection.findOneAndUpdate(
    {sessionType : "qna"},
    {$addToSet : {arr : qna}}
  )
  res.send({message : "qna session added successfully"})
})

sessionsApp.put('/addWorkshop', async (req, res) => {
  const workshop = req.body
  await sessionsCollection.findOneAndUpdate(
    {sessionType : "workshop"},
    {$addToSet : {arr : workshop}}
  )
  res.send({message : "workshop added successfully"})
})

sessionsApp.put('/addMockInterview', async (req, res) => {
  const mockInterview = req.body
  await sessionsCollection.findOneAndUpdate(
    {sessionType : "mockInterview"},
    {$addToSet : {arr : mockInterview}}
  )
  res.send({message : "Mock interview added successfully"})
})

sessionsApp.get('/get/:id', async (req, res) => {
  const type = req.params.id
  const arr = await sessionsCollection.findOne({sessionType : type})
  res.send({result : arr})
})

module.exports = sessionsApp