import { Response, Params, Controller, Get, Query } from '@decorators/express';
import Product from '../models/product.js'
import { Response as ExpressResponse } from 'express';

@Controller('/products')
export default class {
  /**
   * List all users
   */
  @Get('/:nom')
  async read(
    @Response() res: any,
    @Params('nom') nom: string | undefined,
    @Query() query: Product | {}
  ): Promise<void> {
    const dataQuery = nom ? { nom } : query
    console.log(dataQuery)
    res.json({ data: [{
        nom: "toto",
        marque: "tata"
      }]
    })
  }
}
