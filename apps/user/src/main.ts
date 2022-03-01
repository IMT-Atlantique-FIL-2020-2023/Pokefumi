import { app } from './app/app.user';
import { AddressInfo } from 'net';

const port = Number(process.env.PORT || 3333);
const server = app.listen(port, '0.0.0.0', () => {
  const { port, address } = server.address() as AddressInfo;
  console.log('Server listening on:', 'http://' + address + ':' + port);
});
