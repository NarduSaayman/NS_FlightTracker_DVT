// Leaflet map setup
const map = L.map(`map`).setView([0, 0], 3);

L.tileLayer(
  `https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=oU2G7Jcu16TVkU41lY2b9OYNvr12IhqiK1SPVkM349tunMkQkA3eSR1CCUPiyEIn`,
  {
    attribution: `&copy; <a href="https://www.jawg.io/">JAWG</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`,
    maxZoom: 22,
  }
).addTo(map);