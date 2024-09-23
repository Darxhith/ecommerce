import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';  // Assuming isAuth middleware is implemented
import { isAdmin } from '../utils.js';  // You need to create this function

const orderRouter = express.Router();

// Create a new order
orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const newOrder = new Order({
        orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });

      const order = await newOrder.save();
      res.status(201).send({ message: 'New Order Created', order });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).send({ message: 'Server Error' });
    }
  })
);

// Fetch all orders (Admin route)
orderRouter.get(
  '/',
  isAuth,
  isAdmin,  // Ensure only admins can access this route
  expressAsyncHandler(async (req, res) => {
    try {
      const orders = await Order.find({});
      res.send(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).send({ message: 'Server Error' });
    }
  })
);

// Fetch order by ID
orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (order) {
        res.send(order);
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    } catch (error) {
      console.error('Error fetching order by ID:', error);
      res.status(500).send({ message: 'Server Error' });
    }
  })
);

// Fetch orders for the logged-in user
orderRouter.get(
  '/user',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user._id });
      res.send(orders);
    } catch (error) {
      console.error('Error fetching user orders:', error);
      res.status(500).send({ message: 'Server Error' });
    }
  })
);

export default orderRouter;
