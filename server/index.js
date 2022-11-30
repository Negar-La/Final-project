const express = require('express');
const helmet = require('helmet');
const morgan = require ('morgan');
const port = 8000;

const {getBooks, getSingleBook, getSearchResults, addFavorite, addComment, getComments, deleteComment} = require ("./handlers")

express()
  .use(express.json())
  .use(helmet())
  .use(morgan('tiny'))

  .get('/api/get-books', getBooks)
  .get('/api/get-book/:id', getSingleBook)
  .get("/api/books/search/:userInput", getSearchResults)
  .post("/api/add-favorite", addFavorite)
  .post("/api/comment/:id", addComment)
  .get("/api/comment/:id", getComments)
  .delete("/api/comment/:id", deleteComment)






  .listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })




