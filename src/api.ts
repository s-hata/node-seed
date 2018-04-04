import * as path from 'path';
import * as cors from 'cors';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import * as config from 'config';
import * as authenticator from 'helpers/middleware/authenticator';
import * as indexRouter from 'routes/index';


const corsOptions = {
  origin: '*',
  allowedHeaders: ['X-Requested-With', 'Content-Type', 'access-token'],
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS']
};

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
    this.express.options('*', cors(corsOptions));
    this.express.use(cors(corsOptions));
    this.express.use(authenticator());
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
