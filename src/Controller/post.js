export default {
    posts: {},
    list(req, res) {
        const con = req.app.locals.db

        con.query(`SELECT * FROM posts`, function (err, result, fields) {
            if (err) throw err;

            res.render('posts', {
                title: "Liste des posts",
                taxonomyLink: "/posts/show",
                items: result
            });
        });

    },
    show(req, res) {
        const con = req.app.locals.db

        con.query(`SELECT * FROM posts WHERE id=${req.params.id}`, function (err, result, fields) {
            if (err) throw err;

            res.render('singles/postShow', {
                title: "Post " + req.id,
                item: result[0]
            });
        })
    }
}