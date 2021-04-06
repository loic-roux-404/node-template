
import Globals from './globals.js'
import UsersController from '../controller/users.js'
import MainController from '../controller/main.js'

const controllers = [
  MainController,
  UsersController
]

const Container = { ...Globals }

export { controllers, Container }
