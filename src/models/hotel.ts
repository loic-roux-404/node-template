import { Document, Schema, Model, model, Types } from "mongoose";
import { RoomDocument } from "./Room";

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

// Static methods
HotelSchema.statics.findRooms = async function (
  this: Model<HotelDocument>,
  id: string
): Promise<HotelDocument | null> {
  return await this.findById(id).populate("rooms").exec();
};

export default model<HotelDocument, HotelBaseModel>("Hotel", HotelSchema);
