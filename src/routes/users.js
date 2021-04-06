import UserController from '../controller/users.js'

export default [
  {
    name: 'users_list',
    verb: 'get',
    route: '/users',
    controller: UserController.list
  },
  {
    name: 'users_add',
    verb: 'post',
    route: '/users',
    controller: UserController.add
  }
]
