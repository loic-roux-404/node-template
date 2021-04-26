import { Response, Params, Controller, Get, Query } from '@decorators/express';
import Product from '../models/room.js'
import { Response as ExpressResponse } from 'express';

@Controller('/products')
export default class {
  /**
   * List all users
   */
  @Get('/:name')
  async read(
    @Response() res: ExpressResponse,
    @Params('name') nom: string | undefined,
    @Query() query: Product | {}
  ): Promise<void> {
    const dataQuery = nom ? { nom } : query
    console.log(dataQuery)
    res.json({ data: {} })
  }
}
