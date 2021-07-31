const dotenv = require('dotenv');

dotenv.config({ path: '.env' });
const TOKEN = process.env.ZENDESK_OAUTH_TOKEN;

module.exports = { TOKEN };