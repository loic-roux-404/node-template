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
import { Response as ExpressResponse } from "express";
import { CRLUD } from "../modules/mongodb/types";
import { CrudService } from "../modules/mongodb";
import { Injectable } from "@decorators/di";
import { jsonWithStatus } from "../modules/expressInternal";
import { FilterQuery } from "mongoose";
import { TokenProtectedMiddleware } from "../modules/oauth/middlewares/PassportMiddleware";
import BookingModel, { BookingDocument } from "../models/Booking";

@Injectable()
@Controller("/booking", [TokenProtectedMiddleware])
export default class BookingController implements CRLUD {
  private readonly crudService: CrudService = new CrudService(BookingModel);

  @Get("/:_id")
  async read(
    @Query() query: FilterQuery<BookingDocument>,
    @Response() res: ExpressResponse,
    @Params("_id") _id: string | undefined
  ): Promise<void> {
    jsonWithStatus(res, await this.crudService.read(query, { _id }));
  }

  @Put("/")
  async create(
    @Body() body: BookingDocument | BookingDocument[],
    @Response() res: ExpressResponse
  ): Promise<void> {
    jsonWithStatus(res, await this.crudService.create(body));
  }

  @Get("/")
  async list(
    @Query() query: FilterQuery<BookingDocument>,
    @Response() res: ExpressResponse
  ): Promise<void> {
    await this.read(query ?? {}, res, undefined);
  }

  @Patch("/:_id")
  async update(
    @Body() body: BookingDocument,
    @Response() res: ExpressResponse,
    @Params("_id") _id: string
  ): Promise<void> {
    jsonWithStatus(res, await this.crudService.update({ _id }, body));
  }

  @Post("/")
  async batchCreate(
    @Body() body: BookingDocument | BookingDocument[],
    @Response() res: ExpressResponse
  ): Promise<void> {
    jsonWithStatus(res, await this.crudService.create(body));
  }

  @Delete("/:_id")
  async delete(
    @Query() query: FilterQuery<BookingDocument>,
    @Response() res: ExpressResponse,
    @Params("_id") _id: string
  ): Promise<void> {
    jsonWithStatus(res, await this.crudService.delete({ ...query, _id }));
  }
}
