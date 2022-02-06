'use strict';

const studentsData = require('./students.json');

// db connection and settings
const connection = require('./config/connection');
let studentsCollection;
run();

async function run() {
  await connection.connect();
  await connection.get().dropCollection('students');
  await connection.get().createCollection('students');
  studentsCollection = connection.get().collection('students');

  await importStudents(studentsCollection);
  await findWorstScore(studentsCollection);
  await findCertainStudent(studentsCollection);
  await findCertainStudent2(studentsCollection);
  await calcAverageScore(studentsCollection);
  await deleteStudents(studentsCollection);
  await markStudent(studentsCollection);
  await queryGroup(studentsCollection);

  await connection.close();
}

// #### Students

// - Import all data from students.json into student collection
async function importStudents(collection) {
  try {
    return collection.insertMany(studentsData);
  } catch (err) {
    console.error(err);
  }
}

// - Find all students who have the worst score for homework, sort by descent

async function findWorstScore(score) {
  try {
    const cursor = score
      .find({scores: {$elemMatch: {score: {$lt: 50}, type: 'homework'}}})
      .sort({'scores.2.score': -1});
    const data = await cursor.toArray();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

// - Find all students who have the best score for quiz and the worst for homework, sort by ascending

async function findCertainStudent(score) {
  try {
    const cursor = score
      .find({
        $and: [
          {scores: {$elemMatch: {score: {$lt: 20}, type: 'homework'}}},
          {scores: {$elemMatch: {score: {$gt: 95}, type: 'quiz'}}}
        ]
      })
      .sort({'scores.2.score': 1});
    const data = await cursor.toArray();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

// - Find all students who have best scope for quiz and exam

async function findCertainStudent2(score) {
  try {
    const cursor = score
      .find({
        $and: [
          {scores: {$elemMatch: {score: {$gt: 95}, type: 'exam'}}},
          {scores: {$elemMatch: {score: {$gt: 95}, type: 'quiz'}}}
        ]
      })
      .sort({'scores.2.score': 1});
    const data = await cursor.toArray();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

// - Calculate the average score for homework for all students

async function calcAverageScore(score) {
  try {
    const cursor = score.aggregate([
      {$unwind: '$scores'},
      {$group: {_id: null, avg: {$avg: '$scores.score'}}}
    ]);
    const data = await cursor.toArray();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

// - Delete all students that have homework score <= 60

async function deleteStudents(score) {
  try {
    return score.deleteMany({scores: {$elemMatch: {score: {$lte: 60}, type: 'homework'}}});
  } catch (err) {
    console.error(err);
  }
}

// - Mark students that have quiz score => 80

async function markStudent(score) {
  try {
    return score.updateMany(
      {scores: {$elemMatch: {score: {$gte: 80}, type: 'quiz'}}},
      {$set: {honor: 'Best student in quiz!'}}
    );
  } catch (err) {
    console.error(err);
  }
}

// - Write a query that group students by 3 categories (calculate the average grade for three subjects)
// - a => (between 0 and 40)
// - b => (between 40 and 60)
// - c => (between 60 and 100)

async function queryGroup(score) {
  try {
    const cursor = score.aggregate([
      {$unwind: '$scores'},
      {$group: {_id: '$_id', avg: {$avg: '$scores.score'}, name: {$first: '$name'}}},
      {
        $addFields: {
          group: {
            $cond: {
              if: {$lte: ['$avg', 40]},
              then: 'a',
              else: {$cond: {if: {$gte: ['$avg', 60]}, then: 'c', else: 'b'}}
            }
          }
        }
      },
      {$group: {_id: '$group', students: {$addToSet: '$name'}}}
    ]);

    const data = await cursor.toArray();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}
