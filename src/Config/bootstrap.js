
import Globals from './globals.js'
import UsersController from '../controller/UserController.js'
import MainController from '../controller/MainController.js'
import ProductController from '../controller/ProductController.js'

const controllers = [
  MainController,
  UsersController,
  ProductController
]

const Container = { ...Globals }

export { controllers, Container }
