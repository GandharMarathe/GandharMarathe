/** Snake on a column-major grid (index = col * rows + row) that wraps at the edges. */

export type Dir = "up" | "down" | "left" | "right";

export type Snake = {
  /** Cell indices, head first. */
  body: number[];
  /** Cell index → points still to eat. */
  food: Map<number, number>;
  score: number;
  status: "playing" | "over" | "won";
};

export const OPPOSITE: Record<Dir, Dir> = { up: "down", down: "up", left: "right", right: "left" };

export function step(game: Snake, dir: Dir, cols: number, rows: number): Snake {
  if (game.status !== "playing") return game;
  const head = game.body[0];
  let col = Math.floor(head / rows);
  let row = head % rows;
  if (dir === "up") row = (row - 1 + rows) % rows;
  if (dir === "down") row = (row + 1) % rows;
  if (dir === "left") col = (col - 1 + cols) % cols;
  if (dir === "right") col = (col + 1) % cols;
  const next = col * rows + row;

  const points = game.food.get(next);
  // The tail moves out of the way unless the snake is growing this tick.
  const body = points === undefined ? game.body.slice(0, -1) : game.body;
  if (body.includes(next)) return { ...game, status: "over" };

  if (points === undefined) return { ...game, body: [next, ...body] };
  const food = new Map(game.food);
  food.delete(next);
  return {
    body: [next, ...body],
    food,
    score: game.score + points,
    status: food.size === 0 ? "won" : "playing",
  };
}
