const jwt = require("jsonwebtoken");
require("dotenv").config();

// set token secret and expiration date
const secret = process.env.JWT_SECRET;
const expiration = "2h";

module.exports = {
  // middleware function for authenticated routes
  authMiddleware: function ({ req }) {
    // get token from header
    let token = req.headers.authorization;

    // trim off "Bearer" from the token string and return only the token
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    // If there's no token, return the request object as is
    if (!token) {
      return req;
    }

    // if token can be verified, add decoded user's data to the request so it can be accessed in the resolver
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
      return res.status(400).json({ message: "invalid token!" });
    }

    // return the request object so it can be passed to the resolver as `context`
    return req;
  },

  //   Function to sign a new token for a user
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    // Generate a new JWT token containing user data
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
