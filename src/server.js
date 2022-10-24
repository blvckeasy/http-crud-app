import Http from 'http'

const port = 3000;
const users = [
  // default users
  { username: "blvckeasy", password: "123456" },
  { username: "hakim", password: "b1Ui" },
  { username: "helloworld", password: "randomo1" },
]

const server = Http.createServer(async function (req, res) {
  const url = req.url.split("/");

  // post middleware
  if (req.method == 'POST') {
    req.body = await new Promise((resolve, reject) => {
      let bodyData = ''
      req.on('data', buffer => bodyData += buffer)
      req.on('end', () => resolve(JSON.parse(bodyData || {})))
    })
  }

  // controller
  if (req.method == 'GET') {    
    res.write(JSON.stringify(users, null, 4));
    return res.end()
  } else if (req.method == 'POST') {
    const { username, password } = req.body
    const found_user = users.find((user) => {
      if (user.username == username && user.password == password) {
        return user
      }
    })

    if (['login', 'register'].includes(url[2])) {
      if (!(username && password)) {
        res.write(JSON.stringify({
          status: 200,
          ok: false,
          message: "username and password is required!"
        }, null, 4))
        return res.end()
      }
    }

    if (url[2] == 'login') {
      if (!found_user) {
        res.write(JSON.stringify({
          status: 400,
          ok: false,
          message: "user not found.",
          data: {}
        }, null, 4))
      } else {
        res.write(JSON.stringify({
          status: 200,
          ok: true,
          message: "user found",
          data: found_user
        }, null, 4))
      }
      return res.end();

    } else if (url[2] == 'register') {
      if (found_user) {
        res.write(JSON.stringify({
          status: 400,
          ok: false,
          message: "user already signed!",
          data: {}
        }, null, 4));
      } else {
        const new_user = { username, password };
        users.push(new_user);
        res.write(JSON.stringify({
          status: 200,
          ok: true,
          data: new_user
        }, null, 4))
      }
      return res.end()
    }
  }

  res.write(JSON.stringify({
    status: 404,
    ok: false,
    message: "Not Found!"
  }, null, 4))

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