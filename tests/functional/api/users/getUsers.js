import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../../../src/server.js';
const expect = chai.expect;
chai.use(chaiHttp);

describe('GET /users', function() {
  it('fails with wrong creds', function(done) {
    chai
      .request(app)
      .get('/users')
      .type('application/x-www-form-urlencoded')
      .send({ username: 'wrong', password: 'wrong' })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        done();
      });
  });

  it('should return a success json', function(done) {
    chai
      .request(app)
      .get('/users')
      .type('application/x-www-form-urlencoded')
      .send({ username: 'Teacher0', password: 'passwordT0' })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        done();
      });
  });

  it('returns array of users', function(done) {
    chai
      .request(app)
      .get('/users')
      .type('application/x-www-form-urlencoded')
      .send({ username: 'Teacher0', password: 'passwordT0' })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        expect(res.body.results.length).to.be.greaterThan(0);
        done();
      });
  });
});
