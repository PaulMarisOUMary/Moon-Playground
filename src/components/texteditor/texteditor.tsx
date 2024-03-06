import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useRef } from 'react';

import '@/components/texteditor/texteditor.scss'

export default function TextEditor({ code, setCode }: { code: string, setCode: Dispatch<SetStateAction<string>> }) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleCodeChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCode(event.target.value);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Tab") {
            event.preventDefault();
            const textarea = textAreaRef.current;
            if (textarea) {
                const selectionStart = textarea.selectionStart;

                const newText = `${code.slice(0, selectionStart)}\t${code.slice(selectionStart)}`;

                setCode(newText);
                setTimeout(() => {
                    textarea.setSelectionRange(selectionStart + 1, selectionStart + 1);
                }, 0);
            }
        }
    };

    const getLineNumbers = () => {
        return code.split("\n").map((_, index) => index + 1);
    };

    // const rules = [
    //     { pattern: /\b(true|false)\b/g, className: "keyword" },
    //     { pattern: /"(\\.|[^"\\])*"/g, className: "string" },
    // ];

    // function applyHighlight(value: string) {
    //     const lines = value.split("\n");

    //     const elements = lines.map((line, index) => {
    //         const subElements = []
            
    //         subElements.push(
    //             <span className="type-text">{line ? line : ' '}</span>
    //         )

    //         return (
    //             <span key={index} className="highlighted-line">
    //                 { subElements }
    //             </span>
    //         )
    //     });

    //     return elements;
    // }

    return (
        <div className="test-editor-main-container">
            <div className="text-editor-container">
                <div className="text-editor-line-numbers">
                    {getLineNumbers().map((number) => (
                        <div key={number} className="text-editor-line-number">
                            {number}
                        </div>
                    ))}
                </div>
                <div className="text-editor-input-container">
                    {/* <div className="text-editor-input-backdrop">
                        { applyHighlight(code).map((element) => (
                            element
                        )) }
                    </div> */}
                    <textarea
                        className="text-editor-input"
                        value={code}
                        onChange={handleCodeChange}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                        spellCheck="false"
                        ref={textAreaRef}
                    />
                </div>
            </div>
        </div>
    );
}
