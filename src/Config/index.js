import DbAuth from './database.js'
import UsersController from '../controllers/UserController.js'
import MainController from '../controllers/MainController.js'
import ProductController from '../controllers/ProductController.js'
import Globals from './globals.js'

const controllers = [
  MainController,
  UsersController,
  ProductController
]

const Container = { ...Globals }

export { DbAuth, Container, controllers }
