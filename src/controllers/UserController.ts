import {
  Response,
  Request,
  Params,
  Controller,
  Get,
  Post,
  Query,
  Patch,
  Put,
  Body,
} from "@decorators/express";
import UserModel, { UserDocument } from "../models/user.js";
import { Response as ExpressResponse } from "express";

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
    @Request() { body }: { body: UserDocument },
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
    { body }: { body: UserDocument[] | UserDocument },
    res: ExpressResponse
  ): Promise<void> {
    res.json({
      data:
        body instanceof Array
          ? body.map(
              async (model) => await UserModel.create(new UserModel(model))
            )
          : await UserModel.create(new UserModel(body)),
    });
  }

  /**
   * Update using username
   */
  @Patch("/:username")
  async update(
    @Body() body: UserDocument,
    @Response() res: any,
    @Params("username") username?: string
  ): Promise<void> {
    return res.json({
      data: UserModel.updateOne({ username }, body),
    });
  }
}
