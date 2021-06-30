const {db} = require('./dbconnector.js');
const express = require('express');
var md5 = require('md5');
const app = express();
const port = 4000;

let session = {
	user_id: null
};




app.use(express.json());
app.use(express.urlencoded());





app.use('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
 });





app.use('/api/users', function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});





app.use('/api/books', function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});






app.use('/api/books/getbyyear/:year', function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});





app.use('/api/books/:id', function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});





app.post('/api/books', (req, res) => {
	if(!db.is_connected()){
		res.status(500).send({error: true, msg: 'DB is not connected'});
		return;
	}
	db.insert('Books', {
		Title: req.body.title,
		Author: req.body.author,
		Year: req.body.year,
		UserID: db.object_id(req.body.user_id)
	}, (resp)=>{
		res.send({error: false, msg: '', book_id: resp.insertedId});
	});
});





app.put('/api/books/:id', (req, res) => {
	if(!db.is_connected()){
		res.status(500).send({error: true, msg: 'DB is not connected'});
		return;
	}
	const {id} = req.params;
	if(id !== req.body.id){
		res.status(500).send({error: true, msg: 'Error matching data'});
		return;	
	}
	db.update('Books', {
		Title: req.body.title,
		Author: req.body.author,
		Year: req.body.year
	}, {
		_id: db.object_id(id)
	}, (resp)=>{
		res.send({error: false, msg: '', book_id: resp.insertedId});
	});
});





app.get('/api/books', (req, res) => {
	if(!db.is_connected()){
		res.status(500).send({error: true, msg: 'DB is not connected'});
		return;
	}
	if(session.user_id == undefined || session.user_id == null)
	{
		res.send({error: true, msg: 'No session'});
		return;
	}
	db.select('Books', {UserID: db.object_id(session.user_id)}, 
		(resp)=>
		{
			res.send({error: false, msg: '', data: resp });
		});
});





app.delete('/api/books/:id', (req, res) => {
	if(!db.is_connected()){
		res.status(500).send({error: true, msg: 'DB is not connected'});
		return;
	}
	const {id} = req.params;
	if(id !== req.body.id){
		res.status(500).send({error: true, msg: 'Error matching data'});
		return;	
	}
	db.delete('Books', {_id: db.object_id(id)}, (resp)=>
		{
			res.send({error: false, msg: '' });
		});
});





app.get('/api/books/getbyyear/:year', function(req, res)
{
	if(!db.is_connected()){
		res.status(500).send({error: true, msg: 'DB is not connected'});
		return;
	}
	const {year} = req.params;
	db.select('Books', {Year: {$gte: year}, UserID: db.object_id(session.user_id)}, 
		(resp)=>
		{
			res.send({error: false, msg: '', data: resp });
		});
});




app.post('/api/users', function(req, res)
{
	if(!db.is_connected()){
		res.status(500).send({error: true, msg: 'DB is not connected'});
		return;
	}
	if(req.body.cmd == 'signup')
	{
		db.insert('Users', {
			Email: req.body.email,
			Password: md5(req.body.pass)
		}, (resp)=>{
			session.user_id = resp.insertedId;
			res.send({error: false, msg: '', user_id: resp.insertedId});
		});
	}else if(req.body.cmd == 'login')
	{
		db.select('Users', { Email: req.body.email, Password: md5(req.body.pass) }, (resp)=>
			{
				if(resp)
					if(resp.length > 0){
						session.user_id = resp[0]._id;
						res.send({error: false, msg: '', user_id: resp[0]._id});
					}else
						res.send({error: true, msg: 'User does not exist', user_id: -1});
			});
	}
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

db.setup('BooksEP', 'andrescamilo', 'Aclopez01');
db.connect(()=>
	{
		console.log('DB connected!!');
	});