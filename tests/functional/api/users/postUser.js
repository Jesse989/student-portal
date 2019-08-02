import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../../../src/server.js';
const expect = chai.expect;
chai.use(chaiHttp);

describe('POST /users', function() {
  it('should fail with wrong creds', function(done) {
    chai
      .request(app)
      .post('/users')
      .type('application/x-www-form-urlencoded')
      .send({
        username: 'wrong',
        password: 'wrong',
        newUsersName: 'NewUser',
        newUsersPassword: 'password',
        newUsersRole: 'student'
      })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        done();
      });
  });
  it('should add student', function(done) {
    chai
      .request(app)
      .post('/users')
      .type('application/x-www-form-urlencoded')
      .send({
        username: 'Teacher0',
        password: 'passwordT0',
        newUsersName: 'Student9',
        newUsersPassword: 'passwordS9',
        newUsersRole: 'student'
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        done();
      });
  });

  it('new user available in GET /users array', function(done) {
    chai
      .request(app)
      .get('/users')
      .type('application/x-www-form-urlencoded')
      .send({ username: 'Teacher0', password: 'passwordT0' })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.results[res.body.results.length - 1].username).to.equal(
          'Student9'
        );
        done();
      });
  });

  it('fails when attempting to add duplicate username', function(done) {
    chai
      .request(app)
      .post('/users')
      .type('application/x-www-form-urlencoded')
      .send({
        username: 'Teacher0',
        password: 'passwordT0',
        newUsersName: 'Student9',
        newUsersPassword: 'passwordS9',
        newUsersRole: 'student'
      })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(505);
        expect(res.body.success).to.be.false;
        done();
      });
  });
});
