/* eslint-disable @typescript-eslint/no-misused-promises */
import { Document, Schema, Model, model } from "mongoose";
import RoomModel, { RoomDocument } from "./Room";

const HotelSchema: Schema<HotelDocument, HotelBaseModel> = new Schema<
  HotelDocument,
  HotelBaseModel
>({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  supply: {
    type: Array,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  coordinates: {
    type: Object,
    required: true,
  },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: false,
      validate: {
        validator: (_id: number, _: any) => _id == null,
        message: "Room cannot be added from hotel",
      },
    },
  ],
});

interface Hotel {
  name: string;
  supply: string[];
  address: String;
  rate: Number;
  coordinates: Object;
}

export interface HotelDocument extends Hotel, Document {
  rooms?: [RoomDocument["_id"]];
}

export interface HotelBaseModel extends Model<HotelDocument> {}

HotelSchema.post(
  "remove",
  async function ({ _id: hotel }, next: Function): Promise<void> {
    await RoomModel.findOneAndDelete({ hotel });
    return next();
  }
);

export default model<HotelDocument, HotelBaseModel>("Hotel", HotelSchema);
