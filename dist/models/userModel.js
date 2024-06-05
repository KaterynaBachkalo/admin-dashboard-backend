"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const crypto_1 = __importDefault(require("crypto"));
const userSchema = new mongoose_1.Schema({
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
    token: String,
}, {
    versionKey: false,
});
userSchema.pre("save", async function (next) {
    if (this.isNew) {
        const emailHash = crypto_1.default.createHash("md5").update(this.email).digest("hex");
        this.avatarURL = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=robohash`;
    }
    if (!this.isModified("password"))
        return next();
    const salt = await (0, bcrypt_1.genSalt)(10);
    this.password = await (0, bcrypt_1.hash)(this.password, salt);
    next();
});
userSchema.methods.checkPassword = (candidate, passwdHash) => (0, bcrypt_1.compare)(candidate, passwdHash);
exports.User = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=userModel.js.map