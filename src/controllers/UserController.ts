import { Response, Request, Params, Controller, Get, Post, Query, Patch, Put } from '@decorators/express';
import { default as UserModel, UserDocument } from '../models/user.js'
import { Response as ExpressResponse } from 'express';
import { ServerErrorMiddleware } from '../middlewares/ServerErrorMiddleware.js';

@Controller('/users', ServerErrorMiddleware)
export default class {
  /**
   * List all users
   */
  @Get('/:firstname')
  async read(
    @Response() res: any,
    @Params('firstname') firstname: string | undefined,
    @Query() query: UserDocument | {}
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
   * Create
   */
  @Put('/')
  async create(
    @Request() { body }: { body: UserDocument },
    @Response() res: ExpressResponse): Promise<void> {
    res.json({
      data: await UserModel.create(new UserModel(body))
    })
  }

  /**
   * Create list of objects
   */
  @Post('/')
  async createListOrSingle(
    { body }: { body: Array<UserDocument> | UserDocument },
    res: ExpressResponse
  ): Promise<void> {
    res.json({
      data: body instanceof Array
        ? body.map(async (model) => await UserModel.create(new UserModel(model)))
        : await UserModel.create(new UserModel(body))
    })
  }

  /**
   * Update using username
   */
  @Patch('/:firstname')
  async update(
    @Request() { body: query }: { body: UserDocument },
    @Response() res: any,
    @Params('firstname') firstname: string | undefined,
  ) {
    return res.json({
      data: UserModel.updateOne(
        { firstname },
        query
      )
    })
  }
}
