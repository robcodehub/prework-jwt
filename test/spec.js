const app = require('supertest')(require('../app'));
const db = require('../db')
const { expect } = require('chai');

describe('Authentication', () => {
  let seed;
  beforeEach(async()=> seed = await db.syncAndSeed());
  describe('GET /api/sessions', ()=> {
    describe('When not logged in', () => {
      it('returns a 401', async() => {
        const response = await app.get('/api/sessions');
        expect(response.status).to.equal(401);
      });
    });
    describe('When logged in', ()=> {
        it('returns a 200 with the user', async() => {
          console.log(seed.moe.id)
          const response = await app.get('/api/sessions');
          expect(response.status).to.equal(200);
        });
      });


  });
});
