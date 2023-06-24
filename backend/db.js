const { MongoClient } = require('mongodb');

require('dotenv').config();


const uri = process.env.MONGODB_URI;
const db_name = process.env.DB_NAME;
const client = new MongoClient(uri);

let db;

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    db = client.db(db_name);
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err);
  }
}

function getDb() {
  return db;
}

module.exports = {
  connect,
  getDb,
};
