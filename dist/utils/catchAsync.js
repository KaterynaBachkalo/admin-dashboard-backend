"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (fn) => (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
};
//# sourceMappingURL=catchAsync.js.map