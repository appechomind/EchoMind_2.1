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
exports.ProjectManager = void 0;
var react_1 = __importStar(require("react"));
var utils_1 = require("@/utils");
var ProjectManager = function (_a) {
    var projects = _a.projects, selectedProject = _a.selectedProject, onProjectSelect = _a.onProjectSelect, onProjectCreate = _a.onProjectCreate, onProjectDelete = _a.onProjectDelete;
    var _b = (0, react_1.useState)(''), newProjectName = _b[0], setNewProjectName = _b[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        if (newProjectName.trim()) {
            onProjectCreate(newProjectName.trim());
            setNewProjectName('');
        }
    };
    return (react_1.default.createElement("div", { className: "space-y-4" },
        react_1.default.createElement("h2", { className: "text-2xl font-semibold" }, "Projects"),
        react_1.default.createElement("form", { onSubmit: handleSubmit, className: "flex gap-2" },
            react_1.default.createElement("input", { type: "text", value: newProjectName, onChange: function (e) { return setNewProjectName(e.target.value); }, placeholder: "New project name...", className: "flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" }),
            react_1.default.createElement("button", { type: "submit", className: "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors" }, "Create")),
        react_1.default.createElement("div", { className: "space-y-2" },
            react_1.default.createElement("button", { onClick: function () { return onProjectSelect(null); }, className: "w-full text-left px-4 py-2 rounded-lg transition-colors\n            ".concat(selectedProject === null
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-100') }, "All Media"),
            projects.map(function (project) { return (react_1.default.createElement("div", { key: project.id, className: "group flex items-center justify-between px-4 py-2 rounded-lg transition-colors\n              ".concat(selectedProject === project.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-100') },
                react_1.default.createElement("button", { onClick: function () { return onProjectSelect(project.id); }, className: "flex-1 text-left" },
                    react_1.default.createElement("div", { className: "font-medium" }, project.name),
                    react_1.default.createElement("div", { className: "text-sm text-gray-500" },
                        project.mediaCount,
                        " items \u2022 Created ",
                        (0, utils_1.formatDate)(project.createdAt))),
                react_1.default.createElement("button", { onClick: function () { return onProjectDelete(project.id); }, className: "opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-red-500 transition-opacity" },
                    react_1.default.createElement("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                        react_1.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }))))); }))));
};
exports.ProjectManager = ProjectManager;
