const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const expect = chai.expect;
chai.use(chaiHttp);

const server = require(__dirname + '/../server');
const Image = require(__dirname + '/../models/image');
process.env.MONGOLAB_URI = 'mongodb://localhost/app_dev';

describe('the image gallery api', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should be able to retrieve all images from the database', (done) => {
    chai.request('localhost:3000')
      .get('/api/images')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });
  it('should create a new image with a POST', (done) => {
    chai.request('localhost:3000')
      .post('/api/images')
      .send({imageTitle: 'test image'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.imageTitle).to.eql('test image');
        expect(res.body).to.have.property('_id');
        done();
      });
  });
});
