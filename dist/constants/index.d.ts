export declare const APP_NAME = "EchoMind 2.1";
export declare const APP_DESCRIPTION = "Magic Photo Gallery with Voice Control";
export declare const MAX_FILE_SIZE: number;
export declare const ACCEPTED_FILE_TYPES: {
    readonly 'image/*': readonly [".png", ".jpg", ".jpeg", ".gif", ".webp"];
    readonly 'video/*': readonly [".mp4", ".webm", ".mov"];
};
export declare const MAGIC_TRICK_DURATION = 3000;
export declare const IMAGE_PREVIEW_DURATION = 2000;
export declare const STORAGE_KEYS: {
    readonly PROJECTS: "echomind_projects";
    readonly MEDIA_ITEMS: "echomind_media_items";
};
export declare const THEME: {
    readonly colors: {
        readonly primary: {
            readonly light: "#60A5FA";
            readonly DEFAULT: "#3B82F6";
            readonly dark: "#2563EB";
        };
        readonly background: {
            readonly light: "#1E293B";
            readonly DEFAULT: "#0F172A";
            readonly dark: "#020617";
        };
        readonly text: {
            readonly light: "#F8FAFC";
            readonly DEFAULT: "#E2E8F0";
            readonly dark: "#94A3B8";
        };
    };
    readonly gradients: {
        readonly background: "bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900";
        readonly text: "bg-gradient-to-r from-pink-500 to-violet-500";
    };
};
