const users = [
  // default users
  { username: "blvckeasy", password: "123456" },
  { username: "hakim", password: "b1Ui" },
  { username: "helloworld", password: "randomo1" },
];

export class UserController {
  // custom functions
  /**
   * @param {*} req - request
   * @param {*} res - response
   * @whyUse this function is used to combine repeated codes for login and registration  
  */
  static #userValidator(req) {
    const { username, password } = req.body;
    
    if (!(username && password)) {
      return { 
        status: 400,
        ok: false,
        message: "username and password is require!"
      };
    }
    
    const found_user = users.find((user) => {
      if (username == user.username && password == user.password) {
        return user;
      }
    });

    return {
      status: 200,
      ok: true,
      data: found_user
    };
  }

  // GET
  static getUsers (_, res) {
    res.write(JSON.stringify(users, null, 4));
    return { is_response_sended: true };
  }

  // POST
  static login (req, res) {
    const validate = this.#userValidator(req);
    const { data: user } = validate;

    if (!validate.ok) {
      res.write(JSON.stringify(validate));
    }

    if (user) {
      res.write(JSON.stringify({
        status: 200,
        ok: true,
        message: "user found",
        data: user
      }, null, 4));
    } else {
      res.write(JSON.stringify({
        status: 400,
        ok: false,
        message: "user not found.",
        data: {}
      }, null, 4));
    }
    return { is_response_sended: true };
  }

  static registration (req, res) {
    const validate = this.#userValidator(req);
    const { data: user } = validate;
    const { username, password } = req.body;

    if (!validate.ok) {
      res.write(JSON.stringify(validate));
    }

    if (!user) {
      const new_user = { username, password };
      users.push(new_user);
      res.write(JSON.stringify({
        status: 200,
        ok: true,
        data: new_user
      }, null, 4));
    } else {
      res.write(JSON.stringify({
        status: 400,
        ok: false,
        message: "user already signed!",
        data: {}
      }, null, 4));
    }
    return { is_response_sended: true };
  }
}