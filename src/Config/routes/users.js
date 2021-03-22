import UserController from '../../controller/users.js'

export default [
  {
    name: 'users_list',
    verb: 'get',
    route: '/users',
    _controller: UserController.list
  }
]
