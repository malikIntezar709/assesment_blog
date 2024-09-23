const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


const createUser = async (userData) => {

  const existingUser = await User.findOne({ username: userData.username });
  if (existingUser) {
    throw new Error('Username already taken');
  }
  
  const newUser = new User(userData);
  await newUser.save();

  console.log('Saved user:', newUser);

  return newUser;

};

const login = async (username, password) => {
  
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error('User not found');
  }

  console.log('user found:', user);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Generate JWT
  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role }, 
    process.env.JWT_SECRET,
    { expiresIn: '24h' } 
  );

  return {
    user,
    token
  };
};

module.exports = {
  createUser,
  login
};