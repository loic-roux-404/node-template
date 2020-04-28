/**
 * Settings to create globals and dynamic routes
 */
export default {
    global: {
        "appName": "Portfolio"
    },
    pages: [
        {
            alias: "main",
            controller: "main",
            ressource: "/",
            subRoutes:
                [
                    {
                        ressource: "/",
                        func: "home",
                        action: "get"
                    },
                ]
        }//,
        // {
        //     alias: "post",
        //     controller: "post",
        //     ressource: "/posts",
        //     subRoutes: [
        //         {
        //             ressource: '/',
        //             func: "list"
        //         },
        //     ]
        // },
        // {
        //     alias: "tech",
        //     controller: "tech",
        //     ressource: "techs",
        //     subRoutes: [
        //         {
        //             ressource: "techs/",
        //             func: 'list'
        //         },
        //         {
        //             ressource: "techs/:tech",
        //             func: 'show'
        //         },
        //     ]
        // }
    ]
}
