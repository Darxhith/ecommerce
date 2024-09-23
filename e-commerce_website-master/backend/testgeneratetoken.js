import mongoose from 'mongoose';
import { generateToken } from './utils.js';
import User from './models/userModel.js';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected');

  // Replace with a valid user ID from your database
  const userId = '66e5377203fe7a8266b33b47'; 

  // Fetch the user from the database
  const user = await User.findById(userId);

  if (!user) {
    console.error('User not found');
    return;
  }

  // Generate a token for the user
  const token = generateToken(user);
  console.log('Generated Token:', token);

  // Close the connection
  mongoose.connection.close();
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});



