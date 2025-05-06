"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePersistentStorage = usePersistentStorage;
var react_1 = require("react");
var STORAGE_KEYS = {
    PROJECTS: 'echomind_projects',
    MEDIA_ITEMS: 'echomind_media_items',
};
function usePersistentStorage(key, initialValue) {
    var storageKey = STORAGE_KEYS[key];
    // Initialize state with value from localStorage or initialValue
    var _a = (0, react_1.useState)(function () {
        if (typeof window === 'undefined')
            return initialValue;
        try {
            var item = window.localStorage.getItem(storageKey);
            return item ? JSON.parse(item) : initialValue;
        }
        catch (error) {
            console.error("Error reading from localStorage (".concat(storageKey, "):"), error);
            return initialValue;
        }
    }), value = _a[0], setValue = _a[1];
    // Update localStorage when value changes
    (0, react_1.useEffect)(function () {
        try {
            window.localStorage.setItem(storageKey, JSON.stringify(value));
        }
        catch (error) {
            console.error("Error writing to localStorage (".concat(storageKey, "):"), error);
            // If storage is full, try to clear old data
            if (error instanceof Error && error.name === 'QuotaExceededError') {
                clearOldData();
            }
        }
    }, [storageKey, value]);
    var clearOldData = (0, react_1.useCallback)(function () {
        try {
            // Clear data older than 30 days
            var thirtyDaysAgo_1 = Date.now() - (30 * 24 * 60 * 60 * 1000);
            if (Array.isArray(value)) {
                var filteredValue = value.filter(function (item) {
                    return item.updatedAt && item.updatedAt > thirtyDaysAgo_1;
                });
                setValue(filteredValue);
            }
        }
        catch (error) {
            console.error('Error clearing old data:', error);
        }
    }, [value]);
    var clearStorage = (0, react_1.useCallback)(function () {
        try {
            window.localStorage.removeItem(storageKey);
            setValue(initialValue);
        }
        catch (error) {
            console.error("Error clearing localStorage (".concat(storageKey, "):"), error);
        }
    }, [storageKey, initialValue]);
    return [value, setValue, clearStorage];
}
