import express from 'express';
import _ from 'lodash';

const app = express();
const port = 3000;

// Lab 1
app.use(express.json());

const getHandler = (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  const ans = Number(a) + Number(b);
  res.send(`${ans}`);
}

const getHandlerV2 = (req, res) => {
  const { a, b } = req.query;

  const ans = Number(a) + Number(b);
  res.send(`${ans}`);
}

const getHandlerV3 = (req, res) => {
  const { a, b } = req.query;
  console.log(`a: ${a}, b: ${b}`);
  
  // Need to run `yarn add lodash`.
  if (_.isUndefined(a) || _.isUndefined(b)) {
    res.status(400).send('a and b should both be set');
    return;
  }

  const ans = Number(a) + Number(b);
  if (_.isNaN(ans)) {
    res.status(400).send('a and b should both be Number');
    return;
  }
  res.send(`${ans}`);
}

// Lab 1
const getHandlerV4 = (req, res) => {
  const { a, b } = req.body;

  console.log(`a: ${a}, b: ${b}`);
  
  // Need to run `yarn add lodash`.
  if (_.isUndefined(a) || _.isUndefined(b)) {
    res.status(400).send('a and b should both be set');
    return;
  }

  const ans = a + b;
  if (!_.isNumber(ans) || _.isNaN(ans)) {
    res.status(400).send('a and b should both be Number');
    return;
  }
  res.send(`${ans}`);
}

// Lab 0
app.get('/get', getHandler);
app.get('/v2/get', getHandlerV2);
app.get('/v3/get', getHandlerV3);

// Lab 1
app.post('/get', getHandlerV4);

app.listen(port, () => {
 console.log(`App listening on port ${port}`)
});