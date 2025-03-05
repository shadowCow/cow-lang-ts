import { adt } from "@cow-sunday/fp-ts";

export const concatenation = adt<
  "concatenation",
  {
    symbols: Array<string>;
  }
>("concatenation");
export type Concatenation = typeof concatenation;

export const alternation = adt<
  "alternation",
  {
    symbols: Array<string>;
  }
>("alternation");
export type Alternation = typeof alternation;

export const optional = adt<
  "optional",
  {
    symbol: string;
  }
>("optional");
export type Optional = typeof optional;

export const repetition = adt<"repetition", {}>("repetition");
export type Repetition = typeof repetition;
