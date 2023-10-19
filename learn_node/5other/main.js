"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const process_1 = __importDefault(require("process"));
const dotenv_1 = __importDefault(require("dotenv"));
(0, console_1.log)(process_1.default.env.USER_ID);
dotenv_1.default.config();
(0, console_1.log)(process_1.default.env.USER_ID);
