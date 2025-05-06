"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
var react_1 = __importDefault(require("react"));
require("../styles/globals.css");
exports.metadata = {
    title: 'EchoMind 2.1',
    description: 'A modern media management component with project organization and voice control',
};
function RootLayout(_a) {
    var children = _a.children;
    return (react_1.default.createElement("html", { lang: "en" },
        react_1.default.createElement("body", null, children)));
}
