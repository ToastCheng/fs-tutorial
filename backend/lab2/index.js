import express from 'express';
import _ from 'lodash';

const app = express();
const port = 3000;

app.use(express.json());

const data = {};

const getHandler = (req, res) => {
  const { id } = req.params;

  if (_.isUndefined(id)) {
    res.status(400).send('id should be set');
    return;
  }

  if (!(id in data)) {
    res.status(404).send(`${id} not found`);
    return;
  }

  res.send(data[id]);
}

const createHandler = (req, res) => {
  const { id, content } = req.body;
  if (_.isUndefined(id) || _.isUndefined(content)) {
    res.status(400).send('id and content should not be null');
    return;
  }

  if (id in data) {
    res.status(400).send('Already exists');
    return;
  }

  data[id] = content;
  res.send('ok');
}

app.get('/get/:id', getHandler);
app.post('/create', createHandler);

app.listen(port, () => {
 console.log(`App listening on port ${port}`)
});