import { foldService } from "@codemirror/language";
import { EditorState } from "@codemirror/state";

function getIndent(line: string): number {
  const match = line.match(/^[\t ]*/);
  if (!match) return 0;
  return match[0].replace(/\t/g, "    ").length;
}

function moonIndentFold(
  state: EditorState,
  lineStart: number,
  lineEnd: number
): { from: number; to: number } | null {
  const doc = state.doc;
  const line = doc.lineAt(lineStart);

  if (!line.text.trim()) return null;

  const baseIndent = getIndent(line.text);
  let end = line.to;

  for (let pos = lineEnd + 1; pos <= doc.length; ) {
    const nextLine = doc.lineAt(pos);
    const text = nextLine.text;
    const indent = getIndent(text);

    if (text.trim() && indent <= baseIndent) break;

    if (text.trim() || indent > baseIndent) {
      end = nextLine.to;
    }

    pos = nextLine.to + 1;
  }

  return end > line.to ? { from: line.to, to: end } : null;
}

export const moonFolding = foldService.of((state, lineStart, lineEnd) =>
  moonIndentFold(state, lineStart, lineEnd)
);
