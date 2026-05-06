"use client";

import { useEffect, useRef } from "react";

export default function QSphereLabels() {
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    let frameId;

    const update = () => {
      const data = window.__qsphere_positions;

      if (data) {
        const { top, bottom } = data;

        if (top && topRef.current) {
          topRef.current.style.transform = `translate(${top.x}px, ${top.y}px)`;
          topRef.current.style.opacity = top.visible ? "0.5" : "0.15";
        }

        if (bottom && bottomRef.current) {
          bottomRef.current.style.transform = `translate(${bottom.x}px, ${bottom.y}px)`;
          bottomRef.current.style.opacity = bottom.visible ? "0.5" : "0.15";
        }
      }

      frameId = requestAnimationFrame(update);
    };

    update();

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <>
      <div
        ref={topRef}
        style={{
          position: "fixed",
          color: "white",
          fontSize: "13px",
          pointerEvents: "none",
          zIndex: 20,
        }}
      >
        |000⟩
      </div>

      <div
        ref={bottomRef}
        style={{
          position: "fixed",
          color: "white",
          fontSize: "13px",
          pointerEvents: "none",
          zIndex: 20,
        }}
      >
        |111⟩
      </div>
    </>
  );
}