const Sequelize = require('sequelize');
const path = require('path');

const db = new Sequelize('task-manager', null, null, {
	dialect: 'sqlite',
	storage: path.resolve(process.cwd(), 'db/task-manager.sqlite'),
	logging: true,
	operatorsAliases: false,
});

const TaskModel = db.define('task', {
	token: { type: Sequelize.STRING },
	title: { type: Sequelize.STRING },
	desc: { type: Sequelize.STRING },
	is_completed: { type: Sequelize.BOOLEAN },
	complete_time: { type: Sequelize.BIGINT },
});

function connect() {
	return db.sync({ force: false });
}

module.exports = {
	connect,
	TaskModel,
};
