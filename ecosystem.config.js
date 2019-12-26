module.exports = {
	apps: [{
		name: 'TrainingAPI',
		script: 'index.js',
		env: {
			NODE_ENV: 'development',
		},
		env_production: {
			NODE_ENV: 'production',
			PORT: 4200,
		},
	}],

	deploy: {
		production: {
			user: 'toanvq',
			key: '/Users/toanvq/Documents/Keys/ubuntu@my-aws-ec2.pem',
			host: '52.77.254.77',
			ref: 'origin/master',
			repo: 'https://github.com/cr4zyc4t/react-training-server.git',
			path: '/home/ubuntu/training-api-server',
			'post-deploy': 'yarn && pm2 reload ecosystem.config.js --env production',
		},
	},
};
