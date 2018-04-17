const app = require('./app');
const server = require('http').createServer(app);
require('./socketIo')(server);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Game listening on port ${PORT}!`);
});
