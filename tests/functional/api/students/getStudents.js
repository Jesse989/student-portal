import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../../../src/server.js';
const expect = chai.expect;
chai.use(chaiHttp);

describe('GET /students', function() {
  it('should return a success json', function(done) {
    chai
      .request(app)
      .get('/students')
      .type('application/x-www-form-urlencoded')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        done();
      });
  });

  it('array[0] should be "Student1"', function(done) {
    chai
      .request(app)
      .get('/students')
      .type('application/x-www-form-urlencoded')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        expect(res.body.results[0].username).to.equal('Student0');
        done();
      });
  });
});
