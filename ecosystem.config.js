module.exports = {
  apps: [
    {
      name: 'web_solgas',
      script: './.next/standalone/server.js', //entrypoint
      instances: 2, 
      max_memory_restart: '1G',
      env: {
        PORT: 9000,
        NODE_ENV: 'production'
      }
    }]
  }
