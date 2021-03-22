import { Router } from 'express'
import Globals from './globals.js'
import UserRoutes from './routes/users.js'
import MainRoutes from './routes/main.js'

// create router and supply supported express function
const routes = [
  ...UserRoutes,
  ...MainRoutes
]

const routerBootstraped = Router()

for (const { route, verb, _controller } of routes) {
  routerBootstraped[verb](route, _controller)
}

const Container = { ...Globals }

export { routerBootstraped, Container }
