const { Router } = require("express");
const adminMiddleware = require("../middleware/user");
const router = Router();
const { User, Todo } = require("../database/index");

// todo Routes
router.post("/", adminMiddleware, async (req, res, next) => {
  // Implement todo creation logic
  const reqBody = req.body;
  try {
    const newTodo = await Todo.create({
      // createdAt: Date.now(),
      title: reqBody.title,
      description: reqBody.description ?? "",
      userId: req.id,
    });
    res.json(newTodo);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", adminMiddleware, async (req, res, next) => {
  // Implement update todo  logic
  const reqBody = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, reqBody, {
      new: true,
    });

    if (updatedTodo) {
      res.json(updatedTodo);
    } else {
      throw new Error("No Todo Found.");
    }
  } catch (error) {
    if (error.message === "No Todo Found.") {
      error.statusCode = 404;
    }
    next(error);
  }
});

// router.delete("/", adminMiddleware, (req, res) => {
//   // Implement delete todo logic
// });

router.delete("/:id", adminMiddleware, async (req, res, next) => {
  // Implement delete todo by id logic
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      throw new Error("No Todo available.");
    }
    res.json({
      message: `${deletedTodo.title} removed successfully.`,
    });
  } catch (error) {
    if (error.message === "No Todo available.") {
      error.statusCode = 404;
    }
    next(error);
  }
});

router.get("/", adminMiddleware, async (req, res) => {
  // Implement fetching all todo logic
  const userTodos = await Todo.find({ userId: req.id });
  res.json(userTodos);
});

router.get("/:id", adminMiddleware, async (req, res, next) => {
  // Implement fetching todo by id logic
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      throw new Error("No Todo available.");
    }
    res.json(todo);
  } catch (error) {
    if (error.message === "No Todo available.") {
      error.statusCode = 404;
    }
    next(error);
  }
});

module.exports = router;