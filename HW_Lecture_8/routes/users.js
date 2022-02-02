const express = require("express");
const router = express.Router();
const fs = require("fs");
const { send } = require("process");
const data = require("./data.json");

//all existing authors

router.get("/", (req, res) => {
  res.send(data);
});

// one author

router.get("/:id", (req, res) => {
  console.log(req.params.id, data);
  const id = req.params.id;
  const author = data.find((item) => item.id === id);
  console.log(author);
  if (author) {
    res.status(200).send(author);
  } else {
    res.status(404).send("Author  is not found");
  }
});

// specific post by specific author

router.get("/:id/posts/:postId", (req, res) => {
  console.log(req.params.id, req.params.postId);
  const id = req.params.id;
  const postId = req.params.postId;
  const author = data.find((item) => item.id === id);
  console.log(author);
  if (author) {
    const post = author.posts.find((item) => item.id === postId);
    if (post) {
      res.status(200).send(post);
    } else {
      res.status(404).send("Post is not found");
    }
  } else {
    res.status(404).send("Author is not found");
  }
});

// add new author

router.post("/", postValidator, (req, res) => {
  data.push(req.body);
  fs.writeFileSync("./routes/data.json", JSON.stringify(data));
  res.status(200).send(" Good job, new author added! ");
});

// rename author

router.put("/:id", putValidator, (req, res) => {
  // console.log("Success");
  const newData = data.filter((item) => {
    return item.id !== req.params.id;
  });
  newData.push(req.body);
  newData.sort((a, b) => {
    return a.id > b.id ? 1 : -1;
  });
  fs.writeFileSync("./routes/data.json", JSON.stringify(newData));

  res.status(200).send(" Good job, author is renamed! ");
});

// remove author item

router.delete("/:id", deleteValidator, (req, res) => {
  const newData = data.filter((item) => {
    return item.id !== req.params.id;
  });
  fs.writeFileSync("./routes/data.json", JSON.stringify(newData));
  res.status(200).send(" Good job, author is removed! ");
});

function postValidator(req, res, next) {
  const body = req.body;
  const exists = data.find((item) => item.id === req.body.id);
  if (exists) {
    res.status(400).send("Author id already exists");
    return;
  }
  if (!body.name) {
    res.status(400).send("Author required");
    return;
  }
  console.log(exists);
  next();
}

function putValidator(req, res, next) {
  const body = req.body;
  const exists = data.find((item) => item.id === req.params.id);
  if (!exists) {
    res.status(400).send("Author doesn't exists");
    return;
  }
  if (!body.name) {
    res.status(400).send("Author name required");
    return;
  }

  console.log(exists);
  next();
}

function deleteValidator(req, res, next) {
  const body = req.body;
  const exists = data.find((item) => item.id === req.params.id);
  if (!exists) {
    res.status(400).send("Author doesn't exists");
    return;
  }
  next();
}

module.exports = router;
