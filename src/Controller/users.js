export default {
  users: {},
  list (req, res) {
    const con = req.app.locals.db
    console.log(con)
    res.json({})
  },
  show (req, res) {
    const con = req.app.locals.db

    console.log(con)
    res.json({})
  }
}
