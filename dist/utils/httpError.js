"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}
exports.default = HttpError;
//# sourceMappingURL=httpError.js.map