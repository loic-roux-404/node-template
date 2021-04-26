import { Document, Model, model, Types, Schema } from "mongoose"
import { HotelDocument } from "./hotel"

// Schema
const UserSchema: Schema<UserDocument, UserModel> = new Schema<UserDocument, UserModel>({
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  currentHotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
    required: false
  },
  friends: [{
    type: String,
  }],
  creditCards: {
    type: Map,
    of: String
  }
})

interface User {
  firstName: string;
  lastName?: string;
  username: string;
  password: string;
  currentHotel: Types.ObjectId | Record<string, unknown>;
  friends: Array<string>;
  creditCards?: Map<string, string>;
}

export interface UserDocument extends User, Document {
  friends: Types.Array<string>;
  creditCards?: Types.Map<string>;
  fullName: string;
  hotel?: HotelDocument["_id"];
}

// For model
export interface UserModel extends Model<UserDocument> {
  findHotel(id: string): Promise<UserDocument>
}

// Static methods
UserSchema.statics.findHotel = async function(
  this: Model<UserDocument>,
  id: string
) {
  return this.findById(id).populate("hotel").exec()
}

// Virtuals
UserSchema.virtual("fullName").get(function(this: UserDocument) {
  return `${this.firstName} ${this.lastName||''}`
})

// Document middlewares
UserSchema.pre<UserDocument>("save", function(_) {
  if (this.isModified("password")) {
    this.password = this.password//hashPassword(this.password)
  }
});

// Default export
export default model<UserDocument, UserModel>("User", UserSchema)
