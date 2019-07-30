import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../../../src/server.js';
const expect = chai.expect;
chai.use(chaiHttp);

describe('POST /students', function() {
  it('should return success = true', function(done) {
    chai
      .request(app)
      .post('/students')
      .type('application/x-www-form-urlencoded')
      .send({ username: 'NewStudent', password: 'password' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        done();
      });
  });

  it('new student available in GET /students array', function(done) {
    chai
      .request(app)
      .get('/students')
      .type('application/x-www-form-urlencoded')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.results[res.body.results.length - 1].username).to.equal(
          'NewStudent'
        );
        done();
      });
  });

  it('fails when attempting to add duplicate username', function(done) {
    chai
      .request(app)
      .post('/students')
      .type('application/x-www-form-urlencoded')
      .send({ username: 'NewStudent', password: 'password' })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(505);
        expect(res.body.success).to.be.false;
        done();
      });
  });
});
