/* eslint-disable @typescript-eslint/no-misused-promises */
import { Document, Schema, Model, model } from "mongoose";
import HotelModel, { HotelDocument } from "./Hotel";
import autopopulate from "mongoose-autopopulate";

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
  },
});

RoomSchema.plugin(autopopulate);

interface Room {
  name: string;
  capacity: number;
  price: number;
}

export interface RoomDocument extends Room, Document {
  hotel: HotelDocument["_id"];
}

export interface RoomBaseModel extends Model<RoomDocument> { }

RoomSchema.pre("save", async function (next): Promise<void> {
  console.log(this);
  await HotelModel.updateOne({ _id: this.hotel }, { _id: this._id });
  next();
});

export default model<RoomDocument, RoomBaseModel>("Room", RoomSchema);
