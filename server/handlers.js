"use strict";
const { MongoClient} = require("mongodb");
const { v4: uuidv4 } = require('uuid');

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
  const { user, userPicture, title, author, imageSrc, id } = req.body;
  console.log(id)
  // console.log( req.body)  
try{
    await client.connect();

    const db = client.db("final-project");
    if (user && userPicture && title && author && imageSrc && id) {
      const findBook = await db.collection("favorites").findOne({"id": id, "userPicture": userPicture})
      console.log(findBook)
     if (findBook) {
       res.status(200).json({status:200, data:req.body, message:"This book is already in your favorite list"})
     } else {
      const userFavorite = await db.collection("favorites").insertOne(req.body)
  
      res.status(200).json({ status: 200, message: "book successfully added to favorite list", data: req.body});
     }
 
    }
  
  } catch (err){
    res.status(400).json({status: 400, message: "Book was not added to favorite list"});
    console.log(err.stack);
  } finally {
    client.close();
  }
}

const deleteFavorite = async(req, res) =>{
  const client = new MongoClient(MONGO_URI, options);
  
  console.log(req.body) 
 
try{
    await client.connect();

    const db = client.db("final-project");
  //in mongodb we use "" to access the keys in database, so we check db to pick "id" and based on   console.log(req.body) in terminal, we have  req.body.item.id
    const deleteOne = await db.collection("favorites").deleteOne({"id": req.body.item.id})
    console.log(deleteOne.deletedCount)
    res.status(200).json({ status: 200, message: "book successfully deleted from favorite list", data: deleteOne });
  } catch (err){
    res.status(400).json({status: 400, message: "Book was not deleted"});
    console.log(err.stack);
  } finally {
    client.close();
  }
}

const getFavorites = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
try{
    await client.connect();

    const db = client.db("final-project");

    const allFavorites = await db.collection("favorites").find().toArray()

    res.status(200).json({ status: 200, message: "All favorite books", data: allFavorites});
  } catch (err){
    res.status(400).json({status: 400, message: "Comment not added"});
    console.log(err.stack);
  } finally {
    client.close();
  }
}

const addPerson = async (req, res) =>{
  const client = new MongoClient(MONGO_URI, options);
  const {user} = req.body
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
  try{
    await client.connect();
    const db = client.db("final-project");
    
    const getPerson = await db.collection("persons").findOne({_id:id})
   

      if (getPerson) {
   res.status(200).json({ status: 200, message: "The requested person data", data: req.body})
    
  } else {  res.status(400).json({status: 400, message: "No person was found based on this id"})}
} catch (err){
    console.log(err.stack);
  } finally {
    client.close();
  }
}


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
 
    const userComment = await db.collection("users").insertOne({newUser})
  
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
    res.status(400).json({status: 400, message: "There is no comment"});
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


module.exports = { getBooks, getSingleBook, getSearchResults, addPerson, getSinglePerson, addFavorite, deleteFavorite, getFavorites, addComment, getComments, deleteComment };
