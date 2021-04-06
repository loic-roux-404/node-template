import UserModel from '../models/user.js'

export default {
  /**
   * List all users
   */
  list: async (_, res) => res.json({ data: await UserModel.find({}) }),
  /**
   * @typedef {{
    *   firstname: String,
    *   lastname: String,
    *   email: String
    * }} RequestShowUser
    * @param {{ body: RequestShowUser }} req
    */
  show: async ({ query }, res) => res.json({ data: await UserModel.find(query) }),
  /**
   * @typedef {{
   *   firstname: String,
   *   lastname: String,
   *   email: String,
   *   password: String
   * }} RequestAddUser
   * @param {{ body: RequestAddUser }} req
   */
  add: async ({ body }, res) => res.json({
    data: await UserModel.create(new UserModel(body))
  })
}
