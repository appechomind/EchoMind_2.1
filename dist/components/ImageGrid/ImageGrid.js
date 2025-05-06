"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageGrid = void 0;
var react_1 = __importDefault(require("react"));
var utils_1 = require("@/utils");
var ImageGrid = function (_a) {
    var mediaItems = _a.mediaItems, onImageClick = _a.onImageClick, onDelete = _a.onDelete;
    if (mediaItems.length === 0) {
        return (react_1.default.createElement("div", { className: "text-center py-8 text-gray-500" }, "No media items found. Upload some files to get started!"));
    }
    return (react_1.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" }, mediaItems.map(function (item) { return (react_1.default.createElement("div", { key: item.id, className: "group relative aspect-square rounded-lg overflow-hidden bg-gray-100" },
        react_1.default.createElement("img", { src: item.url, alt: item.title, className: "w-full h-full object-cover cursor-pointer transition-transform group-hover:scale-105", onClick: function () { return onImageClick(item); } }),
        react_1.default.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" },
            react_1.default.createElement("div", { className: "absolute bottom-0 left-0 right-0 p-4 text-white" },
                react_1.default.createElement("h3", { className: "font-medium truncate" }, item.title),
                react_1.default.createElement("p", { className: "text-sm text-gray-200" },
                    "Added ",
                    (0, utils_1.formatDate)(item.createdAt))),
            react_1.default.createElement("button", { onClick: function (e) {
                    e.stopPropagation();
                    onDelete(item.id);
                }, className: "absolute top-2 right-2 p-1.5 bg-black/50 rounded-full text-white hover:bg-red-500 transition-colors" },
                react_1.default.createElement("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                    react_1.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" })))))); })));
};
exports.ImageGrid = ImageGrid;
