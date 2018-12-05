/* const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

// Point static path to dist
app.use(express.static(path.join(__dirname, './dist')));

// Catch all other routes and return the index file to let Angular 4 handle the route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

const port = 8080;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Tiendadev backend listening on port: ${port}`));
 */
