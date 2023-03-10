const cli = require('next/dist/cli/next-start');
cli.nextStart(['-p', process.env.WEB_PORT ?? '8080']);
