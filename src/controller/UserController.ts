import { Response, Params, Controller, Get, Post, Query, Patch, Put } from '@decorators/express';
import { default as UserModel, User } from '../models/user.js'
import { Response as ExpressResponse } from 'express';

@Controller('/users')
export default class {
  /**
   * List all users
   */
  @Get('/:firstname')
  async read(
    @Response() res: any,
    @Params('firstname') firstname: string | undefined,
    @Query() query: User | {}
  ): Promise<void> {
    const dataQuery = firstname ? { firstname } : query
    res.json({ data: await UserModel.find(dataQuery) })
  }
  /**
   * Show a single user
   */
  @Get('/')
  async list(@Response() res: ExpressResponse): Promise<void> {
    return this.read(res, undefined, {})
  }
  /**
   * Add User
   */
  @Put('/')
  async create({ body }: { body: User }, res: ExpressResponse): Promise<void> {
    res.json({
      data: await UserModel.create(new UserModel(body))
    })
  }

  @Post('/')
  async createListOrSingle(
    { body }: { body: Array<User> | User }, res: ExpressResponse
  ): Promise<void> {
    res.json({
      data: body instanceof Array
        ? body.map(async (model) => await UserModel.create(new UserModel(model)))
        : await UserModel.create(new UserModel(body))
    })
  }

  @Patch('/:firstname')
  async update() {}
}
