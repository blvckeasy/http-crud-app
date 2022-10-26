const users = [
  // default users
  { username: "blvckeasy", password: "123456" },
  { username: "hakim", password: "b1Ui" },
  { username: "helloworld", password: "randomo1" },
]

export class UserController {
  // GET
  static getUsers (req, res) {
    res.write(JSON.stringify(users, null, 4));
    return { is_response_sended: true }
  }

  // POST
  static login (req, res) {
    const { username, password } = req.body

    if (!(username && password)) {
      res.write(JSON.stringify({
        status: 200,
        ok: false,
        message: "username and password is required!"
      }, null, 4))
      return { is_response_sended: true }
    }
    
    const found_user = users.find((user) => {
      if (user.username == username && user.password == password) {
        return user
      }
    })

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
    return { is_response_sended: true }
  }

  static registration (req, res) {
    const { username, password } = req.body
  
    if (!(username && password)) {
      res.write(JSON.stringify({
        status: 200,
        ok: false,
        message: "username and password is required!"
      }, null, 4))
      return { is_response_sended: true }
    }

    const found_user = users.find((user) => {
      if (user.username == username && user.password == password) {
        return user
      }
    })

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
    return { is_response_sended: true }
  }
}