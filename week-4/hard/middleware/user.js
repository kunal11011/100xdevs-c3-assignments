const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const SECRET_KEY = process.env.SECRET_TOKEN;
const { User, Todo } = require("../database/index");

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  try {
    const jwtToken = req.headers.authorization;
    if (!jwtToken) {
      throw new Error("Unauthorized User");
    }
    const token = jwtToken.split(" ")[1];

    const currentUser = jwt.verify(token, SECRET_KEY);

    const user = await User.find({ email: currentUser.email });
    if (currentUser && user.length) {
      req.email = user[0].email;
      req.id = user[0]._id.toString();
      next();
    } else {
      // TODO: You can use a custom error class to add status code or create an if block here.
      throw new Error("Unauthorized User");
    }
  } catch (error) {
    // TODO: You can use a custom error class to add status code or create an if block here.
    if (error.message === "Unauthorized User") {
      error.statusCode = 401;
    }
    next(error);
  }
}

module.exports = userMiddleware;
