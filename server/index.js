const express = require('express');
const helmet = require('helmet');
const morgan = require ('morgan');
const port = 8000;

const {getBooks, getSingleBook} = require ("./handlers")

express()
  .use(express.json())
  .use(helmet())
  .use(morgan('tiny'))

  .get('/api/get-books', getBooks)
  .get('/api/get-book/:id', getSingleBook)







  .listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })




