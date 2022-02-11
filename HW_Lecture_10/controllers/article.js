module.exports = { createArticle, editArticle, searchArticle, removeArticle };

// const error = require('mongoose/lib/error');

const Article = require('../models/article');
const User = require('../models/user');

//create new article document

async function createArticle(req, res) {
  try {
    const userId = req.body.owner;
    console.log(userId);
    const existingOwner = await User.findOne({ _id: userId }, { runValidators: true })
    console.log(existingOwner);
    if (existingOwner) {
      Article.create(req.body, (err, data) => {
        if (err) {
          res.status(400).send('Error!');
          return;
        }
        existingOwner.numberOfArticles += 1;
        existingOwner.save();
        res.json(data);
      });
    }
  } catch {
    res.status(400).send('Error!');
  }
  console.log(Article);
}

// edit any article document with existance article checking 

async function editArticle(req, res, next) {
  try {
    const articleId = req.params.articleId;
    const body = req.body;
    const existingArticle = await Article.findByIdAndUpdate({ _id: articleId }, body);
    if (!existingArticle) {
      res.status(400).send('Article not exist!');
    }
    console.log(existingArticle);
    return res.status(200).json(existingArticle)
  }
  catch (error) {
    next(error);
  }
}

// to search for articles using next filters title, subtitle, description, owner, category,
// createdAt, updatedAt.If I request endpoint without setting filter criteria,
//  I should get all articles from database. (Also you should populate owner field)

async function searchArticle(req, res, next) {
  try {
    const {
      query: { skip = 0, limit = 10, search = '', sort: sortFromClient }
    } = req;
    const sort = util.sort(sortFromClient);
    const filter = { $regex: new RegExp(util.escapeRegExpChars(search), 'i') };
    const query = { $or: [{ title: filter }, { description: filter }, { category: filter }] };
    const result = await Article.find(query)
      .populate('owner')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
}


// http://localhost:4040/api/article/?search=history

// to delete any article from database

async function removeArticle(req, res, next) {
  try {
    const articleId = req.params.articleId;
    const article = await Article.findByIdAndDelete({ _id: articleId });
    console.log(article);
    if (article) {
      const ownerId = article.owner;
      const existingOwner = await User.findById({ _id: ownerId })
      existingOwner.numberOfArticles -= 1;
      existingOwner.save();
    }
    res.status(200).send('Article is removed!');
  }
  catch (err) {
    console.log(err);
    next(err);
  }
}
