const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT;
const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");

app.use(express.json());

// app.get("/healthy", (req, res)=> res.send("I am Healthy"));

//  start writing your routes here
app.use("/user", userRoutes);
app.use("/todo", todoRoutes);

app.use((err, req, res, next) => {
  // logic
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong.";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
  });
});

app.listen(port, () =>
  console.log(`server is running at http://localhost:${port}`)
);
