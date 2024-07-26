const jwt = require("jsonwebtoken");
const { User } = require("../models");

const secret = "your_secret";
const expiration = "2h";

module.exports = {
  authMiddleware: async ({ req }) => {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      const user = await User.findById(data._id).select('-__v -password');
      req.user = user;
    } catch {
      console.log("Invalid token");
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};