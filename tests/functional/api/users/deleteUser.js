import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../../../src/server.js';
const expect = chai.expect;
chai.use(chaiHttp);

describe('DELETE /users/:username', function() {
  it('fails with wrong creds', function(done) {
    chai
      .request(app)
      .delete('/users/Student1')
      .type('application/x-www-form-urlencoded')
      .send({ username: 'wrong', password: 'wrong' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        done();
      });
  });
  it('is succesful with creds', function(done) {
    chai
      .request(app)
      .delete('/users/Student1')
      .type('application/x-www-form-urlencoded')
      .send({ username: 'Teacher0', password: 'passwordT0' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        done();
      });
  });

  it('student gone from GET /users array', function(done) {
    chai
      .request(app)
      .get('/users')
      .type('application/x-www-form-urlencoded')
      .send({ username: 'Teacher0', password: 'passwordT0' })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.results['Student1']).to.be.undefined;
        done();
      });
  });

  it('fails when no user with that username', function(done) {
    chai
      .request(app)
      .delete('/users/Student1')
      .type('application/x-www-form-urlencoded')
      .send({ username: 'Teacher0', password: 'passwordT0' })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(505);
        expect(res.body.success).to.be.false;
        done();
      });
  });
});
