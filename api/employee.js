const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res) => {
	setTimeout(() => {
		res.json([
			{
				id: 1,
				employee_name: faker.name.findName(),
			},
			{
				id: 2,
				employee_name: faker.name.findName(),
			},
		]);
	}, 2000);
});

module.exports = router;
