import 'reflect-metadata';
import './infra/containers'

import { container, inject, injectable } from "tsyringe";
import IServer from "./infra/http/IServer";


@injectable()
class Server {
  constructor(
    @inject('Server')
    private server: IServer
  ) {}

  async start() {
    await this.server.startServer();
  }
}

const server = container.resolve(Server);

server.start();