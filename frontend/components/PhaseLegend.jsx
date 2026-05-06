"use client";

export default function PhaseLegend() {
  return (
<div
  style={{
    position: "fixed",
    top: "10px",
    right: "10px",
    width: "80px",           // ↓ smaller container
    textAlign: "center",
    fontSize: "10px",        // ↓ smaller text
    color: "white",
    zIndex: 20,
    pointerEvents: "none",
    opacity: 0.8,
  }}
>
  <div
    style={{
      width: "60px",         // ↓ smaller circle
      height: "60px",
      borderRadius: "50%",
      margin: "auto",
      background:
        "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)",
    }}
  />

  <div style={{ marginTop: "4px" }}>Phase</div>

  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <span>-π</span>
    <span>π</span>
  </div>
</div>
  );
}