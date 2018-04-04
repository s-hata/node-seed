import * as request from 'supertest';
process.env['NODE_PATH'] = __dirname;
require('module')._initPaths();
import api from './api';

describe('route index', function() {

  let target;

  beforeEach(() => {
    target = api.listen(3000);
  });

  afterEach(() => {
    target.close();
  });

  it('responds to /', (done) => {
    request(target)
    .get('/')
    .expect(200, done);
  });
});

