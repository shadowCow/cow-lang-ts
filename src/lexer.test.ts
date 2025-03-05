import { suite, test } from "node:test";
import assert from "node:assert";
import { astLeaf } from "./ast";
import {
  acceptAndComplete,
  acceptAndContinue,
  createLexer,
  Dfa,
  rejectAndComplete,
} from "./lexer";
import { createChStream } from "./stream";

suite("lexer", () => {
  test("createLexer", () => {
    const stream = createChStream("hello");
    const dfa = createTestDfa();
    const lexer = createLexer(stream, dfa);

    assert.deepStrictEqual(stream.getPosition(), 0);
    assert.deepStrictEqual(lexer.getState(), 0);
  });

  test("lexes", () => {
    const stream = createChStream("hello");
    const dfa = createTestDfa();
    const lexer = createLexer(stream, dfa);

    const actualLeaf = lexer.lex();

    const expectedLeaf = astLeaf<TestLeafTypes>("word", "hello");
    assert.deepStrictEqual(actualLeaf, expectedLeaf);
    assert.deepStrictEqual(stream.getPosition(), 5);
    assert.deepStrictEqual(lexer.getState(), 0);
  });
});

type TestLeafTypes = "word" | "int";

function createTestDfa(): Dfa<TestLeafTypes> {
  return {
    states: [
      {
        nodeType: "word",
        transitions: {
          " ": rejectAndComplete(),
          "\t": rejectAndComplete(),
          "\n": rejectAndComplete(),
          "\r": rejectAndComplete(),
        },
        fallback: acceptAndContinue({ nextState: 0 }),
      },
      {
        nodeType: "int",
        transitions: {
          " ": rejectAndComplete(),
          "\t": rejectAndComplete(),
          "\n": rejectAndComplete(),
          "\r": rejectAndComplete(),
          "1": acceptAndContinue({ nextState: 1 }),
          "2": acceptAndContinue({ nextState: 1 }),
          "3": acceptAndContinue({ nextState: 1 }),
          "4": acceptAndContinue({ nextState: 1 }),
          "5": acceptAndContinue({ nextState: 1 }),
          "6": acceptAndContinue({ nextState: 1 }),
          "7": acceptAndContinue({ nextState: 1 }),
          "8": acceptAndContinue({ nextState: 1 }),
          "9": acceptAndContinue({ nextState: 1 }),
          "0": acceptAndContinue({ nextState: 1 }),
        },
        fallback: acceptAndContinue({ nextState: 0 }),
      },
    ],
  };
}
