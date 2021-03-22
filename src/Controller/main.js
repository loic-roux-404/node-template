export default {
  home (req, res) {
    res.json({
      title: 'Home',
      content: 'Bienvenue sur mon portfolio',
      age: 19
    })
  }
}
