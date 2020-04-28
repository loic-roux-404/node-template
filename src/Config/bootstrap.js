import { Router } from 'express'
//import Routes from './routes'
import Globals from './globals'
import { ControllerFactory } from '../Controller'

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

/**
 * Convert an url path to cool title
 * @example :  _urlToTitle('about-me') => About me
 * @param String path 
 */
function _urlToTitle(path) {
    let str = new String(path.match(/((\w|)*[A-z])/g) || 'page')
    str = str.replace(',', ' ')
    str = str.charAt(0).toUpperCase() + str.substring(1);

    return str;
}