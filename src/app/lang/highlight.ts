import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

const colors = {
  keyword: "#C792EA",
  builtin: "#F78C6C",
  type: "#FFCB6B",
  operator: "#89DDFF",
  compare: "#82AAFF",
  logic: "#E77294",
  boolean: "#FF9CAC",
  string: "#C3E88D",
  number: "#F78C6C",
  variable: "#82AAFF",
  function: "#82AAFF",
  class: "#FFCB6B",
  commentLine: "#5C6370",
  commentBlock: "#7F848E",
  invalid: "#FF5370",
  meta: "#676E95",
};

export const moonDarkHighlight = HighlightStyle.define([
  // Keywords
  { tag: t.keyword, color: colors.keyword },

  // Built-ins
  { tag: t.special(t.variableName), color: colors.builtin },

  // Types
  { tag: t.typeName, color: colors.type },

  // Class & Function identifiers
  { tag: t.className, color: colors.class, fontWeight: "bold" },
  { tag: t.function(t.variableName), color: colors.function, fontWeight: "bold" },

  // Variables
  { tag: t.variableName, color: colors.variable },

  // Operators
  { tag: t.operator, color: colors.operator },
  { tag: t.compareOperator, color: colors.compare },
  { tag: t.logicOperator, color: colors.logic },

  // Literals
  { tag: t.atom, color: colors.boolean },
  { tag: t.string, color: colors.string },
  { tag: t.number, color: colors.number },
  { tag: t.float, color: colors.number },

  // Comments
  { tag: t.lineComment, color: colors.commentLine, fontStyle: "italic" },
  { tag: t.blockComment, color: colors.commentBlock, fontStyle: "italic" },

  // Errors
  { tag: t.invalid, color: colors.invalid, background: "#2B1D1D" },

  // Metadata / Indentation
  { tag: t.meta, color: colors.meta },
]);

export const moonHighlightExtension = syntaxHighlighting(moonDarkHighlight);