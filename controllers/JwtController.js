const jwt = require("jsonwebtoken");

const generateToken = async (id) => {
  return await jwt.sign({ id }, process.env.JET_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  generateToken,
};
