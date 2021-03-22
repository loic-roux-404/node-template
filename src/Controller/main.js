export default {
    home(req, res) {
        res.json({
            title: "Home",
            content: "Bienvenur sur mon portfolio",
            age: 19
        });
    }
}