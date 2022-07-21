import * as fs from 'fs';

const port = 3000;
while (true) {
  let buffer;
  try {
    buffer = fs.readFileSync(`naive_server/port/${port}`, 'utf8');
  } catch (e) {
    continue;
  }

  if (buffer === '') continue;

  const lines = buffer.split('\n');

  // Read Method.
  const firstLine = lines[0];
  const [method, url, protocol] = Object.values(firstLine.split(' '));
  console.log(`Method: ${method}`);
  console.log(`URL: ${url}`);
  console.log(`Protocol: ${protocol}`);
  console.log('');

  // Read Headers.
  let i = 1;
  console.log('Reading headers:');
  for (; i < lines.length; i++) {
    if (lines[i] === '\n') break;

    const [key, value] = lines[i].split(' ');
    console.log(`${key} ${value}`);
  }
  console.log('');

  // Read body.
  let body = '';
  console.log('Read body');
  for (; i < lines.length; i++)
    body += lines[i];
  console.log(body);

  // Clear request.
  fs.writeFileSync(`naive_server/port/${port}`, '');

  fs.writeFileSync('naive_server/response', `
HTTP/1.1 200 ok
Server: Express
Keep-Alive: timeout=2, max=200
Content-Type: application/json

{"result":"ok"}
  `);
}