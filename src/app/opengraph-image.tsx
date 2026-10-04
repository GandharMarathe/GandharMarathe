import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — Software developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 5×7 dot-matrix glyphs, drawn as dots so the image needs no font file.
const GLYPHS: Record<string, string[]> = {
  A: [".###.", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
  D: ["####.", "#...#", "#...#", "#...#", "#...#", "#...#", "####."],
  E: ["#####", "#....", "#....", "####.", "#....", "#....", "#####"],
  G: [".###.", "#...#", "#....", "#.###", "#...#", "#...#", ".###."],
  H: ["#...#", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
  M: ["#...#", "##.##", "#.#.#", "#.#.#", "#...#", "#...#", "#...#"],
  N: ["#...#", "##..#", "#.#.#", "#..##", "#...#", "#...#", "#...#"],
  R: ["####.", "#...#", "#...#", "####.", "#.#..", "#..#.", "#...#"],
  T: ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "..#.."],
};

const DOT = 15;
const GAP = 4;

function DotWord({ word, color }: { word: string; color: string }) {
  return (
    <div style={{ display: "flex", gap: DOT + GAP }}>
      {[...word].map((letter, li) => (
        <div key={li} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
          {GLYPHS[letter].map((row, ri) => (
            <div key={ri} style={{ display: "flex", gap: GAP }}>
              {[...row].map((cell, ci) => (
                <div
                  key={ci}
                  style={{
                    width: DOT,
                    height: DOT,
                    borderRadius: DOT,
                    background: cell === "#" ? color : "rgba(255,255,255,0.05)",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Image() {
  const [first, last] = site.name.toUpperCase().split(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#09090b",
          color: "#ecebe6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, letterSpacing: 4, color: "#8f8f98" }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: "#a78bfa" }} />
          PORTFOLIO / {site.education.toUpperCase()} — {site.location.toUpperCase()}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <DotWord word={first} color="#ecebe6" />
          <DotWord word={last} color="#a78bfa" />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", fontSize: 30, letterSpacing: -0.5 }}>
            I build software, products, and intelligent systems.
          </div>
          <div style={{ display: "flex", flexShrink: 0, fontSize: 20, letterSpacing: 3, color: "#8f8f98" }}>
            GITHUB.COM/{site.githubUser.toUpperCase()}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
