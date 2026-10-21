// Run: node src/lib/snake.check.ts
import assert from "node:assert/strict";
import { step, type Snake } from "./snake.ts";

const rows = 7;
const cols = 4;
const at = (col: number, row: number) => col * rows + row;
const base: Snake = { body: [at(1, 0), at(0, 0)], food: new Map(), score: 0, status: "playing" };

// Moves and drops the tail.
assert.deepEqual(step(base, "right", cols, rows).body, [at(2, 0), at(1, 0)]);
// Wraps at the edges.
assert.deepEqual(step(base, "up", cols, rows).body, [at(1, 6), at(1, 0)]);
assert.equal(step({ ...base, body: [at(3, 0)] }, "right", cols, rows).body[0], at(0, 0));
// Eats: grows, scores, and wins when the last food is gone.
const ate = step({ ...base, food: new Map([[at(2, 0), 5]]) }, "right", cols, rows);
assert.equal(ate.body.length, 3);
assert.equal(ate.score, 5);
assert.equal(ate.status, "won");
// Hitting itself ends the game; moving into the cell the tail leaves does not.
const loop = [at(1, 1), at(1, 0), at(2, 0), at(2, 1)];
assert.equal(step({ ...base, body: loop }, "up", cols, rows).status, "over");
assert.equal(step({ ...base, body: loop }, "right", cols, rows).status, "playing");

console.log("snake ok");
