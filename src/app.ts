import express from 'express';
import * as bodyParser from 'body-parser';
import * as bdd from './bdd'

const app = express();
app.use(
  bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
      req.rawBody = buf;
    },
  }),
);
app.get('/', (req, res) => res.send('Hello World!'));
export { app };

app.get('/users', (request, response) => {
  bdd.getUsers().then( users =>
    response.status(200).json(users)
  ).catch( error =>
    response.status(500).send(error)
  )
})

app.post('/users', (request, response) => {
  db.addUser(request.body.name).then( () => {
    response.status(200).send()
  }).catch( error =>
    response.status(500).send(error)
  );
})
