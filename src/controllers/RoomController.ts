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
import RoomModel, { RoomDocument } from "../models/Room";
import { CRLUD } from "../types/Framework";
import crudFactory, { CrudService } from "../services/Crud";
import { Injectable } from "@decorators/di";
import { jsonWithStatus } from "../modules/expressInternal/index";

@Controller("/rooms")
@Injectable()
export default class RoomController implements CRLUD {
  private readonly crudService: CrudService = crudFactory(RoomModel);

  @Get("/:name")
  async read(
    @Query() query: RoomDocument | {},
    @Params("name") name: string | undefined,
    @Response() res: ExpressResponse
  ): Promise<void> {
    jsonWithStatus(res, await this.crudService.readUtil(query, { name }));
  }

  @Put("/")
  async create(
    @Body() body: RoomDocument,
    @Response() res: ExpressResponse
  ): Promise<void> {
    jsonWithStatus(res, await this.crudService.createUtil(body));
  }

  @Get("/")
  async list(
    @Query() query: {} | RoomDocument,
    @Response() res: ExpressResponse
  ): Promise<void> {
    await this.read(query ?? {}, undefined, res);
  }

  @Patch("/:_id")
  async update(
    @Body() body: RoomDocument,
    @Response() res: ExpressResponse,
    @Params("_id") _id: string
  ): Promise<void> {
    jsonWithStatus(res, await this.crudService.updateUtil({ _id }, body));
  }

  @Post("/")
  async batchCreate(
    @Body() body: RoomDocument | RoomDocument[],
    @Response() res: ExpressResponse
  ): Promise<void> {
    jsonWithStatus(res, await this.crudService.createMulUtil(body));
  }

  @Delete("/")
  async delete(
    @Query() query: RoomDocument,
    @Response() res: ExpressResponse,
    @Params("_id") _id: string
  ): Promise<void> {
    jsonWithStatus(res, await this.crudService.deleteUtil({ ...query, _id }));
  }
}
