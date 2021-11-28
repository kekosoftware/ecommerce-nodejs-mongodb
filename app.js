const express = require('express')
const app =  express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv/config');

app.use(cors())
app.options('*', cors())

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

// Routers
const productsRoutes = require('./routers/products')
const categoriesRoutes = require('./routers/categories')

const api = process.env.API_URL;

app.use(`${api}/products`, productsRoutes)
app.use(`${api}/categories`, categoriesRoutes)


mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
  console.log('Database connection is ready... ')
})
.catch((err) => {
  console.log(err)
})

app.listen(3000, () =>  {
  console.log("Server is running http://localhost:3000")
})