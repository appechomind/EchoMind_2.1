"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaUploader = void 0;
var react_1 = __importStar(require("react"));
var react_dropzone_1 = require("react-dropzone");
var constants_1 = require("@/constants");
var MediaUploader = function (_a) {
    var onUpload = _a.onUpload;
    var onDrop = (0, react_1.useCallback)(function (acceptedFiles) {
        if (acceptedFiles.length > 0) {
            onUpload(acceptedFiles[0]);
        }
    }, [onUpload]);
    var _b = (0, react_dropzone_1.useDropzone)({
        onDrop: onDrop,
        accept: constants_1.ACCEPTED_FILE_TYPES,
        maxFiles: 1,
        maxSize: constants_1.MAX_FILE_SIZE
    }), getRootProps = _b.getRootProps, getInputProps = _b.getInputProps, isDragActive = _b.isDragActive;
    return (react_1.default.createElement("div", __assign({}, getRootProps(), { className: "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors\n        ".concat(isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500') }),
        react_1.default.createElement("input", __assign({}, getInputProps())),
        react_1.default.createElement("div", { className: "space-y-2" },
            react_1.default.createElement("svg", { className: "mx-auto h-12 w-12 text-gray-400", stroke: "currentColor", fill: "none", viewBox: "0 0 48 48", "aria-hidden": "true" },
                react_1.default.createElement("path", { d: "M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })),
            react_1.default.createElement("div", { className: "text-sm text-gray-600" }, isDragActive ? (react_1.default.createElement("p", null, "Drop the file here ...")) : (react_1.default.createElement("p", null, "Drag and drop a file here, or click to select"))),
            react_1.default.createElement("p", { className: "text-xs text-gray-500" }, "PNG, JPG, GIF, WebP, MP4, WebM, MOV up to 10MB"))));
};
exports.MediaUploader = MediaUploader;
