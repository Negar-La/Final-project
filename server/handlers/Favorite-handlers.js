"use strict";
const { MongoClient} = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


const addFavorite = async(req, res) =>{
  const client = new MongoClient(MONGO_URI, options);
  const { user, userPicture, title, author, imageSrc, id } = req.body;
  console.log(id)
  console.log( req.body)  
try{
    await client.connect();

    const db = client.db("final-project");
    if (user && userPicture && title && author && imageSrc && id) {
      const findBook = await db.collection("favorites").findOne({"id": id, "user": user})
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
  
  console.log("1", req.body)
  // console.log("2", req.body.item.id);
 
try{
    await client.connect();

    const db = client.db("final-project");
  //in mongodb we use "" to access the keys in database, so we check db to pick "id" and based on   console.log(req.body) in terminal, we have  req.body.item.id
    const deleteOne = await db.collection("favorites").deleteOne({"id": req.body.selectedItem.id, "user": req.body.selectedItem.user})
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
  const {id} = req.params;
  console.log('id', id);
try{
    await client.connect();

    const db = client.db("final-project");

    const allFavorites = await db.collection("favorites").find().toArray() 
    const filteredFavorites = allFavorites.filter((fav)=>{
      return fav.user === id;
    })
    // console.log(filteredFavorites);

    res.status(200).json({ status: 200, message: "All favorite books for this user", data: filteredFavorites});
  } catch (err){
    res.status(400).json({status: 400, message: "Comment not added"});
    console.log(err.stack);
  } finally {
    client.close();
  }
}


module.exports = {  addFavorite, deleteFavorite, getFavorites };
