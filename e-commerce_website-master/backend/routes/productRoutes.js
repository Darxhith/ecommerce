import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

const productRouter = express.Router();

// Route to insert products and users from data.js (for initial seeding)
productRouter.post('/seed', async (req, res) => {
  try {
    await Product.deleteMany({}); // Ensure this deletes all products
    const products = await Product.insertMany(data.products); // Insert products from data.js
    await User.deleteMany({}); // Ensure this deletes all users
    const createdUsers = await User.insertMany(data.users); // Insert users from data.js
    res.send({ products, createdUsers });
  } catch (error) {
    res.status(500).send({ message: 'Error seeding data', error: error.message });
  }
});

// Route to get all products
productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// Route to get a product by slug
productRouter.get('/slug/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product by slug', error: error.message });
  }
});

// Route to get a product by ID
productRouter.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product by ID', error: error.message });
  }
});

export default productRouter;
