const jwt = require("jsonwebtoken");

const generateSign = (user_id) => {
  return jwt.sign({ user_id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

const verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateSign, verifyJwt }