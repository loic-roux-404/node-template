import { Document, Model, model, Schema } from "mongoose";
import { RoomDocument } from "./Room";

// Schema
const UserSchema: Schema<UserDocument, UserModel> = new Schema<
  UserDocument,
  UserModel
>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  name: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  token: {
    type: String,
    required: true,
  },
  currentRoom: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: false,
  },
});

interface User {
  firstName: string;
  lastName?: string;
  name: string;
  token: string;
}

export interface UserDocument extends User, Document {
  fullName: string;
  currentRoom?: RoomDocument["_id"];
}

// For model
export interface UserModel extends Model<UserDocument> {
  findRoom: (id: string) => Promise<RoomDocument>;
}

// Virtuals
UserSchema.virtual("fullName").get(function (this: UserDocument) {
  return `${this.firstName} ${this.lastName ?? ""}`;
});

export default model<UserDocument, UserModel>("User", UserSchema);
