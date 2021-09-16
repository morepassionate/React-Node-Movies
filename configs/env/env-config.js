const path = require('path');
const dotenv = require('dotenv-defaults');

const config = dotenv.config({ defaults: path.resolve('./configs/env/.env.defaults') }).parsed;
const { env } = process;

/* eslint-disable no-console */
console.log('\x1b[36m%s\x1b[0m', `script: "${env.npm_lifecycle_event}"`);
/* eslint-disable no-console */

const SOURCE_HASH = require('./source-hash');

const APP_REVISION = [
  env.npm_package_version,
  SOURCE_HASH,
  env.SOURCE_NAME
].filter(Boolean).join('-');

const envConfig = {
  APP_REVISION,
  ...Object.keys(config).reduce(
    (acc, key) => {
      acc[key] = env[key] || config[key];
      return acc;
    }, {}
  )
};

/* eslint-disable no-console */
if (envConfig.DEBUG_MODE === '1') {
  console.log('\n--- envConfig:', envConfig, '\n');
}
/* eslint-disable no-console */

module.exports = envConfig;