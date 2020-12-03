const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


router.post('/', async (req, res) => {
	try{
    const db = getDB();
    db.createCollection("employees", function(err, res) {
      if (err) throw err;
      console.log("Collection is created!");
      db.close();
    });
	  res.status(201).send();
  } catch(err){
	   console.log(err)
  }
});

async function getDB() {
  const MongoClient = await mongodb.MongoClient.connect
  ("mongodb+srv://pxrsw:B123123b@habittracker.zsjy4.mongodb.net/habitTracker?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
  return MongoClient.db('habitTracker');
}

module.exports = router;
