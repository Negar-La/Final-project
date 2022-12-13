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

  //db.collection.deleteOne() deletes the first document that matches the filter. Use a field that is part of a unique index such as _id for precise deletions.
  //so we define commentId and then when deleting a comment, we use deleteOne({"newComment.commentId": req.body.object.newComment.commentId})
  req.body.commentId = uuidv4();
  const { comment, email, user, userPicture, commentId } = req.body;
  // console.log(id)
  // console.log( req.body)  
try{
    await client.connect();

    const db = client.db("final-project");

    const newComment = {id, email, comment, user, userPicture, commentId};
 
    await db.collection("comments").insertOne({newComment})
  
    res.status(200).json({ status: 200, message: "Comment successfully added", data: newComment});
  } catch (err){
    res.status(400).json({status: 400, message: "Comment not added"});
    console.log(err.stack);
  } finally {
    client.close();
  }
}

const deleteComment = async(req, res) =>{
  const client = new MongoClient(MONGO_URI, options);
  const {id} = req.params;
  console.log("helloooo");
  console.log("req.body", req.body) 
  console.log(id);

try{
    await client.connect();

    const db = client.db("final-project");
    //delete a comment based on commentId
    const deleteOne = await db.collection("comments").deleteOne({"newComment.commentId": req.body.object.newComment.commentId})
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
  // console.log(id);
try{
    await client.connect();

    const db = client.db("final-project");

    const allComments = await db.collection("comments").find().toArray()
   let filteredComments = allComments.filter((comment)=>{
    //  console.log(comment)
      if (comment.newComment.id === id)
      return comment.newComment
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
