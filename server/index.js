const express = require('express');
const helmet = require('helmet');
const morgan = require ('morgan');
const port = 8000;

const {getBooks, getSingleBook, getSearchResults, getSearchAuthor, getCategories, getSingleCategory} = require ("./handlers/books-handler")
const {addFavorite, deleteFavorite, getFavorites} = require ("./handlers/Favorite-handlers")
const {addComment, getComments, deleteComment} = require ("./handlers/comments-handler")
const {addPerson, getSinglePerson} = require ("./handlers/person-Auth0-handler")

express()
  .use(express.json())
  .use(helmet())
  .use(morgan('tiny'))

  .get('/api/get-books', getBooks)
  .get('/api/get-book/:id', getSingleBook)
  .get("/api/books/search/:userInput", getSearchResults)
  .get("/api/books/searchByAuthor/:author", getSearchAuthor)
  .get("/api/get-categories", getCategories)
  .get("/api/get-categories/:categories", getSingleCategory)

  .post("/api/person", addPerson)
  .get("/api/person/:id", getSinglePerson)

  .post("/api/add-favorite", addFavorite)
  .delete("/api/delete-favorite", deleteFavorite)
  .get("/api/get-favorites", getFavorites)

  .post("/api/comment/:id", addComment)
  .get("/api/comment/:id", getComments)
  .delete("/api/delete-comment", deleteComment)






  .listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })




