const express = require('express');

const router = express.Router();
const { TaskModel } = require('../models/connector');

router.get('/', (req, res) => {
	const token = req.token;
	TaskModel.findAll({
		where: {
			token,
		},
	}).then(result => {
		res.json({
			ok: true,
			result,
		});
	}).catch(e => {
		res.json({
			ok: false,
			error: {
				name: e.name,
				message: e.message,
			},
		});
	});
});

router.post('/', (req, res) => {
	console.log(req.params);
	res.json({
		ok: true,
	});
});

module.exports = router;
