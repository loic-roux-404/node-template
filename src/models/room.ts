import { Document, Schema, Model, model } from "mongoose";

const RoomSchema: Schema<RoomDocument, RoomBaseModel> = new Schema<
  RoomDocument,
  RoomBaseModel
>({
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
});

interface Room {
  name: string;
  capacity: number;
}

export interface RoomDocument extends Room, Document {}

export interface RoomBaseModel extends Model<RoomDocument> {}

export default model<RoomDocument, RoomBaseModel>("Room", RoomSchema);
