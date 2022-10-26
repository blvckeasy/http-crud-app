import Http from 'http';
import { UserRouter } from './routes/usersRouter.js';
import { server_options, cors_options } from '../config.js';

const PORT = server_options.port;
const HOST = server_options.host;

const server = Http.createServer(async function (req, res) {

  // set Cors headers
  res.setHeader('Access-Control-Allow-Origin', cors_options.allow_origin);
	res.setHeader('Access-Control-Request-Method', cors_options.request_method);
	res.setHeader('Access-Control-Allow-Methods', cors_options.allow_methods);
	res.setHeader('Access-Control-Allow-Headers', cors_options.allow_headers);

  // post middleware
  if (req.method == 'POST') {
    req.body = await new Promise((resolve) => {
      let bodyData = "";
      req.on("data", buffer => bodyData += buffer);
      req.on('end', () => resolve(JSON.parse(bodyData || {})));
    });
  }

  // Routes
  const res_sended = UserRouter(req, res);

  if (!res_sended) {
    res.write(JSON.stringify({
      status: 404,
      ok: false,
      message: "Not Found!"
    }, null, 4));
  }
  return res.end();
})

server.listen(PORT, function(error) {
  if (error) {
    console.error(error);
    return 0;
  }

  console.log(`🚀 server is listening on http://${HOST}:${PORT}/`);
})