const express = require('express');
const alumniApp = express.Router();
const bcryptjs = require('bcryptjs');
const { ReturnDocument } = require('mongodb');

let alumniCollection

alumniApp.use((req, res, next) => {
  alumniCollection = req.app.get('alumniCollection');
  next();
})

alumniApp.post('/register', async (req, res) => {
  const newUser = req.body;
  const result = await alumniCollection.findOne({email : newUser.email})
  if(result !== null){
    return res.send({message : 'Account already exists'})
  }
  newUser.password = await bcryptjs.hash(newUser.password, 7)
  await alumniCollection.insertOne({...newUser, role : "alumni"})
  res.send({message: 'account created successfully'})
})

alumniApp.post('/login', async (req, res) => {
  const user = req.body;
  const validUser = await alumniCollection.findOne({email : user.email})
  if(validUser === null) { return res.send({message : 'user not found'});}
  const passCheck = await bcryptjs.compare(user.password, validUser.password)
  if(passCheck === false) { return res.send({message : 'Invalid password'});}
  res.send({message : 'exist', user : validUser})
})

module.exports = alumniApp