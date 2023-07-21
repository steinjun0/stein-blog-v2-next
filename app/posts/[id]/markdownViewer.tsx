'use client';
import MarkdwonView from "@uiw/react-markdown-preview";
export default function MarkdownViewer({ source }: { source: string; }) {
    return (
        <div className="markdown-body">
            <MarkdwonView source={source} />
        </div>
    );
}