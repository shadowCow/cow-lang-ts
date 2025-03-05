import { suite, test } from "node:test";
import assert from "node:assert";
import { createChStream } from "./stream";

suite("stream", () => {
  test("createStream", () => {
    const stream = createChStream("hello");

    assert.strictEqual(0, stream.getPosition());
  });

  test("peek", () => {
    const stream = createChStream("hello");

    const ch = stream.peek();

    assert.strictEqual(ch, "h");
    assert.strictEqual(0, stream.getPosition());
  });

  test("eat", () => {
    const stream = createChStream("world");

    const ch = stream.eat();

    assert.strictEqual(ch, "w");
    assert.strictEqual(1, stream.getPosition());
  });

  test("eof", () => {
    const stream = createChStream("");

    assert.strictEqual(stream.isEof(), true);
  });

  test("eat at eof", () => {
    const stream = createChStream("");

    const ch = stream.eat();

    assert.strictEqual(ch, "");
    assert.strictEqual(stream.isEof(), true);
  });
});
