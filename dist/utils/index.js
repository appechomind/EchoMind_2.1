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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = generateId;
exports.formatDate = formatDate;
exports.getFileExtension = getFileExtension;
exports.isImageFile = isImageFile;
exports.isVideoFile = isVideoFile;
exports.getMediaType = getMediaType;
exports.updateProjectMediaCount = updateProjectMediaCount;
exports.filterMediaByProject = filterMediaByProject;
exports.searchMedia = searchMedia;
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}
function isImageFile(filename) {
    var ext = getFileExtension(filename).toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);
}
function isVideoFile(filename) {
    var ext = getFileExtension(filename).toLowerCase();
    return ['mp4', 'webm', 'mov'].includes(ext);
}
function getMediaType(filename) {
    if (isImageFile(filename))
        return 'image';
    if (isVideoFile(filename))
        return 'video';
    return 'unknown';
}
function updateProjectMediaCount(project, mediaItems) {
    var count = mediaItems.filter(function (item) { return item.projectId === project.id; }).length;
    return __assign(__assign({}, project), { mediaCount: count });
}
function filterMediaByProject(mediaItems, projectId) {
    if (!projectId)
        return mediaItems;
    return mediaItems.filter(function (item) { return item.projectId === projectId; });
}
function searchMedia(mediaItems, query) {
    var searchTerm = query.toLowerCase();
    return mediaItems.filter(function (item) {
        return item.title.toLowerCase().includes(searchTerm) ||
            item.keywords.some(function (k) { return k.toLowerCase().includes(searchTerm); });
    });
}
