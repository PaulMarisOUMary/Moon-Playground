import { StreamLanguage } from "@codemirror/language";

import { escapeRegex } from "@/app/lang/utils";

const reserved_keywords = [
  ["action", "ACTION", "✅"],
  ["and", "AND", "✅"],
  ["as", "AS", "✅"],
  ["ask", "ASK", "✅"],
  ["assert", "ASSERT", "❌"],
  ["async", "ASYNC", "❌"],
  ["await", "AWAIT", "❌"],
  ["call", "CALL", "✅"],
  ["default", "DEFAULT", "❌"],
  ["dict", "DICT", "✅"],
  ["elif", "ELIF", "❌"],
  ["else", "ELSE", "✅"],
  ["end", "END", "❌"],
  // ["false",    "BOOLEAN",  '✅'],
  ["fail", "FAIL", "✅"],
  ["from", "FROM", "✅"],
  ["for", "FOR", "❌"],
  ["global", "GLOBAL", "❌"],
  ["has", "HAS", "✅"],
  ["if", "IF", "✅"],
  ["in", "IN", "❌"],
  ["is", "IS", "✅"],
  ["isnt", "ISNT", "✅"],
  ["lambda", "LAMBDA", "❌"],
  ["list", "LIST", "✅"],
  ["null", "NULL", "✅"],
  ["not", "NOT", "✅"],
  ["nothing", "NOTHING", "❌"],
  ["or", "OR", "✅"],
  ["pass", "PASS", "❌"],
  ["print", "PRINT", "✅"],
  ["raise", "RAISE", "✅"],
  ["result", "RESULT", "✅"],
  ["test", "TEST", "✅"],
  ["thing", "THING", "✅"],
  // ["true",     "BOOLEAN",  '✅'],
  ["use", "USE", "✅"],
  ["skip", "SKIP", "✅"],
  ["stop", "STOP", "✅"],
  ["while", "WHILE", "✅"],
  ["yield", "YIELD", "❌"],
];

const arithmeticOps = ["+", "-", "*", "/", "%", "**"];
const comparisonOps = ["<=", ">=", "<", ">"];
const logicalOps = ["and", "or", "not", "is", "isnt"];

const arithmeticRegex = new RegExp(
  `(${arithmeticOps.map(escapeRegex).join("|")})`
);
const comparisonRegex = new RegExp(
  `(${comparisonOps.map(escapeRegex).join("|")})`
);
const logicalRegex = new RegExp(`\\b(${logicalOps.join("|")})\\b`);

const keywords = reserved_keywords
  .filter(([key, _, mark]) => mark === "✅" && !logicalOps.includes(key))
  .map(([word]) => word);

export const moonLanguage = StreamLanguage.define({
  startState() {
    return {
      inComment: false,
    };
  },
  token(stream, state) {
    if (state.inComment) {
      if (stream.skipTo(")")) {
        stream.next();
        state.inComment = false;
      } else {
        stream.skipToEnd();
      }
      return "blockComment";
    }

    if (stream.eatSpace()) return null;

    // Single-line comment
    // r"\#[^\n]*(\n)*"
    if (stream.match(/^#.*/)) return "lineComment";

    // Block comment
    // r"\([\s\S]*?\)"
    if (stream.match(/^\(/)) {
      state.inComment = true;
      return "blockComment";
    }

    // Operators
    if (stream.match(arithmeticRegex)) return "arithmeticOperator";
    if (stream.match(comparisonRegex)) return "compareOperator";
    if (stream.match(logicalRegex)) return "logicOperator";

    // Boolean literals
    // r"\b(true|false)"
    if (stream.match(/\b(true|false)\b/)) {
      return "atom";
    }

    // String literals
    // r'"(\\.|[^"\\])*"|\'(\\.|[^\'\\])*\''
    if (stream.match(/"(\\.|[^"\\])*"/) || stream.match(/'(\\.|[^'\\])*'/)) {
      return "string";
    }

    // Float literals
    // r"[+-]?(?!0[0-9])[0-9]*[.][0-9]*\b"
    if (stream.match(/[+-]?(?!0[0-9])[0-9]*[.][0-9]*\b/)) {
      return "float";
    }

    // Integer literals
    // r"[+-]?(?!0[0-9])[0-9]+\b"
    if (stream.match(/[+-]?(?!0[0-9])[0-9]+\b/)) {
      return "number";
    }

    // Keywords
    if (stream.match(new RegExp(`\\b(${keywords.join("|")})\\b`))) {
      return "keyword";
    }

    // Identifiers
    // r"[a-zA-Z_][a-zA-Z_0-9]*|[\U0000231A-\U0001FAF8]"
    if (stream.match(/^[a-zA-Z_][a-zA-Z_0-9]*|\p{Emoji}/u)) {
      return "variableName";
    }

    // Tabulation
    // r'\t'
    if (stream.match(/^\t+/)) {
      return null;
    }

    // Newline
    // r"\n+"
    if (stream.match(/^\n+/)) {
      return null;
    }

    stream.next();
    return "invalid";
  },
});
