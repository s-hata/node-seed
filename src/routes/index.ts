import * as express from 'express';

module Route {
  export class Index {

    get (req: express.Request, res: express.Response, next: express.NextFunction) {
      res.json('{title:"index", message:"GET: Index"}');
    }

    post (req: express.Request, res: express.Response, next: express.NextFunction) {
      res.json('{title:"index", message:"POST: Index"}');
    }

    put (req: express.Request, res: express.Response, next: express.NextFunction) {
      res.json('{title:"index", message:"PUT: Index"}');
    }

    delete (req: express.Request, res: express.Response, next: express.NextFunction) {
    res.json('{title:"index", message:"DELETE: Index"}');
    }
  }
}
export = Route;
