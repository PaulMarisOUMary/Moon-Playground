import { StreamLanguage } from "@codemirror/language";

import { escapeRegex } from "@/app/lang/utils";

const reserved_keywords = [
  ["action", "ACTION", "✅"],
  // ["and", "AND", "✅"],
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
  // ["is", "IS", "✅"],
  // ["isnt", "ISNT", "✅"],
  ["lambda", "LAMBDA", "❌"],
  ["list", "LIST", "✅"],
  // ["null", "NULL", "✅"],
  // ["not", "NOT", "✅"],
  ["nothing", "NOTHING", "❌"],
  // ["or", "OR", "✅"],
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

const arithmeticOps = ["**", "+", "-", "*", "/", "%"];
const comparisonOpsSymbols = ["<=", ">=", "<", ">"];
const comparisonOpsWords = ["is", "isnt"];
const logicalOps = ["and", "or", "not"];

const arithmeticRegex = new RegExp(
  `(${arithmeticOps.map(escapeRegex).join("|")})`
);

const comparisonRegex = new RegExp(
  `(${comparisonOpsSymbols
    .map(escapeRegex)
    .join("|")})|\\b(${comparisonOpsWords.join("|")})\\b`
);

const logicalRegex = new RegExp(`\\b(${logicalOps.join("|")})\\b`);

const keywords = reserved_keywords
  .filter(([_, __, mark]) => mark === "✅")
  .map(([word]) => word);

export const moonLanguage = StreamLanguage.define({
  startState() {
    return {
      inComment: false,
      expectFunctionName: false,
      functions: new Set<string>(),
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
      return "bool";
    }

    // Null literals
    // r"\b(null)"
    if (stream.match(/\b(null)\b/)) {
      return "null";
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
      return "integer";
    }

    // Keywords
    const keywordMatch = stream.match(
      new RegExp(`\\b(${keywords.join("|")})\\b`)
    );
    if (keywordMatch) {
      if (Array.isArray(keywordMatch) && keywordMatch[0] === "action") {
        state.expectFunctionName = true;
      }
      return "keyword";
    }

    // Identifiers
    // r"[a-zA-Z_][a-zA-Z_0-9]*|[\U0000231A-\U0001FAF8]"
    const identifierMatch = stream.match(/^[a-zA-Z_][a-zA-Z_0-9]*|\p{Emoji}/u);
    if (identifierMatch) {
      const name = Array.isArray(identifierMatch)
        ? identifierMatch[0]
        : stream.current();

      if (state.expectFunctionName) {
        state.functions.add(name);
        state.expectFunctionName = false;
        return "tagName";
      }

      if (state.functions.has(name)) {
        return "tagName";
      }

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
