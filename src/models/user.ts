import { Document, Model, model, Types, Schema } from "mongoose";
import { HotelDocument } from "./Hotel";

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
  currentHotel: {
    type: Types.ObjectId,
    ref: "Hotel",
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
  currentHotel?: HotelDocument["_id"];
}

// For model
export interface UserModel extends Model<UserDocument> {
  findHotel: (id: string) => Promise<UserDocument>;
}

// Static methods
UserSchema.statics.findHotel = async function (
  this: Model<UserDocument>,
  id: string
) {
  return await this.findById(id).populate("hotel").exec();
};

// Virtuals
UserSchema.virtual("fullName").get(function (this: UserDocument) {
  return `${this.firstName} ${this.lastName ?? ""}`;
});

// Document middlewares
UserSchema.pre<UserDocument>("save", function (_) {
  if (this.isModified("token")) {
    this.token = this.token.trim();
  }
});

// Default export
export default model<UserDocument, UserModel>("User", UserSchema);
