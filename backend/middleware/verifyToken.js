const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided.' });
  }

  try {
    
    console.log('token',token);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded',decoded);
    
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token.' });
  }
};

module.exports = verifyToken;
