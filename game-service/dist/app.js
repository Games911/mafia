"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const seed_1 = __importDefault(require("./api/routes/system/seed"));
const app = (0, express_1.default)();
// Parse body
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// Parse body
// Cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, x-requested-with, Content-Type, Accept, Authorization");
    next();
});
// Cors
app.get('/', (req, res) => {
    res.send('Game Service works !!!');
});
app.use('/seed', seed_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map