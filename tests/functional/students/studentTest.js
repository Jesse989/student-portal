import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../../../src/server.js';
const expect = chai.expect;
chai.use(chaiHttp);

describe('GETS /students', function() {
  it('should return a success json', function(done) {
    chai
      .request(app)
      .get('/students')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        done();
      });
  });

  it('should return an array of three students', function(done) {
    chai
      .request(app)
      .get('/students')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        expect(res.body.results.length).to.equal(3);
        expect(res.body.results[0].username).to.equal('Student0');
        done();
      });
  });
});
