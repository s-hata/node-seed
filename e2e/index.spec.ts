import * as frisby from 'frisby';

let client: any;

it ('should return a status of 200', function (done) {
  client = frisby.get('http://127.0.0.1:3000/');
  client
    .expect('status', 200)
    .expect('json', 'message', 'Hello World!')
    .done(done);
});
