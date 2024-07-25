require('dotenv').config();
const { describe, it } = require('mocha');
const {TEST_USER_ID} = process.env;

describe('/user routes', () => {
  describe('GET /settings', () => {
    it('should return user settings', async () => {
      // test implementation
    });
  });
});