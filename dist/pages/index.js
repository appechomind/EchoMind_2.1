"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
var react_1 = __importDefault(require("react"));
var head_1 = __importDefault(require("next/head"));
var EchoMind_1 = require("../components/EchoMind/EchoMind");
function Home() {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(head_1.default, null,
            react_1.default.createElement("title", null, "EchoMind 2.1"),
            react_1.default.createElement("meta", { name: "description", content: "A modern media management component with project organization and voice control" }),
            react_1.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
            react_1.default.createElement("link", { rel: "icon", href: "/favicon.ico" })),
        react_1.default.createElement("main", { className: "min-h-screen" },
            react_1.default.createElement(EchoMind_1.EchoMind, null))));
}
