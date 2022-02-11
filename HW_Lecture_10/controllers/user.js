module.exports = { createUser, getUser, editUser, removeUser, deleteUsersArticles };

const User = require('../models/user');
const Article = require('../models/article')

//create new user document

function createUser(req, res) {
  console.log(req.body);
  User.create(req.body, (err, data) => {
    if (err) {
      res.status(400).send('Error!');
      return;
    }
    res.json(data);
  });
  console.log(User);
}

//edit required user document fields

function editUser(req, res) {
  User.findByIdAndUpdate({ _id: req.params.userId }, req.body, (err, data) => {
    if (err) {
      res.status(400).send('Error!');
      console.log(err);
      return;
    }
    res.json(data);
  });
  console.log(User);
}

///get information about any user just by passing specific user mongo id as an api parametr

async function getUser(req, res) {
  try {
    const userId = req.params.userId;
    const owner = await User.findById({ _id: userId })
    const articles = await Article.find({ owner: userId });
    // console.log(articles);
    // console.log(owner);
    res.json({ ...owner.toObject(), articles });
  }
  catch (err) {
    console.log(err);
    res.status(400).send('User is not found!');
  }
};


//remove specific user from mongodb and all articles that he created.


async function removeUser(req, res) {
  try {
    const userId = req.params.userId;
    const owner = await User.findByIdAndDelete({ _id: userId })
    const articles = await Article.deleteMany({ owner: userId });
    console.log(articles);
    console.log(owner);
    res.status(200).send('User and his articles are removed!');
  }
  catch (err) {
    console.log(err);
    res.status(400).send('Error!');
  }
};

//get all articles that created by specific user

async function deleteUsersArticles(req, res) {
  try {
    const userId = req.params.userId;
    const owner = await User.findById({ _id: userId })
    const articles = await Article.deleteMany({ owner: userId });
    console.log(articles);
    owner.numberOfArticles = 0;
    owner.save();
    res.status(200).send('User\'s articles are removed!');
    console.log(owner);
  }
  catch (err) {
    console.log(err);
    res.status(400).send('Error!');
  }
};
