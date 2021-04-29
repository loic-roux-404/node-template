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

@Controller("/users")
export default class {
  /**
   * List all users
   * Param override query
   */
  @Get("/:username")
  async read(
    @Query() query: UserDocument | {},
    @Params("username") username: string | undefined,
    @Response() res: any
  ): Promise<void> {
    console.log(res);
    jsonWithStatus(
      res,
      await readUtil({ model: UserModel, query }, { username })
    );
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
  @Patch("/:username")
  async update(
    @Body() body: UserDocument,
    @Response() res: ExpressResponse,
    @Params("username") username: string
  ): Promise<void> {
    jsonWithStatus(
      res,
      await updateUtil({
        model: UserModel,
        query: { username },
        body,
      })
    );
  }

  /**
   * Flexible create, for a list of objects or a single one
   */
  @Post("/")
  async createListOrSingle(
    @Body() body: UserDocument[] | UserDocument,
    @Response() res: ExpressResponse
  ): Promise<void> {
    jsonWithStatus(res, await createMulUtil({ model: UserModel, body }));
  }

  /**
   * Delete an entity
   */
  @Delete("/:username")
  async delete(
    @Body() body: UserDocument,
    @Response() res: ExpressResponse,
    @Params("username") username: string
  ): Promise<void> {
    jsonWithStatus(
      res,
      await deleteUtil({
        model: UserModel,
        query: { username },
        body,
      })
    );
  }
}
