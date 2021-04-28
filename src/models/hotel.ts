import { Document, Schema, Model, model } from "mongoose";

const HotelSchema: Schema<HotelDocument, HotelModel> = new Schema<
  HotelDocument,
  HotelModel
>({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  supply: {
    type: Array,
    required: true,
  },
  rate: {
    type: Array,
    required: true,
  },
  coordinates: {
    type: Object,
    required: true,
  },
});

export interface Hotel {
  name: string;
  supply: string[];
  address: String;
  rate: Number;
  coordinates: Object;
}

export interface HotelDocument extends Hotel, Document {}

export interface HotelModel extends Model<HotelDocument> {}

export default model<HotelDocument, HotelModel>("Hotel", HotelSchema);
