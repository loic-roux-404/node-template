import { Router } from 'express'
import settings from './settings'
import { ControllerFactory } from '../Controller'

const router = Router()

const authorizedActions = ['get', 'post']

settings.pages.every(({
    alias,
    controller,
    ressource,
    subRoutes
}) => {
    // if (!controller || !ressource || !alias || !subRoutes) {
    //     console.error('incorrect config in : ' + alias || '')
    //     process.exit()
    // }

    subRoutes.forEach(({ ressource, func, action = 'get' }) => {
        console.log(ressource, func, action)
        if (!authorizedActions.includes(action)) {
            console.error('incorrect action type : ' + action)
            process.exit()
        }

        router.route(ressource)
        router[action](ControllerFactory.get(controller, func))
    })

    router.use(ressource, router)
});

export default router