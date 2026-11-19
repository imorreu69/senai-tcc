/* ====================================================== */
/* MAIN APP INITIALIZATION, NAVIGATION & UI HELPERS       */
/* ====================================================== */
let kpiChart = null;

window.onload = function () {
    initKPIChart();
    initLiveMap();
    initSimChart();
    renderDeliveriesTable();
    startTelemetry();
    showToast('plataforma urbanlink. urbanflow. carregada', 'success');
};

function toggleTheme() {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        html.classList.add('light');
    } else {
        html.classList.remove('light');
        html.classList.add('dark');
    }
    updateMapTiles();
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('bg-[#36a9e1]', 'text-white', 'shadow-sm');
        btn.classList.add('text-slate-600', 'dark:text-slate-300');
    });

    const targetTab = document.getElementById(`tab-${tabId}`);
    const targetNav = document.getElementById(`nav-${tabId}`);

    if (targetTab) targetTab.classList.add('active');
    if (targetNav) {
        targetNav.classList.add('bg-[#36a9e1]', 'text-white', 'shadow-sm');
        targetNav.classList.remove('text-slate-600', 'dark:text-slate-300');
    }

    if (tabId === 'map' && liveMap) {
        setTimeout(() => liveMap.invalidateSize(), 200);
    } else if (tabId === 'optimizer') {
        setTimeout(() => {
            initOptMap();
            if (optMap) optMap.invalidateSize();
        }, 200);
    }
}

function initKPIChart() {
    const ctx = document.getElementById('kpiChart');
    if (!ctx) return;
    kpiChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Entregas Concluídas',
                data: [1200, 1350, 1280, 1420, 1482, 950, 600],
                borderColor: '#36a9e1',
                backgroundColor: 'rgba(54, 169, 225, 0.1)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

/* ====================================================== */
/* DOCS SUB TABS                                          */
/* ====================================================== */
function switchDocSub(subId) {
    document.querySelectorAll('#tab-docs [id^="doc-content-"]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.doc-sub-btn').forEach(btn => {
        btn.classList.remove('border-[#36a9e1]', 'text-[#36a9e1]');
        btn.classList.add('border-transparent', 'text-slate-500');
    });

    document.getElementById(`doc-content-${subId}`).classList.remove('hidden');
    const active = document.getElementById(`doc-sub-${subId}`);
    if (active) {
        active.classList.add('border-[#36a9e1]', 'text-[#36a9e1]');
        active.classList.remove('border-transparent', 'text-slate-500');
    }
}

function toggleEp(id) {
    document.getElementById(id).classList.toggle('hidden');
}

function copySQL() {
    const sqlEl = document.getElementById('sql-code-block');
    if (sqlEl && navigator.clipboard) {
        navigator.clipboard.writeText(sqlEl.innerText);
    }
    showToast('Script SQL copiado!', 'success');
}

/* ====================================================== */
/* TOAST NOTIFIER                                         */
/* ====================================================== */
function showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    let color = 'border-[#36a9e1] text-slate-800 dark:text-white';
    if (type === 'success') color = 'border-emerald-500 text-slate-800 dark:text-white';

    toast.className = `p-3 rounded-xl bg-white dark:bg-slate-800 border shadow-lg text-xs flex items-center space-x-2 transition-all transform translate-y-2 pointer-events-auto ${color}`;
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-[#36a9e1]"></i><span>${msg}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
