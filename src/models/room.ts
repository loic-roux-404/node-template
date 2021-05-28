/* eslint-disable @typescript-eslint/no-misused-promises */
import { Document, Schema, Model, model } from "mongoose";
import HotelModel, { HotelDocument } from "./Hotel";

const RoomSchema: Schema<RoomDocument, RoomBaseModel> = new Schema<
  RoomDocument,
  RoomBaseModel
>({
  name: {
    type: String,
    required: false,
  },
  capacity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
    validate: {
      async validator(_id: number, _: any) {
        return await HotelModel.exists({ _id });
      },
      message: "Hotel doesn't exists",
    },
  },
});

interface Room {
  name: string;
  capacity: number;
  price: number;
}

export interface RoomDocument extends Room, Document {
  hotel: HotelDocument["_id"];
}

export interface RoomBaseModel extends Model<RoomDocument> {}

RoomSchema.pre(
  "insertMany",
  async function (next: Function, docs: RoomDocument[]): Promise<void> {
    console.log(docs);
    return next();
  }
);

export default model<RoomDocument, RoomBaseModel>("Room", RoomSchema);
