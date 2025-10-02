import { EditorView } from "codemirror";

const colors = {
  baseText: "#E0E0E0",
  background: "#161623",
  caret: "#FFCB6B",
  selection: "rgba(255, 203, 107, 0.25)",
  gutter: "#1A192F",
  gutterText: "#7A7D9C",
  activeLine: "#1F1F3A",
  matchingBracketBg: "rgba(255, 203, 107, 0.2)",
  lineNumbersBg: "#1A192F",
  panelBg: "#1F1F3A",
  tooltipBorder: "#4B4E63",
  foldPlaceholder: "#7A7D9C",
};

export const moonTheme = EditorView.theme(
  {
    "&": {
      color: colors.baseText,
      backgroundColor: colors.background,
      fontFamily: "Fira Code, monospace",
      fontSize: "18px",
      lineHeight: "1.5",
      height: "100%",
    },
    ".cm-content": {
      caretColor: colors.caret,
    },
    ".cm-cursor, .cm-dropCursor": {
      borderLeft: `2px solid ${colors.caret}`,
    },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
      {
        backgroundColor: colors.selection,
      },
    ".cm-activeLine": {
      backgroundColor: colors.activeLine,
    },
    ".cm-matchingBracket": {
      outline: `1px solid ${colors.caret}`,
      backgroundColor: colors.matchingBracketBg,
    },
    ".cm-panels": {
      backgroundColor: colors.panelBg,
      color: colors.baseText,
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      color: colors.foldPlaceholder,
      fontStyle: "italic",
    },
    ".cm-tooltip": {
      border: `1px solid ${colors.tooltipBorder}`,
      backgroundColor: colors.panelBg,
      color: colors.baseText,
    },
    ".cm-lineNumbers": {
      color: colors.gutterText,
      backgroundColor: colors.lineNumbersBg,
    },
    ".cm-gutters": {
      backgroundColor: colors.gutter,
      color: colors.gutterText,
      border: "none",
    },
  },
  { dark: true }
);