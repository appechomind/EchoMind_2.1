"use strict";
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
exports.VoiceRecognition = void 0;
var react_1 = __importStar(require("react"));
var VoiceRecognition = function (_a) {
    var onTranscript = _a.onTranscript;
    var _b = (0, react_1.useState)(false), isListening = _b[0], setIsListening = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    var startListening = (0, react_1.useCallback)(function () {
        if (!('webkitSpeechRecognition' in window)) {
            setError('Speech recognition is not supported in your browser');
            return;
        }
        var recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.onstart = function () {
            setIsListening(true);
            setError(null);
        };
        recognition.onresult = function (event) {
            var transcript = Array.from(event.results)
                .map(function (result) { return result[0]; })
                .map(function (result) { return result.transcript; })
                .join('');
            onTranscript(transcript);
        };
        recognition.onerror = function (event) {
            setError("Error: ".concat(event.error));
            setIsListening(false);
        };
        recognition.onend = function () {
            setIsListening(false);
        };
        recognition.start();
    }, [onTranscript]);
    var stopListening = (0, react_1.useCallback)(function () {
        if ('webkitSpeechRecognition' in window) {
            var recognition = new window.webkitSpeechRecognition();
            recognition.stop();
        }
    }, []);
    return (react_1.default.createElement("div", { className: "flex flex-col items-center space-y-4" },
        react_1.default.createElement("button", { onClick: isListening ? stopListening : startListening, className: "px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105\n          ".concat(isListening
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white') }, isListening ? 'Stop Listening' : 'Start Voice Recognition'),
        error && (react_1.default.createElement("p", { className: "text-red-500 text-sm" }, error)),
        isListening && (react_1.default.createElement("div", { className: "flex items-center space-x-2" },
            react_1.default.createElement("div", { className: "w-3 h-3 bg-red-500 rounded-full animate-pulse" }),
            react_1.default.createElement("span", { className: "text-sm text-gray-600" }, "Listening...")))));
};
exports.VoiceRecognition = VoiceRecognition;
