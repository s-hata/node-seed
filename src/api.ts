import * as path from 'path';
import * as cors from 'cors';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import * as indexRouter from 'routes/index';

class Api {

  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
      next();
    });
    this.express.use(cors());
    this.express.use(logger('dev'));
  }

  private routes(): void {
    let router = express.Router();
    let index: indexRouter.Index = new indexRouter.Index();
    router.get('/', index.get.bind(index.get));
    router.post('/', index.post.bind(index.post));
    router.delete('/', index.delete.bind(index.delete));
    this.express.use('/', router);
  }
}

export default new Api().express;
