const express = require('express');

const router = express.Router();
const { TaskModel } = require('../models/connector');
const { handlePromise } = require('../utils');

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

router.get('/:id', (req, res) => {
	const id = req.params.id;
	const token = req.token;
	TaskModel.findAll({
		where: {
			token,
			id,
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

function validateTask({
	title, desc, is_completed, completed_time,
}) {
	if (!title || typeof title !== 'string') {
		return 'title must be string';
	}
	if (!desc || typeof desc !== 'string') {
		return 'desc must be string';
	}
	if (typeof is_completed !== 'boolean') {
		return 'is_completed must be boolean';
	}
	if (typeof completed_time !== 'number' || completed_time <= 0) {
		return 'completed_time must be positive number';
	}
	return true;
}

router.post('/', async (req, res) => {
	const params = req.body;
	const validate_result = validateTask(params);
	if (validate_result !== true) {
		res.json({
			ok: false,
			error: {
				name: 'Data error',
				message: validate_result,
			},
		});
		return;
	}
	const token = req.token;
	const [result, error] = await handlePromise(TaskModel.create({ ...params, token }));
	if (error) {
		res.json({
			ok: false,
			error: {
				name: error.name,
				message: error.message,
			},
		});
		return;
	}
	res.json({
		ok: true,
		result: result.toJSON(),
	});
});

router.patch('/:id', async (req, res) => {
	const id = req.params.id;
	const params = req.body;
	const validate_result = validateTask(params);
	if (validate_result !== true) {
		res.json({
			ok: false,
			error: {
				name: 'Data error',
				message: validate_result,
			},
		});
		return;
	}
	const token = req.token;
	TaskModel.findOne({ where: { id, token } })
		.then(result => {
			if (result === null) {
				return Promise.reject(new Error('Item not found'));
			}
			return result.update({ ...params });
		})
		.then(result => {
			console.log('TCL: result', result);
			res.json({
				ok: true,
				result: result.toJSON(),
			});
		})
		.catch(error => {
			res.json({
				ok: false,
				error: {
					name: error.name,
					message: error.message,
				},
			});
		});
});

module.exports = router;
