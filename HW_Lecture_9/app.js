'use strict';

const {mapUser, getRandomFirstName} = require('./util');

// db connection and settings
const connection = require('./config/connection');
let userCollection;
run();

async function run() {
  await connection.connect();
  await connection.get().dropCollection('users');
  await connection.get().createCollection('users');
  userCollection = connection.get().collection('users');

  await createUsers(userCollection);
  await deleteUser(userCollection);
  await updateUser(userCollection);
  await findAll(userCollection);
  await connection.close();
}

// #### Users

// - Create 2 users per department (a, b, c)
async function createUsers(collection) {
  try {
    return collection.insertMany([
      mapUser({department: 'a'}),
      mapUser({department: 'a'}),
      mapUser({department: 'b'}),
      mapUser({department: 'b'}),
      mapUser({department: 'c'}),
      mapUser({department: 'c'})
    ]);
  } catch (err) {
    console.error(err);
  }
}

// - Delete 1 user from department (a)

async function deleteUser(user) {
  try {
    return user.deleteOne({department: 'a'});
  } catch (err) {
    console.error(err);
  }
}

// - Update firstName for users from department (b)

async function updateUser(name) {
  try {
    return name.updateMany({department: 'b'}, {$set: {firstName: getRandomFirstName()}});
  } catch (err) {
    console.error(err);
  }
}

// - Find all users from department (c)
async function findAll(allUsers) {
  try {
    return allUsers.find({department: 'c'});
  } catch (err) {
    console.error(err);
  }
}
