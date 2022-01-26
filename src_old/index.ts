import { app } from './app';
import { AddressInfo } from 'net';
const server = app.listen(8081, 'localhost', () => {
  const { port, address } = server.address() as AddressInfo;
  console.log('Server listening on:', 'http://' + address + ':' + port);
});
