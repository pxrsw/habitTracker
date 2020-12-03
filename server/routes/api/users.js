const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get users
router.get('/', async (req, res) => {
	try{
		console.log('PRES GET')
	const users = await loadUsersCollection();
	res.send(await users.find({}).toArray());
	console.log(await users.find({}).toArray())

}catch(err){
	console.log(err)
}
});

// add users
router.post('/', async (req, res) => {
	try{
		console.log('pres', req.body);
	const users = await loadUsersCollection();
	await users.insertOne({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		id: req.body.id,
		password: req.body.password
	});
	res.status(201).send();
}catch(err){
	console.log(err)
}
});

// Delete users
router.delete('/:id', async (req, res) => {
	try{
	const users = await loadUsersCollection();
	const query = {id: req.params.id};
	await users.deleteOne(query);
	// ({
	// 	_id: new mongodb.ObjectID(req.params.id)
	// });
	res.status(200).send();
}catch(err){
	console.log(err)
}
});


router.post('/login', async (req, res) => {
	try{
	console.log('req.body: ', req.body);
  const {id, password} = req.body;
	const users = await loadUsersCollection();
  const query = {id, password};
	const user = await users.find(query).toArray();
  console.log('user: \n', user);
	const result = {role: user[0].role, id};
	res.status(201).send(result);
}catch(err){
	console.log('err: \n', err)
}
});


async function loadUsersCollection(){
const MongoClient = await mongodb.MongoClient.connect
("mongodb+srv://pxrsw:B123123b@habittracker.zsjy4.mongodb.net/habitTracker?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
return MongoClient.db('habitTracker').collection('users');
}
module.exports = router;
