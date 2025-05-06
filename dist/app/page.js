"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
var react_1 = __importDefault(require("react"));
var EchoMind_1 = require("../components/EchoMind/EchoMind");
function Home() {
    return (react_1.default.createElement("main", { className: "min-h-screen" },
        react_1.default.createElement(EchoMind_1.EchoMind, null)));
}
