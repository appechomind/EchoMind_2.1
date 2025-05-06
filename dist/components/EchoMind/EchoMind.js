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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EchoMind = void 0;
var react_1 = __importStar(require("react"));
var ImageGrid_1 = require("../ImageGrid/ImageGrid");
var MediaUploader_1 = require("../MediaUploader/MediaUploader");
var VoiceRecognition_1 = require("../VoiceRecognition/VoiceRecognition");
var ProjectManager_1 = require("../ProjectManager/ProjectManager");
var usePersistentStorage_1 = require("@/hooks/usePersistentStorage");
var utils_1 = require("@/utils");
var constants_1 = require("@/constants");
var EchoMind = function (_a) {
    var _b = _a.className, className = _b === void 0 ? '' : _b, onMediaSelect = _a.onMediaSelect, onProjectSelect = _a.onProjectSelect;
    var _c = (0, usePersistentStorage_1.usePersistentStorage)('MEDIA_ITEMS', []), mediaItems = _c[0], setMediaItems = _c[1];
    var _d = (0, usePersistentStorage_1.usePersistentStorage)('PROJECTS', []), projects = _d[0], setProjects = _d[1];
    var _e = (0, react_1.useState)(null), selectedProject = _e[0], setSelectedProject = _e[1];
    var _f = (0, react_1.useState)(''), searchQuery = _f[0], setSearchQuery = _f[1];
    var _g = (0, react_1.useState)(false), isPerformingMagicTrick = _g[0], setIsPerformingMagicTrick = _g[1];
    var _h = (0, react_1.useState)(null), selectedImage = _h[0], setSelectedImage = _h[1];
    var handleUpload = (0, react_1.useCallback)(function (file) {
        var newMediaItem = {
            id: (0, utils_1.generateId)(),
            url: URL.createObjectURL(file),
            title: file.name,
            keywords: [],
            projectId: selectedProject || undefined,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        setMediaItems(function (prev) { return __spreadArray(__spreadArray([], prev, true), [newMediaItem], false); });
    }, [selectedProject, setMediaItems]);
    var handleDelete = (0, react_1.useCallback)(function (id) {
        setMediaItems(function (prev) { return prev.filter(function (item) { return item.id !== id; }); });
    }, [setMediaItems]);
    var handleProjectSelect = (0, react_1.useCallback)(function (projectId) {
        setSelectedProject(projectId);
        if (onProjectSelect) {
            var project = projectId ? projects.find(function (p) { return p.id === projectId; }) || null : null;
            onProjectSelect(project);
        }
    }, [projects, onProjectSelect]);
    var handleVoiceTranscript = (0, react_1.useCallback)(function (text) {
        setSearchQuery(text);
    }, []);
    var handleImageClick = (0, react_1.useCallback)(function (item) {
        setSelectedImage(item);
        if (onMediaSelect) {
            onMediaSelect(item);
        }
    }, [onMediaSelect]);
    var performMagicTrick = (0, react_1.useCallback)(function () {
        if (mediaItems.length === 0)
            return;
        setIsPerformingMagicTrick(true);
        var randomIndex = Math.floor(Math.random() * mediaItems.length);
        var randomMedia = mediaItems[randomIndex];
        setSelectedImage(randomMedia);
        if (onMediaSelect) {
            onMediaSelect(randomMedia);
        }
        setTimeout(function () {
            setIsPerformingMagicTrick(false);
            setSelectedImage(null);
        }, constants_1.MAGIC_TRICK_DURATION);
    }, [mediaItems, onMediaSelect]);
    var filteredMedia = (0, utils_1.searchMedia)((0, utils_1.filterMediaByProject)(mediaItems, selectedProject), searchQuery);
    return (react_1.default.createElement("div", { className: "bg-slate-900 ".concat(className) },
        react_1.default.createElement("div", { className: "container mx-auto px-4 py-8" },
            react_1.default.createElement("h1", { className: "text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text" }, constants_1.APP_NAME),
            react_1.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8" },
                react_1.default.createElement("div", { className: "space-y-8" },
                    react_1.default.createElement(ProjectManager_1.ProjectManager, { projects: projects, selectedProject: selectedProject, onProjectSelect: handleProjectSelect, onProjectCreate: function (name) {
                            var newProject = {
                                id: (0, utils_1.generateId)(),
                                name: name,
                                description: '',
                                mediaCount: 0,
                                createdAt: Date.now(),
                                updatedAt: Date.now()
                            };
                            setProjects(function (prev) { return __spreadArray(__spreadArray([], prev, true), [newProject], false); });
                        }, onProjectDelete: function (id) {
                            setProjects(function (prev) { return prev.filter(function (p) { return p.id !== id; }); });
                            if (selectedProject === id) {
                                setSelectedProject(null);
                            }
                        } }),
                    react_1.default.createElement(MediaUploader_1.MediaUploader, { onUpload: handleUpload }),
                    react_1.default.createElement(VoiceRecognition_1.VoiceRecognition, { onTranscript: handleVoiceTranscript }),
                    react_1.default.createElement("button", { onClick: performMagicTrick, disabled: isPerformingMagicTrick || mediaItems.length === 0, className: "w-full py-3 rounded-lg font-medium transition-all\n                ".concat(isPerformingMagicTrick || mediaItems.length === 0
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-purple-500 hover:bg-purple-600 text-white') }, isPerformingMagicTrick ? 'Performing Magic...' : 'Perform Magic Trick')),
                react_1.default.createElement("div", { className: "space-y-4" },
                    react_1.default.createElement("input", { type: "text", value: searchQuery, onChange: function (e) { return setSearchQuery(e.target.value); }, placeholder: "Search media...", className: "w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" }),
                    react_1.default.createElement(ImageGrid_1.ImageGrid, { mediaItems: filteredMedia, onImageClick: handleImageClick, onDelete: handleDelete }))),
            selectedImage && (react_1.default.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4" },
                react_1.default.createElement("div", { className: "relative max-w-4xl w-full" },
                    react_1.default.createElement("img", { src: selectedImage.url, alt: selectedImage.title, className: "w-full h-auto rounded-lg" }),
                    react_1.default.createElement("button", { onClick: function () { return setSelectedImage(null); }, className: "absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75" },
                        react_1.default.createElement("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                            react_1.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" })))))))));
};
exports.EchoMind = EchoMind;
