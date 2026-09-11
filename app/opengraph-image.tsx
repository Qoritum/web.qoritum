import { ImageResponse } from "next/og"

export const alt = "Qoritum — Tecnología que mejora tu operación"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background: "#181725",
        color: "#fff9f2",
        padding: "64px 72px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", fontSize: 42, letterSpacing: "-2px" }}>
          qoritum<span style={{ color: "#fd901d" }}>.</span>
        </div>
        <div style={{ fontSize: 20, color: "#b5b2bf" }}>
          SOFTWARE · AUTOMATIZACIÓN · IA
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 76, lineHeight: 1.08, maxWidth: 950 }}>
          Tecnología que mejora tu operación.
        </div>
        <div style={{ fontSize: 28, color: "#b5b2bf" }}>
          Entendemos primero. Digitalizamos después.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          color: "#fd901d",
          fontSize: 24,
        }}
      >
        <div style={{ width: 56, height: 3, background: "#fd901d" }} />
        Una primera mejora medible.
      </div>
    </div>,
    size
  )
}
