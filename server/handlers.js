"use strict";
const { MongoClient} = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// RETURN AN ARRAY OF ALL books
const getBooks = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("final-project");
    console.log("getBooks connected!");

    const result = await db.collection("books").find().toArray();

    res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  } finally {
    // close the connection to the database server
    client.close();
    console.log("getBooks disconnected!");
  }
};


const getSingleBook = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const id = req.params.id;

  try{
      await client.connect();
      const db = client.db("final-project");
      
      //in items collection we find the item based on its _id
      let singleBook = await db.collection("books").findOne({id: id});
      
      // updates item availability based on inventory if an item was found
      // const itemIventory = await db.collection("users").findOne({id: id})
      //   .then((item) => {
      //     if (item) {
      //       singleBook = {...singleBook, numInStock: item.numInStock}
      //     }
          
      //   })

      //in companies collection we look for the company that its _id is matched with singleItem.companyId, but only if we found an item
      // if (singleItem) {
      //   singleCompany = await db.collection("companies").findOne({_id: singleItem.companyId});
      // }

      //if item was found, it sends back the data, if not it sends 404
      if (singleBook) {
        return res.status(200).json({status:200, data : singleBook, message:"The requested book data"})
      } else {
        return res.status(404).json({status:404, message:"No book was found based on this id"})
      }
  } catch(err){
      console.log(err.stack);
  }
  finally {
      client.close();
  }
};


const getSearchResults = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userInput = req.params.userInput;

  try{
      await client.connect();
      const db = client.db("final-project");
    console.log("connected")
      //first target items collection to have all items
      const results = await db.collection("books").find().toArray();
      // then filtering the items based on the user's input
  let getSearchResults = results.filter((item) => {
    if (item.title.toLowerCase().includes(userInput.toLowerCase())) {
        return item;
    }
});
      
//since getSearchResults is an array, to set a condition we use .length > 0
      if (getSearchResults.length > 0) {
      res.status(200).json({status:200, data : getSearchResults, message:"The results of your search"})
      } else {
      res.status(404).json({status:404, message:"Sorry, No book was found based on your search"})
      }
  } catch(err){
      console.log(err.stack);
  }
  finally {
      client.close();
  }
};


const addFavorite = async(req, res) =>{
  const client = new MongoClient(MONGO_URI, options);
}


const addComment = async(req, res) =>{
  const client = new MongoClient(MONGO_URI, options);
  const {id} = req.params;
  const { comment, user, userPicture } = req.body;
  // console.log(id)
  // console.log( req.body)  
try{
    await client.connect();

    const db = client.db("final-project");

    const newUser = { "id":id, "comment": comment, "user": user, "userPicture": userPicture};
 
    const userComment = await db.collection("users").insertOne({newUser})
    const allComments = await db.collection("users").find().toArray()
  
  
    res.status(200).json({ status: 200, message: "Comment successfully added", data: newUser});
  } catch (err){
    res.status(400).json({status: 400, message: "Comment not added"});
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

    const allComments = await db.collection("users").find().toArray()
   let filteredComments = allComments.filter((comment)=>{
    //  console.log(comment.newUser)
      if (comment.newUser.id === id)
      return comment.newUser
    })
    // console.log(filteredComments)
  
    res.status(200).json({ status: 200, message: "All comments based on this id", data: filteredComments});
  } catch (err){
    res.status(400).json({status: 400, message: "Comment not added"});
    console.log(err.stack);
  } finally {
    client.close();
  }
}

const deleteComment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const {id} = req.params;
  const {comment} = req.body
try{
    await client.connect();

    const db = client.db("final-project");

    const result = await db.collection("users").deleteOne({id})
    
    // console.log(filteredComments)
  
    res.status(200).json({ status: 200, message: "Comment was deleted successfully", data: result});
  } catch (err){
    res.status(400).json({status: 400, message: "Comment not deleted"});
    console.log(err.stack);
  } finally {
    client.close();
  }
}


module.exports = { getBooks, getSingleBook, getSearchResults, addFavorite, addComment, getComments, deleteComment };
