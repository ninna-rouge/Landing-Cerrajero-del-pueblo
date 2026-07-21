const fs = require("fs")
const path = require("path")

const UA = "CerrajeroDelPuebloLanding/1.0 (cobertura map)"
const ROOT = path.join(__dirname, "..")

async function fetchBoundary(q) {
  const url =
    "https://nominatim.openstreetmap.org/search?" +
    new URLSearchParams({
      q,
      format: "json",
      polygon_geojson: "1",
      limit: "5",
      countrycodes: "cl",
      "accept-language": "es",
    })
  const res = await fetch(url, { headers: { "User-Agent": UA } })
  if (!res.ok) throw new Error(`${res.status} ${q}`)
  const data = await res.json()
  const match = data.find(
    (item) =>
      item.class === "boundary" &&
      item.type === "administrative" &&
      (item.geojson?.type === "Polygon" || item.geojson?.type === "MultiPolygon")
  )
  if (!match) throw new Error(`No admin polygon for ${q}`)
  return match
}

async function main() {
  const pa = await fetchBoundary("Puente Alto, Región Metropolitana, Chile")
  await new Promise((r) => setTimeout(r, 1100))
  const lf = await fetchBoundary("La Florida, Región Metropolitana, Chile")

  const features = [
    {
      type: "Feature",
      properties: { name: "Puente Alto", primary: true },
      geometry: pa.geojson,
    },
    {
      type: "Feature",
      properties: { name: "La Florida", primary: true },
      geometry: lf.geojson,
    },
  ]

  const outDir = path.join(ROOT, "assets", "data")
  fs.mkdirSync(outDir, { recursive: true })
  const outFile = path.join(outDir, "cobertura-comunas.geojson")
  fs.writeFileSync(outFile, JSON.stringify({ type: "FeatureCollection", features }))
  console.log(
    "OK",
    features.map((f) => `${f.properties.name}:${f.geometry.type}`).join(", "),
    fs.statSync(outFile).size,
    "bytes"
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
