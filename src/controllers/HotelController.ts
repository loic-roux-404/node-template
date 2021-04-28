import { Response, Params, Controller, Get, Query } from "@decorators/express";
import Product from "../models/room.js";
import { Response as ExpressResponse } from "express";
import HotelModel from "../models/Hotel";

@Controller("/hotels")
export default class {
  /**
   * List all users
   */
  @Get("/:name")
  async read(
    @Response() res: ExpressResponse,
    @Query() query: Product | {} = {},
    @Params("name") nom?: string
  ): Promise<void> {
    const dataQuery = nom != null ? { nom } : query;
    res.json({ data: HotelModel.find(dataQuery) });
  }
}
