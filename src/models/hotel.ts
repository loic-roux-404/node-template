import { Document, Schema, Model, model, Types } from "mongoose";
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

// eslint-disable-next-line @typescript-eslint/no-misused-promises
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

// eslint-disable-next-line @typescript-eslint/no-misused-promises
HotelSchema.post("deleteMany", async function (docs): Promise<void> {
  await RoomModel.deleteMany({
    hotel: {
      $in: docs.map((doc: Document) => doc._id),
    },
  });
});

export default model<HotelDocument, HotelBaseModel>("Hotel", HotelSchema);
