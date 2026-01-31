const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Read token from header: "Authorization: Bearer <token>"
  const token = req.header("Authorization")?.split(" ")[1];

  // If no token
  if (!token) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Save userId for later routes
    req.userId = decoded.userId;

    // Allow request to continue
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};