module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'teach_assets_fe',
      script: 'scripts/start.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },

    // Second application
    {
      name: 'teach_assets_be',
      script: 'server/bin/www',
      env: {
        PORT: 3010
      },
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'zhouyang',
      host: 'im2ode.chinacloudapp.cn',
      ref: 'origin/master',
      repo: 'git@github.com:vanceeasleaf/teach_assets',
      path: '/var/www/teach_assets',
      'post-deploy': 'npm install &&cd server && npm install && cd .. && pm2 reload ecosystem.config.js --env production'
    },
    dev: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/development',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env dev',
      env: {
        NODE_ENV: 'dev'
      }
    }
  }
};
