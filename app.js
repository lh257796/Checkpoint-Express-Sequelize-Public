const express = require('express');
const app = express();
const routers = require ('./routes/index');


module.exports = app; // this line is only used to make testing easier.

// remember to plug in your router and any other middleware you may need here (i.e. body parser, mounting any router-level middleware, etc.)
app.use(express.json());
app.use('/', routers);


app.use((err, req, res, next) => {
  try {
    res.sendStatus(err.status);
  } catch(e) {
    next(e)
  }
});

if (!module.parent) app.listen(3000); // conditional prevents a very esoteric EADDRINUSE issue with mocha watch + supertest + npm test.
