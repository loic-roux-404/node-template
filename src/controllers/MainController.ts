import { Get, Response, Controller } from "@decorators/express";
import { Container, Injectable } from "@decorators/di";
import { Connection, STATES } from "mongoose";

@Controller("/")
@Injectable()
export default class MainController {
  @Get("")
  async home(@Response() res: any): Promise<void> {
    res.json({
      title: "Home",
    });
  }

  @Get("/supervision")
  async supervision(@Response() res: any): Promise<void> {
    const db = Container.get<Connection>("db");
    res.json({ dbstatus: STATES[db.readyState] });
  }
}
