import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';
import { isAuth } from '../utils.js'; // Import isAuth to protect routes

const userRouter = express.Router();

// Sign-in route
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        console.log('User found:', user.email);
        console.log('Password from request:', req.body.password);
        console.log('Password from database:', user.password);
        
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
          });
          return;
        } else {
          console.log('Password comparison failed');
        }
      } else {
        console.log('User not found');
      }
      res.status(401).send({ message: 'Invalid email or password' });
    } catch (error) {
      console.error('Error during sign-in:', error);
      res.status(500).send({ message: 'Server error' });
    }
  })
);

// User registration route
userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).send({ message: 'User already exists' });
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const createdUser = await user.save();
    res.status(201).send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

// User profile route
userRouter.get(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (user) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        });
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).send({ message: 'Server Error' });
    }
  })
);

export default userRouter;
