const express = require('express');
const bodyParser = require('body-parser');
const { connect: connectDB } = require('./models/connector');
const taskRouter = require('./api/task');

const app = express();
const port = parseInt(process.env.PORT, 10) || 4000;

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true,
}));

app.use('/tasks', (req, res, next) => {
	const token = req.header('Authorization');
	if (!token) {
		res.status(401);
		res.json({
			ok: false,
			error: {
				name: 'Authorization error',
				message: 'No token in header',
			},
		});
		return;
	}
	req.token = token;
	next();
}, taskRouter);
app.get('/', (req, res) => res.send('Hello World!'));

function startApp() {
	return new Promise(resolve => {
		app.listen(port, () => {
			console.log(`🚀  Server ready at http://localhost:${port}`);
			resolve();
		});
	});
}

connectDB()
	.then(() => startApp())
	.catch(e => {
		console.log(e);
	});
