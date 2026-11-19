/* ====================================================== */
/* URBAN SCENARIO SIMULATOR ENGINE                        */
/* ====================================================== */
let simChart = null;
let currWeather = 'clear';

function setWeather(w) {
    currWeather = w;
    document.querySelectorAll('.weather-btn').forEach(b => {
        b.classList.remove('bg-[#36a9e1]', 'text-white');
        b.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
    });
    const active = document.getElementById(`weather-${w}`);
    if (active) {
        active.classList.add('bg-[#36a9e1]', 'text-white');
        active.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
    }
    runSimulation();
}

function runSimulation() {
    const traffic = parseInt(document.getElementById('sim-traffic').value);
    const fleet = parseInt(document.getElementById('sim-fleet').value);
    const orders = parseInt(document.getElementById('sim-orders').value);

    document.getElementById('sim-val-traffic').innerText = `${traffic}%`;
    document.getElementById('sim-val-fleet').innerText = `${fleet} Veículos`;
    document.getElementById('sim-val-orders').innerText = `${orders}`;

    const weatherMult = currWeather === 'rain' ? 1.25 : (currWeather === 'storm' ? 1.6 : 1.0);
    const sla = Math.max(65, Math.min(99.4, 100 - (traffic * 0.2) - (weatherMult * 6) + (fleet * 0.2))).toFixed(1);
    const delay = ((traffic * 0.08) * weatherMult).toFixed(1);

    document.getElementById('sim-res-sla').innerText = `${sla}%`;
    document.getElementById('sim-res-delay').innerText = `+${delay} min`;

    if (simChart) {
        simChart.data.datasets[1].data = [
            20 * weatherMult,
            45 * weatherMult,
            90 * weatherMult,
            120 * weatherMult,
            80 * weatherMult,
            35 * weatherMult
        ];
        simChart.update();
    }
}

function initSimChart() {
    const ctx = document.getElementById('simChart');
    if (!ctx) return;
    simChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
            datasets: [
                { label: 'Capacidade Base', data: [30, 60, 90, 110, 85, 40], backgroundColor: '#36a9e1' },
                { label: 'Cenário Simulado', data: [25, 50, 80, 95, 70, 30], backgroundColor: '#ff931e' }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { font: { family: 'Inter', size: 11 } } } }
        }
    });
}
