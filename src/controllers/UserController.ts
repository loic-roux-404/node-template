import {
  Response,
  Params,
  Controller,
  Get,
  Post,
  Query,
  Put,
  Body,
  Delete,
  Patch,
} from "@decorators/express";
import UserModel, { UserDocument } from "../models/User";
import { Response as ExpressResponse } from "express";
import { CRLUD } from "../types/Framework";
import crudFactory, { CrudService } from "../services/Crud";
import { jsonWithStatus } from "../modules/expressInternal";
import { Injectable } from "@decorators/di";

@Controller("/users")
@Injectable()
export default class UserController implements CRLUD {
  private readonly crudService: CrudService = crudFactory(UserModel);

  /**
   * List all users
   * Param override query
   */
  @Get("/:name")
  async read(
    @Query() query: UserDocument | {},
    @Params("name") name: string | undefined,
    @Response() res: any
  ): Promise<void> {
    jsonWithStatus(res, await this.crudService.read(query, { name }));
  }

  /**
   * Show a single user or all
   */
  @Get("/")
  async list(
    @Query() query: UserDocument | {},
    @Response() res: ExpressResponse
  ): Promise<void> {
    await this.read(query ?? {}, undefined, res);
  }

  /**
   * Optimal Create
   */
  @Put("/")
  async create(
    @Body() body: UserDocument,
    @Response() res: ExpressResponse
  ): Promise<void> {
    console.log(res);
    jsonWithStatus(res, await this.crudService.create(body));
  }

  /**
   * Update when knowning entity
   */
  @Patch("/:name")
  async update(
    @Body() body: UserDocument,
    @Response() res: ExpressResponse,
    @Params("name") name: string
  ): Promise<void> {
    jsonWithStatus(res, await this.crudService.update({ name }, body));
  }

  /**
   * Flexible create, for a list of objects or a single one
   */
  @Post("/")
  async batchCreate(
    @Body() body: UserDocument[] | UserDocument,
    @Response() res: ExpressResponse
  ): Promise<void> {
    jsonWithStatus(res, await this.crudService.batchCreate(body));
  }

  /**
   * Delete an entity
   */
  @Delete("/:name")
  async delete(
    @Query() query: UserDocument,
    @Response() res: ExpressResponse,
    @Params("name") name: string
  ): Promise<void> {
    jsonWithStatus(res, await this.crudService.delete({ ...query, name }));
  }
}
