const express = require('express')
const { connect: connectDB } = require('./models/connector')
const taskRouter = require("./api/task");
const bodyParser = require('body-parser')

const app = express()
const port = 4000

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));

app.use('/task', taskRouter);
app.get('/', (req, res) => res.send('Hello World!'))

function startApp() {
	return new Promise(resolve => {
		app.listen(port, () => {
			console.log(`🚀  Server ready at http://localhost:${port}`)
			resolve();
		})
	})
}

connectDB()
	.then(() => startApp())
	.catch(e => {
		console.log(e)
	})
