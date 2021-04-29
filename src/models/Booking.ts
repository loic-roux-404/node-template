import { Document, Schema, Model, model } from "mongoose";
import RoomModel, { RoomDocument, RoomBaseModel } from "./Room";
import moment from "moment";

const bookingSchema: Schema<BookingDocument, BookingBaseModel> = new Schema<
  BookingDocument,
  BookingBaseModel
>({
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
  ],
  dateArrival: {
    type: String,
    required: true,
  },
  dateDeparture: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  comment: {
    type: String,
    required: false,
  },
});

interface Booking {
  rooms: RoomBaseModel[];
  dateArrival: string;
  dateDeparture: string;
  price: number;
  comment: string;
}

// Hook delete all rooms

// eslint-disable-next-line @typescript-eslint/no-misused-promises
bookingSchema.pre("save", async function (next): Promise<void> {
  let price = 0;

  for (let i = 0; i < this.rooms.length; i++) {
    const room = await RoomModel.findOne({ _id: this.rooms[i] }).exec();
    if (room == null) continue;
    price += Number(room.price);
  }

  const arrival = moment(this.dateArrival, "YYYY-MM-DD");
  const departure = moment(this.dateDeparture, "YYYY-MM-DD");
  this.dateArrival = arrival.toJSON();
  this.dateDeparture = departure.toJSON();
  const duration = departure.diff(arrival, "days");
  this.price = price * duration;

  next();
});

export interface BookingDocument extends Booking, Document {
  rooms: [RoomDocument["_id"]];
}

export interface BookingBaseModel extends Model<BookingDocument> {}

export default model("Booking", bookingSchema);
