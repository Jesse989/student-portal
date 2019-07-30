import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../../../src/server.js';
const expect = chai.expect;
chai.use(chaiHttp);

describe('PUT /students', function() {
  it('indicate success', function(done) {
    chai
      .request(app)
      .put('/students/Student2')
      .type('application/x-www-form-urlencoded')
      .send({ username: 'EditedStudent' })
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
      .get('/students/EditedStudent')
      .type('application/x-www-form-urlencoded')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.result.username).to.equal('EditedStudent');
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
