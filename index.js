const express = require('express');
const bodyParser = require('body-parser');
const { connect: connectDB } = require('./models/connector');
const taskRouter = require('./api/task');
const emRouter = require('./api/employee');
const cors = require('cors');

const app = express();
const port = parseInt(process.env.PORT, 10) || 4000;

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true,
}));
app.use(cors());
// eslint-disable-next-line consistent-return
app.use('/tasks', (req, res, next) => {
	// parse login and password from headers
	const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
	const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

	// Verify login and password are set and correct
	if (login && password && login === password) {
		req.token = login;
		return next();
	}

	res.status(401);
	res.json({
		ok: false,
		error: {
			name: 'Authentication error',
			message: 'Authentication required',
		},
	});
}, taskRouter);
app.use('/employees', emRouter)
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
