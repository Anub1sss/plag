module.exports = {
  apps: [
    {
      name: 'kultivator-web',
      script: '.next/standalone/server.js',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '512M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0',
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      restart_delay: 1000,
      max_restarts: 50,
      min_uptime: '10s',
    },
    {
      name: 'keep-alive',
      script: './keep-alive.sh',
      cwd: __dirname,
      interpreter: '/bin/bash',
      instances: 1,
      autorestart: true,
      env: {
        KEEPALIVE_INTERVAL: 120,
        PORT: 3000,
      },
      error_file: './logs/keepalive-err.log',
      out_file: './logs/keepalive-out.log',
      merge_logs: true,
    },
  ],
}
