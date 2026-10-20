const test = require('node:test');
const assert = require('node:assert');
const server = require('./server');

test('Health check route returns UP status', (t, done) => {
  server.listen(0, () => {
    const port = server.address().port;
    const http = require('http');
    http.get(`http://localhost:${port}/health`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const body = JSON.parse(data);
        assert.strictEqual(res.statusCode, 200);
        assert.strictEqual(body.status, 'UP');
        server.close(done);
      });
    });
  });
});
