"use client";

import { useEffect, useRef, useState } from "react";
import type { Contributions } from "@/lib/github";
import { sfx } from "@/lib/sfx";
import { OPPOSITE, step, type Dir, type Snake } from "@/lib/snake";

const ROWS = 7;
const TICK_MS = 120;
const LEVEL_CLASS = ["bg-fg/[0.07]", "bg-accent/30", "bg-accent/55", "bg-accent/80", "bg-accent"];

const KEYS: Record<string, Dir> = {
  ArrowUp: "up", w: "up", ArrowDown: "down", s: "down",
  ArrowLeft: "left", a: "left", ArrowRight: "right", d: "right",
};

/**
 * Year of contributions as a dot-matrix (one column per week, Sunday on top).
 * Doubles as a Snake board: days with contributions are the food.
 */
export function ContributionGame({ total, days }: Contributions) {
  // Pad the first week so every column starts on a Sunday.
  const lead = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells = [...Array<null>(lead).fill(null), ...days];
  const cols = Math.ceil(cells.length / ROWS);

  const [game, setGame] = useState<Snake | null>(null);
  const dir = useRef<Dir>("right");
  const lastDir = useRef<Dir>("right");

  function start() {
    const mid = Math.floor(cols / 2) * ROWS + 3;
    const body = [mid, mid - ROWS, mid - 2 * ROWS];
    const food = new Map<number, number>();
    cells.forEach((day, i) => {
      if (day && day.level > 0 && !body.includes(i)) food.set(i, day.count);
    });
    dir.current = lastDir.current = "right";
    setGame({ body, food, score: 0, status: "playing" });
  }

  const playing = game?.status === "playing";
  const score = game?.score ?? 0;
  const status = game?.status;

  useEffect(() => {
    if (score > 0) sfx.play("coin");
  }, [score]);

  useEffect(() => {
    if (status === "over") sfx.play("over");
    if (status === "won") sfx.play("level");
  }, [status]);

  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setGame(null);
      const next = KEYS[e.key];
      if (!next) return;
      e.preventDefault();
      if (next !== OPPOSITE[lastDir.current]) dir.current = next;
    };
    const timer = setInterval(() => {
      const d = (lastDir.current = dir.current);
      setGame((g) => g && step(g, d, cols, ROWS));
    }, TICK_MS);
    window.addEventListener("keydown", onKey);
    return () => {
      clearInterval(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [playing, cols]);

  const snake = new Set(game?.body);
  const head = game?.body[0];

  return (
    <figure id="play" className="mt-20 scroll-mt-32 lg:mt-28">
      <figcaption className="label flex min-h-14 items-center justify-between gap-4 border-b border-line pb-4 text-muted">
        <span>
          <span className="text-fg">{total}</span> contributions / last 12 months
        </span>
        {game ? (
          <span className="flex items-center gap-4">
            <span aria-live="polite" className="font-dot text-xl font-black leading-none text-accent">
              {String(game.score).padStart(3, "0")}
            </span>
            {!playing && (
              <button type="button" onClick={start} aria-label="Play again" className="text-fg hover:text-accent">
                ↻
              </button>
            )}
          </span>
        ) : (
          <button
            type="button"
            onClick={start}
            aria-label="Play Snake on the contribution graph (arrow keys)"
            className="hidden h-10 items-center gap-2 border border-accent bg-accent px-4 text-bg transition-colors hover:border-fg hover:bg-fg md:flex"
          >
            ▶ Play
          </button>
        )}
      </figcaption>
      <div className="overflow-x-auto pt-6 [scrollbar-width:none]">
        <div
          role="img"
          aria-label={`Contribution calendar: ${total} contributions in the last year`}
          className={`grid w-max grid-flow-col grid-rows-7 gap-[3px] transition-opacity sm:gap-1 lg:w-full lg:justify-between ${
            game && !playing ? "opacity-50" : ""
          }`}
        >
          {Array.from({ length: cols * ROWS }, (_, i) => {
            const day = cells[i];
            let tone = day ? LEVEL_CLASS[day.level] : "";
            if (game) {
              tone =
                i === head
                  ? "bg-fg"
                  : snake.has(i)
                    ? "bg-fg/60"
                    : game.food.has(i)
                      ? LEVEL_CLASS[day?.level ?? 0]
                      : LEVEL_CLASS[0];
            }
            return (
              <span
                key={i}
                title={day && !game ? `${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}` : undefined}
                className={`size-2.5 rounded-full sm:size-3 ${game ? "" : "transition-transform duration-200 hover:scale-150"} ${tone}`}
              />
            );
          })}
        </div>
      </div>
    </figure>
  );
}
