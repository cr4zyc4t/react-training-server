module.exports = {
	apps: [{
		name: 'TrainingAPI',
		script: 'index.js',
		env: {
			NODE_ENV: 'development',
		},
		env_production: {
			NODE_ENV: 'production',
			PORT: 4000,
		},
	}],

	deploy: {
		production: {
			user: 'ubuntu',
			key: 'D:\\Documents\\toanvq\@199',
			host: '10.116.224.199',
			ref: 'origin/master',
			repo: 'https://github.com/cr4zyc4t/react-training-server.git',
			path: '/home/toanvq/Workspace/react-training-server',
			'post-deploy': 'yarn install && pm2 reload ecosystem.config.js --env production',
		},
	},
};
