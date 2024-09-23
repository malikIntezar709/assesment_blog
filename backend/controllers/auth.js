const authService = require('../services/auth');
const bcrypt = require('bcryptjs');


const register = async (req, res) => {
  const {username, password, role}= req.body;
  try {
  
    const userData = {
      username,
      password: await bcrypt.hash(password, 10),
      role,
    };
    console.log('userData',userData);
    
    const user = await authService.createUser(userData);

    res.status(201).json({ 
        success: true, 
        message: 'User Registered Successfully.',
        data: user 
    });

  } catch (error) {

    if (error.message === 'Username already taken') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
        success: false, 
        message: 'Error saving user' 
    });
  }
};



const login = async (req, res) => {

  console.log('body is:', req.body)
  const { username, password } = req.body;
  
  try {

      const {user, token} = await authService.login(username, password);
      res.status(200).json({ 
          success: true, 
          message: 'User logedin Successfully.',
          data: {user, token} 
      });
    
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ success: false, message: 'User not found' });
    } else if (error.message === 'Invalid credentials') {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    res.status(500).json({ success: false, message: 'Server Error.' });
  }
};

module.exports = {
  register,
  login
};