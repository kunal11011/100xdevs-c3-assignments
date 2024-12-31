const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userMiddleware = require("../middleware/user");
const { User, Todo } = require("../database/index");
const redisClient = require("../database/redisDB");

const router = Router();

const SECRET_TOKEN = process.env.SECRET_TOKEN;
const EXP_TIME = process.env.EXP_TIME;

// User Routes
router.post("/signup", async (req, res, next) => {
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
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  // Implement user login logic
  try {
    const userCredentials = req.body;
    const dbUser = await User.findOne({ email: userCredentials.email });
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

    const token = jwt.sign({ email: dbUser.email }, SECRET_TOKEN, {
      expiresIn: `${EXP_TIME}s`,
    });

    res.json({
      token: token,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/todos", userMiddleware, async (req, res) => {
  // Implement logic for getting todos for a user
  const userTodos = await Todo.find({ userId: req.id });
  res.json(userTodos);
});

router.post("/logout", userMiddleware, async (req, res, next) => {
  // Implement logout logic
  try {
    const jwtToken = req.headers.authorization;
    const token = jwtToken.split(" ")[1];
    await redisClient.set(token, "blacklisted", "EX", EXP_TIME);
    res.status(200).json({ message: "Successfully Logged Out." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
