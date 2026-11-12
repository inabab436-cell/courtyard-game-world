import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moonlit Courtyard — Interactive World" },
      {
        name: "description",
        content: "An empty moonlit courtyard, ready to become an interactive world.",
      },
      { property: "og:title", content: "Moonlit Courtyard — Interactive World" },
      {
        property: "og:description",
        content: "An empty moonlit courtyard, ready to become an interactive world.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CourtyardPage,
});

function CourtyardPage() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let game: import("phaser").Game | undefined;

    void import("../game/CourtyardScene")
      .then(({ createCourtyardGame }) => {
        if (!cancelled && mountRef.current) {
          game = createCourtyardGame(mountRef.current);
        }
      })
      .catch((error: unknown) => {
        console.error("Unable to load the courtyard scene.", error);
      });

    return () => {
      cancelled = true;
      game?.destroy(true);
    };
  }, []);

  return (
    <main className="courtyard-page" aria-label="Moonlit courtyard">
      <div className="courtyard-game" ref={mountRef} aria-label="Empty courtyard scene" />
    </main>
  );
}