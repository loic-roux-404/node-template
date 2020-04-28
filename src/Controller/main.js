export default {
    home(req, res) {
        res.render('home', {
            title: "Home",
            content: "Bienvenur sur mon portfolio",
            age: 19
        });
    }
}