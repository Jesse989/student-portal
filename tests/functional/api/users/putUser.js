import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../../../src/server.js';
const expect = chai.expect;
chai.use(chaiHttp);

describe('PUT /users', function() {
  it('fails with wrong creds', function(done) {
    chai
      .request(app)
      .put('/users/Student0')
      .type('application/x-www-form-urlencoded')
      .send({
        username: 'wrong',
        password: 'wrong',
        newUsername: 'Student00'
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        done();
      });
  });

  it('indicate success', function(done) {
    chai
      .request(app)
      .put('/users/Student0')
      .type('application/x-www-form-urlencoded')
      .send({
        username: 'Teacher0',
        password: 'passwordT0',
        newUsername: 'Student00'
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        done();
      });
  });

  it('changes can be verified with a GET', function(done) {
    chai
      .request(app)
      .get('/users/Student00')
      .type('application/x-www-form-urlencoded')
      .send({ username: 'Teacher0', password: 'passwordT0' })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.result.username).to.equal('Student00');
        expect(res.body.result.role).to.equal('student');
        done();
      });
  });

  it('fails when attempting to add duplicate username', function(done) {
    chai
      .request(app)
      .put('/users/Student00')
      .type('application/x-www-form-urlencoded')
      .send({
        username: 'Teacher0',
        password: 'passwordT0',
        newUsername: 'Teacher0'
      })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(505);
        expect(res.body.success).to.be.false;
        done();
      });
  });
});
