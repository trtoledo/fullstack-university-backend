const jwt = require("jsonwebtoken");
const SECRET = "supersecret123";

function authenticateToken(req, res, next) {
  // Authorization: Bearer <token>
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token." });
    }

    req.user = decoded;
    next(); 
  });
}

module.exports = authenticateToken;