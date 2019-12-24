const express = require('express');
const router = express.Router();
const { TaskModel } = require("../models/connector")

router.get('/', function (req, res) {
	console.log(req.params);
	res.json({
		ok: true
	})
});

module.exports = router;