import { Model } from "mongoose";
import isEmpty from "lodash/isEmpty";
import pickBy from "lodash/pickBy";
import { QueryReturn } from "../modules/expressInternal/index";
import { Injectable } from "@decorators/di";

interface QueryObject {
  [key: string]: any;
}

interface DataIn {
  _id?: string;
}

class CrudServiceError extends Error {}

@Injectable()
export class CrudService {
  private Model?: Model<any>;

  setModel(model: Model<any>): this {
    this.Model = model;

    return this;
  }

  public async readUtil(
    query: QueryObject,
    queryOverride: QueryObject = {}
  ): Promise<QueryReturn> {
    if (this.Model == null) throw CrudServiceError;
    queryOverride = pickBy(queryOverride);
    const finalQuery = !isEmpty(queryOverride) ? queryOverride : query;
    const data = await this.Model.find(finalQuery);

    return {
      data,
      status: this.readStatus(data, 200, !isEmpty(finalQuery)),
    };
  }

  public async createUtil(body: {}): Promise<QueryReturn> {
    if (this.Model == null) throw CrudServiceError;
    const data = (await this.Model.create(new this.Model(body))) ?? {};
    return {
      data,
      status: this.createStatus(data),
    };
  }

  public async createMulUtil(body: {}): Promise<QueryReturn> {
    if (this.Model == null) throw CrudServiceError;

    const data = await this.Model.insertMany(
      body instanceof Array ? body.map((e) => new Model(e)) : [new Model(body)]
    );

    return {
      data,
      status: this.createStatus(data),
    };
  }

  async updateUtil(query: QueryObject, body: {}): Promise<QueryReturn> {
    if (this.Model == null) throw CrudServiceError;

    const data = await this.Model.updateOne(query, body).exec();

    return { data, status: this.updateStatus(data) };
  }

  async deleteUtil(query: {}): Promise<QueryReturn> {
    if (this.Model == null) throw CrudServiceError;

    query = pickBy(query);
    const data = await this.Model.deleteMany(query).exec();

    return { data, status: this.updateStatus(data, 200) };
  }

  protected readStatus(
    data: DataIn[],
    statusOk = 200,
    hasQuery = false
  ): number {
    if (data.length < 1) {
      return hasQuery ? 404 : 204;
    } else {
      return data[0]?._id != null ? statusOk : 404;
    }
  }

  protected createStatus(data: DataIn, statusOk = 201): number {
    return data?._id != null ? statusOk : 400;
  }

  protected updateStatus(data: { n?: number }, statusOk = 201): number {
    return data?.n != null && data.n > 0 ? statusOk : 404;
  }
}

export default { provide: CrudService.name, useClass: CrudService };
