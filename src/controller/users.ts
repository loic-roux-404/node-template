import { Response, Params, Controller, Get, Post, Query } from '@decorators/express';
import UserModel from '../models/user.js'

type UserPayload = {
    firstname: string,
    lastname: string,
    email: string,
    password: string
}

@Controller('/users')
export default class {
  /**
   * List all users
   */
  @Get('/:firstname')
  async read(
    @Response() res: any,
    @Params('firstname') firstname: string | undefined,
    @Query() query: UserPayload | {}
  ): Promise<void> {
    const dataQuery = firstname ? { firstname } : query
    res.json({ data: await UserModel.find(dataQuery) })
  }
  /**
   * Show a single user
   */
  @Get('/')
  async list(@Response() res: any): Promise<void> {
    return this.read(res, undefined, {})
  }
  /**
   * Add User
   */
  @Post('/')
  async create({ body }: { body: UserPayload }, res: any): Promise<void> {
    res.json({
      data: await UserModel.create(new UserModel(body))
    })
  }
}
