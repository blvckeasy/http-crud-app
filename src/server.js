import Http from 'http'
import { UserRouter } from './routes/usersRouter.js';

const port = 3000;


const server = Http.createServer(async function (req, res) {
  // post middleware
  if (req.method == 'POST') {
    req.body = await new Promise((resolve, reject) => {
      let bodyData = ''
      req.on('data', buffer => bodyData += buffer)
      req.on('end', () => resolve(JSON.parse(bodyData || {})))
    })
  }

  // Routes
  const res_sended = UserRouter(req, res)

  if (!res_sended) {
    res.write(JSON.stringify({
      status: 404,
      ok: false,
      message: "Not Found!"
    }, null, 4))
  }
  return res.end()
})

server.listen(port, function(error) {
  if (error) {
    console.log({
      status: 505,
      message: "internal server error"
    })
    return 0;
  }

  console.log('server is listening on *' + port);
})