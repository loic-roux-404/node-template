import { Document, Schema, Model, model, Types } from "mongoose";
import { HotelDocument } from "./Hotel";

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
    type: Types.ObjectId,
    ref: "Hotel",
    required: true,
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

export default model<RoomDocument, RoomBaseModel>("Room", RoomSchema);
