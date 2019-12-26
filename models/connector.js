const Sequelize = require('sequelize');
const path = require('path');

const db = new Sequelize('task-manager', null, null, {
	dialect: 'sqlite',
	storage: path.resolve(process.cwd(), 'db/task-manager.sqlite'),
	logging: false,
	operatorsAliases: 0,
});

const TaskModel = db.define('task', {
	creator: { type: Sequelize.STRING, allowNull: false },
	title: { type: Sequelize.STRING, allowNull: false },
	desc: { type: Sequelize.STRING, allowNull: false },
	is_completed: { type: Sequelize.BOOLEAN, allowNull: false },
	completed_time: { type: Sequelize.BIGINT, allowNull: true },
	meta: { type: Sequelize.STRING, allowNull: true },
});

function connect() {
	return db.sync({ force: false });
}

module.exports = {
	connect,
	TaskModel,
};
