const cli = require('next/dist/cli/next-dev');
cli.nextDev(['-p', process.env.WEB_PORT ?? '8080']);
