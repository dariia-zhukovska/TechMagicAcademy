'use strict';

const {mapArticle} = require('./util');

// db connection and settings
const connection = require('./config/connection');
let articleCollection;
run();

async function run() {
  await connection.connect();
  await connection.get().dropCollection('articles');
  await connection.get().createCollection('articles');
  articleCollection = connection.get().collection('articles');

  await createArticles(articleCollection);
  await updateArticle(articleCollection);
  await addTags(articleCollection);
  await findArticles(articleCollection);
  await pullTags(articleCollection);
  await findAll(articleCollection);
  await connection.close();
}

// #### Articles

// - Create 5 articles per each type (a, b, c)
async function createArticles(collection) {
  try {
    return collection.insertMany([
      mapArticle({type: 'a'}),
      mapArticle({type: 'a'}),
      mapArticle({type: 'a'}),
      mapArticle({type: 'a'}),
      mapArticle({type: 'a'}),
      mapArticle({type: 'b'}),
      mapArticle({type: 'b'}),
      mapArticle({type: 'b'}),
      mapArticle({type: 'b'}),
      mapArticle({type: 'b'}),
      mapArticle({type: 'c'}),
      mapArticle({type: 'c'}),
      mapArticle({type: 'c'}),
      mapArticle({type: 'c'}),
      mapArticle({type: 'c'})
    ]);
  } catch (err) {
    console.error(err);
  }
}

// - Find articles with type a, and update tag list with next value [‘tag1-a’, ‘tag2-a’, ‘tag3’]

async function updateArticle(name) {
  try {
    return name.updateMany({type: 'a'}, {$set: {tags: ['tag1-a', 'tag2-a', 'tag3']}});
  } catch (err) {
    console.error(err);
  }
}

// - Add tags [‘tag2’, ‘tag3’, ‘super’] to other articles except articles from type a

async function addTags(tags) {
  try {
    return tags.updateMany({type: {$ne: 'a'}}, {$set: {tags: ['tag2', 'tag3', 'super']}});
  } catch (err) {
    console.error(err);
  }
}

// - Find all articles that contains tags [tag2, tag1-a]

async function findArticles(certainArticle) {
  try {
    return certainArticle.find({tags: {$in: ['tag2', 'tag1-a']}});
  } catch (err) {
    console.error(err);
  }
}

// - Pull [tag2, tag1-a] from all articles

async function pullTags(tags) {
  try {
    return tags.updateMany({}, {$pull: {tags: {$in: ['tag2', 'tag1-a']}}});
  } catch (err) {
    console.error(err);
  }
}
