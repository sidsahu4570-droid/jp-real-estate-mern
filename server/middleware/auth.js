const jwt = require('jsonwebtoken');

const protectAdmin = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'jp_real_estate_jwt_secret_key_2026_super_secure');
      req.admin = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Unauthorized, invalid or expired token' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized, no authorization token provided' });
  }
};

module.exports = { protectAdmin };
