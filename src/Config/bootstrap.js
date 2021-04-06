
import Globals from './globals.js'
import UserRoutes from '../routes/users.js'
import MainRoutes from '../routes/main.js'
import registerRoutes from '../modules/routerRegistery.js'

// create router and supply supported express function
const routerBootstraped = registerRoutes([
  UserRoutes,
  MainRoutes
])

const Services = {}

const Container = { ...Globals, Services }

export { routerBootstraped, Container }
