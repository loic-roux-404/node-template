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
} from "@decorators/express";
import UserModel, { UserDocument } from "../models/User";
import { Response as ExpressResponse } from "express";
import { updateUtil, deleteUtil } from "../modules/crudUtil";

@Controller("/users")
export default class {
  /**
   * List all users
   */
  @Get("/:username")
  async read(
    @Response() res: any,
    @Query() query: UserDocument | {} = {},
    @Params("username") username?: string
  ): Promise<void> {
    const _query = username != null ? { username } : query;
    res.json({ data: await UserModel.find(_query) });
  }

  /**
   * Show a single user
   */
  @Get("/")
  async list(@Response() res: ExpressResponse): Promise<void> {
    return await this.read(res);
  }

  /**
   * Create
   */
  @Put("/")
  async create(
    @Body() body: UserDocument,
    @Response() res: ExpressResponse
  ): Promise<void> {
    res.json({
      data: await UserModel.create(new UserModel(body)),
    });
  }

  /**
   * Create list of objects
   */
  @Post("/")
  async createListOrSingle(
    @Body() body: UserDocument[] | UserDocument,
    @Response() res: ExpressResponse
  ): Promise<void> {
    res.json({
      data: await UserModel.insertMany(
        body instanceof Array
          ? body.map((e) => new UserModel(e))
          : [new UserModel(body)]
      ),
    });
  }

  /**
   * Update using username
   */
  @Put("/:username")
  async update(
    @Body() body: UserDocument,
    @Response() res: ExpressResponse,
    @Params("username") username: string
  ): Promise<void> {
    const { data, status } = await updateUtil({
      model: UserModel,
      query: { username },
      body,
    });
    res.status(status).json({
      data,
    });
  }

  @Delete("/:username")
  async delete(
    @Body() body: UserDocument,
    @Response() res: ExpressResponse,
    @Params("username") username: string
  ): Promise<void> {
    const { data, status } = await deleteUtil({
      model: UserModel,
      query: { username },
      body,
    });
    res.status(status).json({
      data,
    });
  }
}
