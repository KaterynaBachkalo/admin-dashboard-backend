import { model, Schema, Document } from "mongoose";

interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  favorite?: Boolean;
  owner?: Schema.Types.ObjectId;
}

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
  }
);

export const Contact = model<IContact>("Contact", contactSchema);
