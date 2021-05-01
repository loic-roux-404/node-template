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
import { CrudService } from "../services/CrudService";
import { jsonWithStatus } from "../modules/expressInternal";

@Controller("/users")
export default class UserController implements CRLUD {
  private readonly crudService: CrudService;

  constructor() {
    this.crudService = new CrudService().setModel(UserModel);
  }

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
    jsonWithStatus(res, await this.crudService.readUtil(query, { name }));
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
    jsonWithStatus(res, await this.crudService.createUtil(body));
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
    jsonWithStatus(res, await this.crudService.updateUtil({ name }, body));
  }

  /**
   * Flexible create, for a list of objects or a single one
   */
  @Post("/")
  async batchCreate(
    @Body() body: UserDocument[] | UserDocument,
    @Response() res: ExpressResponse
  ): Promise<void> {
    jsonWithStatus(res, await this.crudService.createMulUtil(body));
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
    jsonWithStatus(res, await this.crudService.deleteUtil({ ...query, name }));
  }
}
