const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	setTimeout(() => {
		res.json([
			{
				id: 1,
				employee_name: "Mrs. Janessa Hackett",
			},
			{
				id: 2,
				employee_name: "Dr. Orie Ernser",
			}
		])
	}, 2000);
});

module.exports = router;
