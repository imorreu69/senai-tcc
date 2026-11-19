/* ====================================================== */
/* LEAFLET LIVE MAP & TELEMETRY ENGINE                    */
/* ====================================================== */
let liveMap = null;
let liveTileLayer = null;

const vehicles = [
    { id: 'EV-101', name: 'E-Transit Van 1', lat: -23.5505, lng: -46.6333, battery: 92, speed: 42 },
    { id: 'EV-102', name: 'Cargo E-Bike 4', lat: -23.5615, lng: -46.6558, battery: 74, speed: 22 },
    { id: 'EV-103', name: 'E-Transit Van 3', lat: -23.5895, lng: -46.6812, battery: 65, speed: 38 }
];

const hubs = [
    { name: 'Hub Central - Sé', lat: -23.55052, lng: -46.633308 },
    { name: 'Hub Sul - Vila Mariana', lat: -23.57000, lng: -46.645000 },
    { name: 'Hub Oeste - Lapa', lat: -23.52000, lng: -46.680000 }
];

function initLiveMap() {
    if (liveMap) return;
    liveMap = L.map('live-map', { zoomControl: true }).setView([-23.555, -46.650], 13);
    updateMapTiles();

    // Renderizar Hubs
    hubs.forEach(h => {
        const icon = L.divIcon({
            html: `<div style="background-color:#36a9e1; width:18px; height:18px; border-radius:50%; border:3px solid #fff; box-shadow:0 0 10px #36a9e1;"></div>`,
            iconSize: [18, 18]
        });
        L.marker([h.lat, h.lng], { icon }).addTo(liveMap).bindPopup(`<strong>${h.name}</strong>`);
    });

    // Renderizar Veículos em Movimento
    vehicles.forEach(v => {
        const icon = L.divIcon({
            html: `<div style="background-color:#ff931e; color:#fff; font-size:10px; width:24px; height:24px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid #fff; box-shadow:0 0 10px #ff931e;"><i class="fa-solid fa-truck"></i></div>`,
            iconSize: [24, 24]
        });
        const m = L.marker([v.lat, v.lng], { icon }).addTo(liveMap);
        m.bindPopup(`<strong>${v.name}</strong><br>Bateria: ${v.battery}%`);
        v.marker = m;
    });
}

function updateMapTiles() {
    if (!liveMap) return;
    if (liveTileLayer) liveMap.removeLayer(liveTileLayer);

    const isDark = document.documentElement.classList.contains('dark');
    const tileUrl = isDark
        ? 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'
        : 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';

    liveTileLayer = L.tileLayer(tileUrl, {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 16
    }).addTo(liveMap);
}

function recenterLiveMap() {
    if (liveMap) liveMap.setView([-23.555, -46.650], 13);
}

function startTelemetry() {
    setInterval(() => {
        vehicles.forEach(v => {
            v.lat += (Math.random() - 0.5) * 0.001;
            v.lng += (Math.random() - 0.5) * 0.001;
            if (v.marker) v.marker.setLatLng([v.lat, v.lng]);
        });
    }, 3000);
}
