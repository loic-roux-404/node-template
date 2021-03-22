import { Router } from 'express'
import Globals from './globals.js'
import { ControllerFactory } from '../Controller/index.js'

// create router and supply supported express function
const router = Router()
let Pages = []

router
  .get("/", ControllerFactory.get('main', 'home'));

Pages.push({ title: "Accueil", href: "/"})

router
  .route("/posts")
  .get(ControllerFactory.get('post','list'));

Pages.push({ title: "Posts", href: "/posts"})

router
  .route("/posts/show/:id")
  .get(ControllerFactory.get('post','show'));

router
  .route("/techs/api")
  .get(ControllerFactory.get('tech','api'));

router
  .route("/techs")
  .get(ControllerFactory.get('tech','list'));

Pages.push({ title: "Techs", href: "/techs"})

export default {
    Router: router,
    Container: {
        pages: Pages,
        ...Globals
    }
}
