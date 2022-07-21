import express from 'express';
import _ from 'lodash';

const app = express();
const port = 3000;


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

app.get('/get', getHandler);
app.get('/v2/get', getHandlerV2);
app.get('/v3/get', getHandlerV3);

app.listen(port, () => {
 console.log(`App listening on port ${port}`)
});