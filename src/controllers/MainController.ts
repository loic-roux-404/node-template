import { Get, Response, Controller } from "@decorators/express";

@Controller("/")
export default class {
  @Get("")
  async list(@Response() res: any): Promise<void> {
    res.json({
      title: "Home",
      content: "Attttttend",
    });
  }
}
