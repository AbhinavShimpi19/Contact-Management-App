const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Invalid or expired token");
      }

      req.user = decoded.user; // Attach user info to request object
      next(); // Proceed to the next middleware or route handler
    });
  } else {
    res.status(401);
    throw new Error("No token provided, authorization denied");
  }
});

module.exports = validateToken;
