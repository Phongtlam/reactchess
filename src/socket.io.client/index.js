import SocketIoClient from 'socket.io-client';
const server = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '/';
const SocketIo = SocketIoClient(server);
export default SocketIo;