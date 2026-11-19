/* ====================================================== */
/* ROUTE OPTIMIZER ENGINE                                 */
/* ====================================================== */
let optMap = null;
let optRouteLayer = null;

function initOptMap() {
    if (optMap) return;
    optMap = L.map('opt-map', { zoomControl: false }).setView([-23.555, -46.650], 12);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 16
    }).addTo(optMap);
    runOptimization();
}

function runOptimization(e) {
    if (e) e.preventDefault();

    const orig = document.getElementById('opt-hub').value.split(',').map(Number);
    const dest = document.getElementById('opt-dest').value.split(',').map(Number);
    const tf = parseFloat(document.getElementById('opt-traffic-slider').value);

    const dist = haversine(orig[0], orig[1], dest[0], dest[1]);
    const eta = Math.round((dist / 28) * 60 * tf);
    const co2 = (dist * 0.21).toFixed(2);

    document.getElementById('opt-res-dist').innerText = `${dist.toFixed(1)} km`;
    document.getElementById('opt-res-eta').innerText = `${eta} min`;
    document.getElementById('opt-res-co2').innerText = `${co2} kg`;

    if (optMap) {
        if (optRouteLayer) optMap.removeLayer(optRouteLayer);
        const pts = [
            [orig[0], orig[1]],
            [(orig[0] + dest[0]) / 2 + 0.004, (orig[1] + dest[1]) / 2 - 0.004],
            [dest[0], dest[1]]
        ];
        optRouteLayer = L.polyline(pts, { color: '#36a9e1', weight: 5, opacity: 0.9 }).addTo(optMap);
        optMap.fitBounds(optRouteLayer.getBounds(), { padding: [20, 20] });
    }

    showToast('Rota otimizada calculada!', 'info');
}

function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 1.3;
}
