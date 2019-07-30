import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../../../src/server.js';
const expect = chai.expect;
chai.use(chaiHttp);

describe('GETS /teachers', () => {
  it('should return a success json', done => {
    chai
      .request(app)
      .get('/teachers')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        done();
      });
  });

  it('should return an array of two teachers', done => {
    chai
      .request(app)
      .get('/teachers')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        expect(res.body.results.length).to.equal(2);
        done();
      });
  });
});
