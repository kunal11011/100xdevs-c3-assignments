const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

function userMiddleware(req, res, next) {
  // Implement user auth logic
//   const loggedUser = jwt.verify(req.headers.auth, SECRET_KEY);
//   if (loggedUser) {
//     next();
//   } else {
//     res.json({
//       message: "Please log in.",
//     });
//   }
}

module.exports = userMiddleware;
