const path = require('path');
const dotenv = require('dotenv-defaults');

const SOURCE_HASH = require('./source-hash');

const config = dotenv.config({ defaults: path.resolve('./configs/env/.env.defaults') }).parsed;
const { env } = process;

const envConfig = {
  SOURCE_HASH,
  ...Object.keys(config).reduce(
    (acc, key) => {
      acc[key] = env[key] || config[key];
      return acc;
    }, {}
  )
};

/* eslint-disable no-console */
if (envConfig.DEBUG_MODE === '1') {
  console.log('\n--- envConfig:', envConfig);
}
/* eslint-disable no-console */

module.exports = envConfig;