module.exports = {
	apps: [{
		name: 'TrainingAPI',
		script: 'index.js',
		env: {
			NODE_ENV: 'development',
		},
		env_production: {
			NODE_ENV: 'production',
			PORT: 3010,
		},
	}],

	deploy: {
		production: {
			user: 'ubuntu',
			key: '/Users/toanvq/Documents/Keys/ubuntu@my-aws-ec2.pem',
			host: '52.77.254.77',
			ref: 'origin/master',
			repo: 'https://github.com/cr4zyc4t/react-training-server.git',
			path: '/home/ubuntu/projects/training-api-server',
			'post-deploy': 'yarn install && pm2 reload ecosystem.config.js --env production',
		},
	},
};
