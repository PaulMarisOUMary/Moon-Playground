import { EditorView } from "codemirror";

const colors = {
  baseText: "#E0E0E0",
  background: "#151521",
  caret: "#FFCB6B",
  selection: "rgba(130, 170, 255, 0.25)",
  gutter: "#1B1B2F",
  gutterText: "#7074A0",
  activeLine: "rgba(90, 60, 150, 0.10)",
  lineNumbersBg: "#1A192F",
  panelBg: "#1F1F3A",
  tooltipBorder: "#4B4E63",
  foldPlaceholder: "#7074A0",
  accent: "rgba(200, 130, 255, 0.8)",
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
      boxShadow: `inset 1px 0 0 0 ${colors.accent}`,
    },

    ".cm-matchingBracket": {
      outline: `1px solid ${colors.caret}`,
      backgroundColor: colors.selection,
      borderRadius: "2px",
    },

    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      color: colors.foldPlaceholder,
      fontStyle: "italic",
      border: `1px dashed ${colors.gutterText}`,
      padding: "0 4px",
      margin: "0 4px",
      borderRadius: "4px",
      opacity: 0.8,
    },

    ".cm-lineNumbers": {
      color: colors.gutterText,
      backgroundColor: colors.lineNumbersBg,
    },

    ".cm-gutters": {
      color: colors.gutterText,
      backgroundColor: colors.gutter,
      border: "none",
    },

    // Not used
    ".cm-panels": {
      backgroundColor: colors.panelBg,
      color: colors.baseText,
      borderTop: `1px solid ${colors.gutterText}`,
    },
    ".cm-tooltip": {
      border: `1px solid ${colors.tooltipBorder}`,
      backgroundColor: colors.panelBg,
      color: colors.baseText,
    },
  },
  { dark: true }
);
