'use client'

import { Bookmark, BookmarkCheck } from "lucide-react";

interface BookmarkProps {
    isBookmarked: boolean;
     onClick: (e: React.MouseEvent) => void;
    className?: string;
}

export default function BookmarkComponent({isBookmarked,onClick,className,}: BookmarkProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            className={`p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors ${className || ""}`}
        >
            {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
        </button>
    );
}