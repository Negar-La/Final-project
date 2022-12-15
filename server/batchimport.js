
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const books = require("./books.json");
const quotes = require("./quotes.json");


const batchImport = async () => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("final-project");

    try {
        await client.connect();
        console.log("connected to books")
        console.log(books)
  
        // await db.collection("books").insertMany(books);
         await db.collection("quotes").insertMany(quotes);
        console.log("success!")
    } catch (e) {
        //triggers error if applicable
        console.log("import failed!")
        console.log(e.stack);
    } finally {
        client.close();
    }
}

batchImport();