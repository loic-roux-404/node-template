import { Document, Schema, Model } from "mongoose"

const CompanyModel: Schema<Document, Company> = new Schema<Document, Company>({
  name: {
    type: String,
    required: true
  }
})

export interface Company extends Document {
  name: string
}

export default CompanyModel
