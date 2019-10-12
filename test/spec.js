const app = require('supertest')(require('../app'))
const { expect } = require('chai');

describe('Authentication', () => {
  describe('GET /api/sessions', ()=> {
    describe('When not logged in', () => {
      it('returns a 401', async() => {
        const response = await app.get('/api/sessions');
        expect(response.status).to.equal(401);
      })
    })
  })
});
