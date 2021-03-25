import UserModel from '../models/user.js'

export default {
  users: {},
  async list (req, res) {
    const users = await UserModel.find({})
    console.log(users)
    res.json({ users })
  },
  show (req, res) {
    res.json({})
  } //,
  //add(req, res) {}
}
