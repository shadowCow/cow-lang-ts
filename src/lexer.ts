import { adt, assertNever } from "@cow-sunday/fp-ts";
import { astLeaf, AstLeaf } from "./ast";
import { ChStream } from "./stream";

export type Lexer<L> = {
  getState(): number;
  lex(): AstLeaf<L>;
};

export function createLexer<L>(chStream: ChStream, dfa: Dfa<L>): Lexer<L> {
  let state = 0;

  const lexer: Lexer<L> = {
    getState: function (): number {
      return state;
    },
    lex: function (): AstLeaf<L> {
      let startPos = chStream.getPosition();
      let acc = "";

      while (!chStream.isEof()) {
        const ch = chStream.peek();

        let transition = dfa.states[state].transitions[ch];
        if (transition === undefined) {
          transition = dfa.states[state].fallback;
        }

        switch (transition.kind) {
          case acceptAndContinue.kind:
            acc += ch;
            state = transition.value.nextState;
            chStream.eat();
            continue;
          case acceptWithError.kind:
            acc += ch;
            state = transition.value.nextState;
            chStream.eat();
            continue;
          case acceptAndComplete.kind:
            acc += ch;
            return astLeaf(dfa.states[state].nodeType, acc);
          case rejectAndComplete.kind:
            return astLeaf(dfa.states[state].nodeType, acc);
          default:
            assertNever(transition);
        }
      }

      return astLeaf(dfa.states[state].nodeType, acc);
    },
  };

  return lexer;
}

export type Dfa<L> = {
  states: Array<DfaState<L>>;
};

export type DfaState<L> = {
  nodeType: L;
  transitions: DfaTransitions;
  fallback: DfaTransition;
};

export type DfaTransitions = {
  [char: string]: DfaTransition;
};

export type DfaTransition =
  | AcceptAndContinue
  | AcceptAndComplete
  | AcceptWithError
  | RejectAndComplete;

export type NextState = {
  nextState: number;
};

export const acceptAndContinue = adt<"AcceptAndContinue", NextState>(
  "AcceptAndContinue"
);
export type AcceptAndContinue = ReturnType<typeof acceptAndContinue>;

export const acceptWithError = adt<"AcceptWithError", NextState>(
  "AcceptWithError"
);
export type AcceptWithError = ReturnType<typeof acceptWithError>;

export const acceptAndComplete = adt<"AcceptAndComplete", void>(
  "AcceptAndComplete"
);
export type AcceptAndComplete = ReturnType<typeof acceptAndComplete>;

export const rejectAndComplete = adt<"RejectAndComplete", void>(
  "RejectAndComplete"
);
export type RejectAndComplete = ReturnType<typeof rejectAndComplete>;
