import {
  Response,
  Params,
  Controller,
  Get,
  Query,
  Put,
  Patch,
  Post,
  Delete,
  Body,
} from "@decorators/express";
// import Room from "../models/Room";
import { Response as ExpressResponse, query } from "express";
import HotelModel, { HotelDocument } from "../models/Hotel";
import { CRLUD } from "../types/Framework";
import {
  readUtil,
  jsonWithStatus,
  deleteUtil,
  createMulUtil,
  updateUtil,
  createUtil,
} from "../modules/crudUtil";

@Controller("/hotels")
export default class HotelController implements CRLUD {
  @Get("/:name")
  async read(
    @Query() query: HotelDocument | {},
    @Params("name") name: string | undefined,
    @Response() res: ExpressResponse
  ): Promise<void> {
    jsonWithStatus(
      res,
      await readUtil(
        {
          model: HotelModel,
          query,
        },
        { name }
      )
    );
  }

  @Put("/")
  async create(
    @Body() body: HotelDocument,
    @Response() res: ExpressResponse
  ): Promise<void> {
    jsonWithStatus(res, await createUtil({ model: HotelModel, body }));
  }

  @Get("/")
  async list(
    @Query() query: {} | HotelDocument,
    @Response() res: ExpressResponse
  ): Promise<void> {
    await this.read(query ?? {}, undefined, res);
  }

  @Patch("/:_id")
  async update(
    @Body() body: HotelDocument,
    @Response() res: ExpressResponse,
    @Params("_id") _id: string
  ): Promise<void> {
    jsonWithStatus(
      res,
      await updateUtil({
        model: HotelModel,
        query: { _id },
        body,
      })
    );
  }

  @Post("/")
  async batchCreate(
    @Body() body: HotelDocument | HotelDocument[],
    @Response() res: ExpressResponse
  ): Promise<void> {
    jsonWithStatus(res, await createMulUtil({ model: HotelModel, body }));
  }

  @Delete("/")
  async delete(
    @Query() query: HotelDocument,
    @Response() res: ExpressResponse,
    @Params("_id") _id: string
  ): Promise<void> {
    jsonWithStatus(
      res,
      await deleteUtil({ model: HotelModel, query: { ...query, _id } })
    );
  }
}
