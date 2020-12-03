const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const routes = {
  '/users': require('./routes/api/users'),
  '/admin': require('./routes/api/admin'),
}

Object.keys(routes).forEach((path) => {
  app.use(`/api${path}`,   routes[path]);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server starded on ${port}`));
