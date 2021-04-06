import { Router } from 'express'

/**
 * Register routes in an express router object
 *
 * @param {Array} routes
 * @returns {Proxy}
 */
export default (routes) => {
  routes = [].concat.apply([], routes)

  const routerBootstraped = Router()

  for (const { route, verb, controller } of routes) {
    routerBootstraped[verb](route, controller)
  }

  return routerBootstraped
}
