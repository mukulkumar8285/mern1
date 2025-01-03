const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.user;
    console.log("us0", decoded);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const AuthMiddleware = {
    verifyToken
}
module.exports = AuthMiddleware; 