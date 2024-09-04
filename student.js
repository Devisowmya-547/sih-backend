const express = require('express');
const studentApp = express.Router();
const bcryptjs = require('bcryptjs');
const { ReturnDocument } = require('mongodb');

let studentCollection

studentApp.use((req, res, next) => {
  studentCollection = req.app.get('studentCollection');
  next();
})

studentApp.post('/register', async (req, res) => {
  const newUser = req.body;
  const result = await studentCollection.findOne({email : newUser.email})
  if(result !== null){
    return res.send({message : 'Account already exists'})
  }
  newUser.password = await bcryptjs.hash(newUser.password, 7)
  await studentCollection.insertOne({...newUser, role : "student"})
  res.send({message: 'account created successfully'})
})

studentApp.post('/login', async (req, res) => {
  const user = req.body;
  const validUser = await studentCollection.findOne({email : user.email})
  if(validUser === null) { return res.send({message : 'user not found'});}
  const passCheck = await bcryptjs.compare(user.password, validUser.password)
  if(passCheck === false) { return res.send({message : 'Invalid password'});}
  res.send({message : 'exist', user : validUser})
})

module.exports = studentApp