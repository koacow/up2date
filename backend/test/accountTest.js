require('dotenv').config();
const { describe, it } = require('mocha');
const { request, expect } = require('chai');
const {TEST_USER_ID} = process.env;

describe('/account routes', () => {
	describe('GET /api/account/settings', () => {
		it('should return 200 OK', (done) => {
			request(server)
				.get('/api/account/settings?user_id=' + TEST_USER_ID)
				.end((err, res) => {
					if (err) {
						console.error(err);
					}
					expect(res).to.have.status(200);
					expect(res.body).to.be.a('JSON');
					done();
				});
		});

		it('should return 400 Bad Request', (done) => {
			request(server)
				.get('/api/account/settings')
				.end((err, res) => {
					if (err) {
						console.error(err);
					}
					expect(res).to.have.status(400);
					expect(res.body).to.have.property('error');
					expect(res.body.error).to.equal('Invalid input');
					done();
				});
		});

		it ('should return 404 Not Found', (done) => { 
			request(server)
				.get('/api/account/settings?user_id=00000000-0000-0000-0000-000000000000')
				.end((err, res) => {
					if (err) {
						console.error(err);
					}
					expect(res).to.have.status(404);
					done();
				});
		});
	});
});