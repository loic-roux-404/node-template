/* eslint-disable @typescript-eslint/no-misused-promises */
import { Document, Schema, Model, model, Types } from "mongoose";
import RoomModel, { RoomDocument } from "./Room";
import autopopulate from "mongoose-autopopulate";

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
      type: Types.ObjectId,
      ref: "Room",
      required: false,
      autopopulate: true,
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

HotelSchema.pre("save", async function (next): Promise<void> {
  if (this.rooms == null) {
    next();
    return;
  }

  for (const room of this.rooms) {
    await RoomModel.findOneAndUpdate(room, { hotel: this._id });
  }

  next();
});

HotelSchema.post(
  "deleteMany",
  async function (docs: RoomDocument[]): Promise<void> {
    await RoomModel.deleteMany({
      hotel: {
        $in: docs.map((doc: RoomDocument) => doc._id),
      },
    });
  }
);

HotelSchema.plugin(autopopulate);

export default model<HotelDocument, HotelBaseModel>("Hotel", HotelSchema);
