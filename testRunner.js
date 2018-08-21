const jest = require('jest');

const argv = process.argv.slice(2);

process.env.NODE_ENV = 'test';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

// Watch unless on CI or in coverage mode
if (argv.indexOf('--coverage') < 0) {
  argv.push('--watch');
}

const config = require('./testConfig/jest-config.js');


argv.push('--config', JSON.stringify(config));

jest.run(argv);
