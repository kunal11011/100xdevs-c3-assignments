const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Todo } = require("../database/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_TOKEN = process.env.SECRET_TOKEN;

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  try {
    const request = req.body;
    if (!request.name || !request.email || !request.password) {
      throw new Error("Invalid Data.");
    }

    const duplicateUser = await User.findOne({ email: request.email });
    if (duplicateUser) {
      throw new Error("Choose other email id.");
    }

    const hashedPassword = await bcrypt.hash(request.password, 9);

    const newUser = await User.create({
      name: request.name,
      email: request.email,
      password: hashedPassword,
    });

    res.json({
      message: `${newUser.name} created successfully with email ${newUser.email}`,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  // Implement user login logic
  try {
    const userCredentials = req.body;
    const dbUser = await User.findOne({ email: request.email });
    if (!dbUser) {
      throw new Error("Invalid credentials.");
    }
    const comparePass = await bcrypt.compare(
      userCredentials.password,
      dbUser.password
    );
    if (!comparePass) {
      throw new Error("Invalid credentials.");
    }

    const token = jwt.sign({ email: dbUser.email }, SECRET_TOKEN, { expiresIn: 15 });

    res.json({
        token : token
    })
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.get("/todos", userMiddleware, (req, res) => {
  // Implement logic for getting todos for a user
});

router.post("/logout", userMiddleware, (req, res) => {
  // Implement logout logic
});

module.exports = router;
