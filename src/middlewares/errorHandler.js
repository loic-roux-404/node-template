export default (err, req, res, next) => {
  res.status(res.status || 500)
  res.render('error', { error: err })
}
