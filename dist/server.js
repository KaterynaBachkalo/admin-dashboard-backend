"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const configs_1 = __importDefault(require("./configs"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default
    .connect(configs_1.default.mongoUrl)
    .then(() => {
    console.log("Database connection successful");
})
    .catch((er) => {
    console.log(er.message);
    process.exit(1);
});
exports.default = app_1.default.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
});
//# sourceMappingURL=server.js.map