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
      let cookie;
        beforeEach(async()=> {
          const response = await app.post('/api/sessions')
          .send({username: 'larry', password: 'LARRY'});
          cookie = response.headers['set-cookie']
        });

        it('returns a 200 with the user', async() => {
          console.log(seed.moe.id)
          const response = await app.get('/api/sessions')
            .set('cookie', cookie)
          expect(response.status).to.equal(200);
          expect(response.body.username).to.equal('larry')
        });
      });

    describe('POST /api/sessions', ()=> {
        it('with correct credentials', () => {
          it('returns a 204 with a cookie', async() => {
            const response = await app.post('/api/sessions')
            .send({username: 'larry', password: 'LARRY'});
            expect(response.status).to.equal(204);
            console.log(response.headers)
            expect(response.headers['set-cookie']).to.be.ok;
          });
        });

        it('with incorrect credentials', () => {
          it('returns a 401', async() => {
            const response = await app.post('/api/sessions')
            .send({username: 'leerry', password: 'LARRY'});
            expect(response.status).to.equal(401);
          });
        });

        describe('DELETE /api/sessions', ()=> {
          let cookie;
            beforeEach(async()=> {
              const response = await app.post('/api/sessions')
              .send({username: 'larry', password: 'LARRY'});
              cookie = response.headers['set-cookie']
            });

            it('returns a 204', async() => {
              let response =  await app.delete('/api/sessions')
              .set('cookie', cookie)

              expect(response.status).to.equal(204)

              response = await app.get('/api/sessions')
                .set('cookie', cookie)
              expect(response.status).to.equal(401);
            });
          });

  });
});
});
