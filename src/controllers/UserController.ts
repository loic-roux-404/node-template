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
import {
  updateUtil,
  deleteUtil,
  readUtil,
  createMulUtil,
  jsonWithStatus,
  createUtil,
} from "../modules/crudUtil";
import { CRLUD } from "../types/Framework";

@Controller("/users")
export default class UserController implements CRLUD {
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
    jsonWithStatus(res, await readUtil({ model: UserModel, query }, { name }));
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
    jsonWithStatus(res, await createUtil({ model: UserModel, body }));
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
    jsonWithStatus(
      res,
      await updateUtil({
        model: UserModel,
        query: { name },
        body,
      })
    );
  }

  /**
   * Flexible create, for a list of objects or a single one
   */
  @Post("/")
  async batchCreate(
    @Body() body: UserDocument[] | UserDocument,
    @Response() res: ExpressResponse
  ): Promise<void> {
    jsonWithStatus(res, await createMulUtil({ model: UserModel, body }));
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
    jsonWithStatus(
      res,
      await deleteUtil({
        model: UserModel,
        query: { ...query, name },
      })
    );
  }
}
