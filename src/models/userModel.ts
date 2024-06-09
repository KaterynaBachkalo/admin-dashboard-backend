import { model, Schema, Document } from "mongoose";
import { genSalt, hash, compare } from "bcrypt";
import crypto from "crypto";

interface IUser extends Document {
  password: string;
  email: string;
  subscription: string;
  avatarURL?: string;
  accessToken?: string;
  refreshToken?: string;
  checkPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
    },

    accessToken: String,
    refreshToken: String,
  },
  {
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const emailHash = crypto.createHash("md5").update(this.email).digest("hex");

    this.avatarURL = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=robohash`;
  }

  if (!this.isModified("password")) return next();

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);

  next();
});

userSchema.methods.checkPassword = (candidate: string, passwdHash: string) =>
  compare(candidate, passwdHash);

export const User = model<IUser>("User", userSchema);
