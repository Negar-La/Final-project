"use strict";
const { MongoClient} = require("mongodb");
const { v4: uuidv4 } = require('uuid');

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addComment = async (req, res) =>{
  const client = new MongoClient(MONGO_URI, options);
  const {id} = req.params;
  const { comment, user, userPicture } = req.body;
  req.body.userId = uuidv4();
  // console.log(id)
  // console.log( req.body)  
try{
    await client.connect();

    const db = client.db("final-project");

    const newUser = { "id":id, "userId":  req.body.userId, "comment": comment, "user": user, "userPicture": userPicture};
 
    const userComment = await db.collection("comments").insertOne({newUser})
  
    res.status(200).json({ status: 200, message: "Comment successfully added", data: newUser});
  } catch (err){
    res.status(400).json({status: 400, message: "Comment not added"});
    console.log(err.stack);
  } finally {
    client.close();
  }
}

const deleteComment = async(req, res) =>{
  const client = new MongoClient(MONGO_URI, options);
  
  console.log(req.body) 

try{
    await client.connect();

    const db = client.db("final-project");

    const deleteOne = await db.collection("comments").deleteOne({ "newUser.comment": req.body.c.newUser.comment})
    console.log(deleteOne.deletedCount)
    res.status(200).json({ status: 200, message: "comment successfully deleted from list", data: deleteOne });
  } catch (err){
    res.status(400).json({status: 400, message: "comment was not deleted"});
    console.log(err.stack);
  } finally {
    client.close();
  }
}

const getComments = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const {id} = req.params;
try{
    await client.connect();

    const db = client.db("final-project");

    const allComments = await db.collection("comments").find().toArray()
   let filteredComments = allComments.filter((comment)=>{
    //  console.log(comment.newUser)
      if (comment.newUser.id === id)
      return comment.newUser
    })
    // console.log(filteredComments)
  
    res.status(200).json({ status: 200, message: "All comments based on this id", data: filteredComments});
  } catch (err){
    res.status(400).json({status: 400, message: "There is no comment"});
    console.log(err.stack);
  } finally {
    client.close();
  }
}


module.exports = { addComment, getComments, deleteComment };
