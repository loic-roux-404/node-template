import MainController from '../controller/main.js'

export default [
  {
    name: 'home',
    verb: 'get',
    route: '/',
    controller: MainController.home
  }
]
