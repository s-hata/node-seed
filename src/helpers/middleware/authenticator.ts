import * as express from 'express';
import * as CognitoExpress from 'cognito-express';
import * as config from 'config';

const cognito = new CognitoExpress(config.cognito);

module.exports = function () {
  return function (req: express.Request, res: express.Response, next: express.NextFunction)  {
    let accessToken = req.get('Access-Token');
    if (!accessToken) {
      return res.status(401).send('Access Token missing from header');
    }
    cognito.validate(accessToken, function (err: NodeJS.ErrnoException, res: express.Response) {
          if (err) {
            return res.status(401).send(err);
          }
          next();
    });
  };
};
