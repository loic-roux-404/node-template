import { Document, Model, model, Schema } from "mongoose";

// Schema
const ClientSchema: Schema<ClientDocument, ClientModel> = new Schema<
  ClientDocument,
  ClientModel
>({
  client_id: String,
  client_secret: String,
  grant_types: Array,
  redirect_uris: Array,
});

interface Client {
  client_id: string;
  client_secret: string;
  grant_types: string[];
  redirect_uris: string[];
}

export interface ClientDocument extends Client, Document {}

// For model
export interface ClientModel extends Model<ClientDocument> {}

// Default export
export default model<ClientDocument, ClientModel>("Client", ClientSchema);
