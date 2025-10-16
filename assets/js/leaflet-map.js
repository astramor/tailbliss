import L from "leaflet";

// Marker-Icons (wie bei dir gelöst, z. B. via imagePath)
L.Icon.Default.imagePath = "/css/images/";

function cleanUrl(u) {
  if (!u) return "";
  return String(u).replace(/&quot;/g, "").replace(/^['"]|['"]$/g, "");
}

export function initLeafletMap(el, {
  lat = 48.2704,
  lng = 10.9833,
  zoom = 14,
  text = "Hier sind wir!",
  tileUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  maxZoom = 19,
  attribution = "© OpenStreetMap-Mitwirkende"
} = {}) {
  if (!el) return;

  const url = cleanUrl(tileUrl);
  const map = L.map(el).setView([lat, lng], zoom);

  L.tileLayer(url, { maxZoom, crossOrigin: true, attribution }).addTo(map);

  const m = L.marker([lat, lng]).addTo(map);
  if (text) m.bindPopup(text);

  requestAnimationFrame(() => map.invalidateSize(true));
  setTimeout(() => map.invalidateSize(true), 120);

  return map;
}

// Auto-Init nur für Elemente mit data-Attributen (ohne Consent)
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-leaflet-map]").forEach((el) => {
    const lat  = parseFloat(el.dataset.lat);
    const lng  = parseFloat(el.dataset.lng);
    const zoom = parseInt(el.dataset.zoom || "14", 10);
    const text = el.dataset.text || "";
    const tile = cleanUrl(el.dataset.tileurl || "https://tile.openstreetmap.org/{z}/{x}/{y}.png");
    initLeafletMap(el, { lat, lng, zoom, text, tileUrl: tile });
  });
});

