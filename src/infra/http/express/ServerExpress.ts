import express from 'express';
import IServer from '../IServer';
import routes from './routes';

export default class ServerExpress implements IServer {
  private app = express();

  async startServer(): Promise<void> {
    this.app.use(express.json());
    this.app.use(routes)

    this.app.listen(process.env.PORT || 3333, () => {
      console.log('✔ Server running on http://localhost:3333');
    })
  }
}



