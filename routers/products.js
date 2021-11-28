const { Product } = require('../models/product');
const { Category } = require('../models/category');
const express = require('express')
const router = express.Router()

// http://localhost:3000/api/v1/products
router.get(`/`, async (req, res) => {
  const productList = await Product.find()
  if(!productList) {
    res.status(500).json({success: false})
  }
  res.send(productList)
})

router.post(`/`, async (req, res) =>{
  const category = await Category.findById(req.body.category);
  if(!category) return res.status(400).send('Invalid Category')

  // const file = req.file;
  // if(!file) return res.status(400).send('No image in the request')

  // const fileName = file.filename
  // const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
  let product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,// "http://localhost:3000/public/upload/image-2323232"
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
  })

  product = await product.save();

  if(!product) 
  return res.status(500).send('The product cannot be created')

  res.send(product);
})

module.exports = router;