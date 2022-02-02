const express = require("express");
const app = express();

const PORT = 3000;

const usersRouter = require("./routes/users");

app.use(express.json());
app.use("/users", usersRouter);

function errorHandler(err, req, res, next) {
  if (err.status) {
    return res.status(err.status).json({ err: err.message });
  }
  return res.status(400).json({ err: "Internal error" });
}

app.use(errorHandler);
app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
