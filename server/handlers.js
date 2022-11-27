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



module.exports = { getBooks, getSingleBook };
