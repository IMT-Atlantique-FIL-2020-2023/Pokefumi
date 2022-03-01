import { config } from 'dotenv';
import { app } from './app/app.matchmaking';
import { AddressInfo } from 'net';
config();

const port = Number(process.env.PORT || 3334);
const server = app.listen(port, '0.0.0.0',() => {
  const { port, address } = server.address() as AddressInfo;
  console.log('Server listening on:', 'http://' + address + ':' + port);
});
