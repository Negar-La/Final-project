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
      
      //in books collection we find the book based on its id
      let singleBook = await db.collection("books").findOne({id: id});
    
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
  
      const results = await db.collection("books").find().toArray();
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


const getSearchAuthor = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const author = req.params.author;
  console.log(author)

  try{
      await client.connect();
      const db = client.db("final-project");

      const results = await db.collection("books").find().toArray();
      let getAuthors = results.filter((book) => {
        if (book.author.toLowerCase().includes(author.toLowerCase())) {
            return book;
        }
      });
      
      if (getAuthors.length > 0) {
        res.status(200).json({status:200, data : getAuthors, message:"The results of author's search"})
        } else {
        res.status(404).json({status:404, message:"Sorry, No book was found based on this author"})
        }
     } catch(err){
      console.log(err.stack);
    }
    finally {
        client.close();
    }
};








module.exports = { getBooks, getSingleBook, getSearchResults, getSearchAuthor};
