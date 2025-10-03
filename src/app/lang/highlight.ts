import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

const colors = {
  keyword: "#B266FF",

  function: "#E28EDC",
  variable: "#4D90FF",

  type: "#FFB74D",

  boolean: "#57C28D",
  null: "#38BFA8",
  integer: "#FF5A3E",
  float: "#FF814F",
  string: "#8FD473",

  arithmetic: "#4FC3FF",
  compare: "#FF7CA1",
  logic: "#D83A5E",

  commentLine: "#4B515C",
  commentBlock: "#6C717C",

  invalid: "#FF3B5F",
  meta: "#595E7A",
};

export const moonDarkHighlight = HighlightStyle.define([
  // Keywords
  { tag: t.keyword, color: colors.keyword },

  // Built-ins
  // { tag: t.special(t.variableName), color: colors.builtin },

  // Types
  // { tag: t.typeName, color: colors.type },

  // Function identifiers
  { tag: t.tagName, color: colors.function },

  // Variables
  { tag: t.variableName, color: colors.variable },

  // // Operators
  { tag: t.arithmeticOperator, color: colors.arithmetic },
  { tag: t.compareOperator, color: colors.compare },
  { tag: t.logicOperator, color: colors.logic },

  // // Literals
  { tag: t.bool, color: colors.boolean },
  { tag: t.null, color: colors.null },
  { tag: t.string, color: colors.string },
  { tag: t.integer, color: colors.integer },
  { tag: t.float, color: colors.float },

  // Comments
  { tag: t.lineComment, color: colors.commentLine, fontStyle: "italic" },
  { tag: t.blockComment, color: colors.commentBlock, fontStyle: "italic" },

  // Errors
  { tag: t.invalid, color: colors.invalid, background: "#2B1D1D" },

  // Metadata / Indentation
  // { tag: t.meta, color: colors.meta },
]);

export const moonHighlightExtension = syntaxHighlighting(moonDarkHighlight);