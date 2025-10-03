import { foldService } from "@codemirror/language";
import { EditorState } from "@codemirror/state";

const getIndent = (line: string) =>
  line.match(/^[\t ]*/)?.[0].replace(/\t/g, "    ").length ?? 0;

function findMatchingParen(
  doc: EditorState["doc"],
  startPos: number
): number | null {
  let depth = 0;
  for (let pos = startPos; pos < doc.length; pos++) {
    const char = doc.sliceString(pos, pos + 1);
    if (char === "(") depth++;
    if (char === ")") {
      depth--;
      if (depth === 0) return pos + 1;
    }
  }
  return null;
}

function isInsideComment(doc: EditorState["doc"], lineStart: number): boolean {
  let depth = 0;
  for (let i = 0; i <= lineStart; i++) {
    const char = doc.sliceString(i, i + 1);
    if (char === "(") depth++;
    if (char === ")") depth--;
  }
  return depth > 0;
}

function moonFold(
  state: EditorState,
  lineStart: number,
  lineEnd: number
): { from: number; to: number } | null {
  const doc = state.doc;
  const line = doc.lineAt(lineStart);
  const text = line.text.trim();

  // Comments
  if (text.startsWith("(")) {
    const startPos = line.from + line.text.indexOf("(");
    const endPos = findMatchingParen(doc, startPos);
    if (endPos) {
      const startLineNum = doc.lineAt(startPos).number;
      const endLineNum = doc.lineAt(endPos).number;
      if (startLineNum < endLineNum) return { from: startPos, to: endPos };
    }
  }

  if (isInsideComment(doc, line.from) || !text) return null;

  // Indents
  const baseIndent = getIndent(line.text);
  let end = line.to;

  for (let pos = lineEnd + 1; pos <= doc.length; ) {
    const nextLine = doc.lineAt(pos);
    const nextIndent = getIndent(nextLine.text);
    const nextText = nextLine.text.trim();

    if (nextText && nextIndent <= baseIndent) break;
    if (nextText || nextIndent > baseIndent) end = nextLine.to;

    pos = nextLine.to + 1;
  }

  return end > line.to ? { from: line.to, to: end } : null;
}

export const moonFolding = foldService.of(moonFold);
