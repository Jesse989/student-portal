import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../../../src/server.js';
const expect = chai.expect;
chai.use(chaiHttp);

describe('DELETE /students/:username', function() {
  it('should return success = true', function(done) {
    chai
      .request(app)
      .delete('/students/Student1')
      .type('application/x-www-form-urlencoded')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        done();
      });
  });

  it('student gone from GET /students array', function(done) {
    chai
      .request(app)
      .get('/students')
      .type('application/x-www-form-urlencoded')
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
      .delete('/students/Student1')
      .type('application/x-www-form-urlencoded')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(505);
        expect(res.body.success).to.be.false;
        done();
      });
  });
});
