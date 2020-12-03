const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


router.post('/post', async (req, res) => {
	try{
    const {text, adminId} = req.body;
    const posts = await loadPostsCollection();
    await posts.insertOne({
      adminId,
      text,
    });
	  res.status(201).send({'result': 'ok'});
  } catch(err){
	   console.log(err)
     res.send(err);
  }
});

async function loadPostsCollection() {
  const MongoClient = await mongodb.MongoClient.connect
  ("mongodb+srv://pxrsw:B123123b@habittracker.zsjy4.mongodb.net/habitTracker?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
  return MongoClient.db('habitTracker').collection('posts');
}

module.exports = router;
