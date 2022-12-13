"use strict";
const { MongoClient} = require("mongodb");
const { v4: uuidv4 } = require('uuid');

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addPerson = async (req, res) =>{
  const client = new MongoClient(MONGO_URI, options);
  const {user} = req.body
  console.log(req.body);
  try{
    await client.connect();
    const db = client.db("final-project");
    console.log("try to add someone")
    const findPerson = await db.collection("persons").find().toArray()
    // console.log(findPerson)
    let isNew = findPerson.find((she)=>{
      // console.log("she", she)
      return she.email === user.email || she.picture === user.picture
    })

      if (!isNew) {
        const newPerson = await db.collection("persons").insertOne({...req.body.user})
      // console.log(newPerson) 
   res.status(200).json({ status: 200, message: "person was added successfully to persons collection", data: req.body})
    
  } else {  res.status(400).json({status: 400, message: "person already exist"})}
} catch (err){
    console.log(err.stack);
  } finally {
    client.close();
  }
}

const getSinglePerson = async(req, res)=>{
  const client = new MongoClient(MONGO_URI, options);
  const {id} = req.params
  console.log(req.params); //{ _id: '6397a7e0074cea4c26fe4723' }
  console.log(req.params._id);
  console.log(id);  //undefined
  try{
    await client.connect();
    const db = client.db("final-project");
    
    const getPerson = await db.collection("persons").findOne({id})
      console.log(getPerson);

      if (getPerson) {
   res.status(200).json({ status: 200, message: "The requested person data", data: getPerson})
    
  } else {  res.status(400).json({status: 400, message: "No person was found based on this id"})}
} catch (err){
    console.log(err.stack);
  } finally {
    client.close();
  }
}


module.exports = {addPerson, getSinglePerson };