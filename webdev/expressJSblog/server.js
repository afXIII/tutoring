const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const mongodb = require('mongodb')
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('view engine', 'ejs')


app.get('/addpost', function (req, res) {
	res.sendFile(__dirname + '/newpost.html')
})


MongoClient.connect(/*add your mongo DB atlas connection string here*/, { useUnifiedTopology: true })
	.then(client => {
		console.log('Connected to Database')
		const db = client.db('blog')
		const quotesCollection = db.collection('posts')


		app.get('/', function (req, res) {
			const posts = db.collection('posts').find().toArray()
				.then(results => {
					res.render("index.ejs", {posts: results})
				})
				.catch(error => console.error(error))

		})

		app.post('/addpost',  (req, res) => {
			console.log(req.body)
			quotesCollection.insertOne(req.body)
			.then(result => {
				res.redirect('/')
			})
			.catch(error => console.error(error))
		})


		app.delete('/delete/:id', (req, res) => {
			quotesCollection.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
			.then(result => {
		    	res.json(`Deleted post with id` + req.params.id)
		    })
		    .catch(error => console.error(error))
		})


	})
	.catch(error => console.error(error))


const port = process.env.port || 3000
app.listen(port, function() {
  console.log('listening on ' + port)
})