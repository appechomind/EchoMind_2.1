declare const STORAGE_KEYS: {
    readonly PROJECTS: "echomind_projects";
    readonly MEDIA_ITEMS: "echomind_media_items";
};
export declare function usePersistentStorage<T>(key: keyof typeof STORAGE_KEYS, initialValue: T): readonly [T, import("react").Dispatch<import("react").SetStateAction<T>>, () => void];
export {};
