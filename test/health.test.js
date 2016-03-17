const request = require('supertest');
const express = require('express');
const app = require('../lib/app');

describe('GET /', () => {

  before((done) => {
    this.up = express()
      .use((req, res) => { res.send('ok'); })
      .listen(12345, done);
  });

  describe('with watch URL localhost:12345 (up)', () => {
    before((done) => {
      this.server = app({ watchURL: 'http://localhost:12345' });
      setTimeout(done, 1000);
    });
    it('shows the server is up', (done) => {
      request(this.server)
        .get('/')
        .expect(200, 'http://localhost:12345 is UP.')
        .end(done);
    });
  });

  describe('with watch URL on localhost:12346 (not running)', () => {
    before((done) => {
      this.server = app({ watchURL: 'http://localhost:12346' });
      setTimeout(done, 1000);
    });
    it('shows that the server is down', (done) => {
      request(this.server)
        .get('/')
        .expect(200, 'http://localhost:12346 is DOWN.')
        .end(done);
    });
  });

  after((done) => {
    this.up.close(done);
  });
});
