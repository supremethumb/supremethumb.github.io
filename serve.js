const http = require('http');
const handler = require('serve-handler');
const server = http.createServer((request, response) => {
  return handler(request, response, { public: 'public' });
});
server.listen(8080, () => {
  console.log('Running at http://localhost:8080');
});
