"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const serverConfig = {
    mongoUrl: (_a = process.env.MONGO_URL) !== null && _a !== void 0 ? _a : "mongodb://localhost:27017",
    PORT: process.env.PORT || 3000,
    jwtSecret: (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : "secret-phrase",
    jwtExpires: (_c = process.env.JWT_EXPIRES) !== null && _c !== void 0 ? _c : "20h",
};
exports.default = serverConfig;
//# sourceMappingURL=serverConfig.js.map