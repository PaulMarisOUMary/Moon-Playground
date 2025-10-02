"use client";

import { Dispatch, MouseEventHandler, SetStateAction, useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";

import { moonLanguage } from "@/app/lang/lang";
import { moonFolding } from "@/app/lang/fold";
import { moonHighlightExtension } from "@/app/lang/highlight";
import { moonTheme } from "@/app/lang/theme";

import RunButton from "@/components/run/run";

import '@/components/mirroreditor/mirroreditor.scss'
import { tabKeymap } from "@/app/lang/keys";


type MirrorEditorProps = {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
  runFunc: MouseEventHandler<HTMLButtonElement>;
  running: boolean;
};

export default function MirrorEditor({ code, setCode, runFunc, running }: MirrorEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const view = new EditorView({
      doc: code,
      extensions: [
        basicSetup,
        moonLanguage,
        moonFolding,
        moonHighlightExtension,
        moonTheme,
        tabKeymap,
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            setCode(update.state.doc.toString());
          }
        }),
      ],
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => view.destroy();
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;

    const current = view.state.doc.toString();
    if (current !== code) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: code },
        scrollIntoView: true,
      });
    }
  }, [code]);

  return (
    <div className="mirror-editor-main-container">
      <div className="mirror-run-container">
        <RunButton onClick={runFunc} running={running} />
      </div>
      <div className="mirror-editor-container">
        <div className="mirror-editor" ref={editorRef}/>
      </div>
    </div>
  )
}