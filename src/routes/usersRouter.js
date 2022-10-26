import { UserController } from '../controllers/usersController.js'

export function UserRouter(req, res) {
  const [ , ...url] = req.url.split('/')
  const method = req.method
  
  let is_response_sended = false
  
  if (url[0] !== 'users') return;

  if (['GET'].includes(method)) {
    const { is_response_sended: is_sended } = UserController.getUsers(req, res)
    if (is_sended) is_response_sended = true
  }

  if (['POST'].includes(method)) {
    if (['register'].includes(url[1])) {
      const { is_response_sended: is_sended } = UserController.registration(req, res)
      if (is_sended) is_response_sended = true
    }
    if (['login'].includes(url[1])) {
      const { is_response_sended: is_sended } = UserController.login(req, res)
      if (is_sended) is_response_sended = true
    }
  }

  return is_response_sended;
}