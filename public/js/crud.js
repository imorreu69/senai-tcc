/* ====================================================== */
/* AUTH & CRUD OPERATIONAL ENGINE (INTEGRADO COM API)     */
/* ====================================================== */
const API_URL = '/api/v1';
let deliveriesStore = [];

// 1. Autenticação
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const role = document.getElementById('login-role').value;

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, perfil: role })
        });
        const data = await res.json();

        if (data.status === 'success') {
            document.getElementById('login-screen').classList.add('hidden');
            if (role === 'USUARIO') {
                document.getElementById('nav-docs').style.display = 'none';
                document.getElementById('nav-crud').style.display = 'none';
            }
            showToast(`Bem-vindo, ${data.user.nome}`, 'success');
            fetchDeliveries();
        } else {
            alert('Credenciais inválidas!');
        }
    } catch (err) {
        alert('Erro ao ligar ao servidor Node.js.');
    }
}

// 2. Ler Entregas (GET)
async function fetchDeliveries() {
    try {
        const res = await fetch(`${API_URL}/deliveries`);
        const json = await res.json();
        if (json.status === 'success') {
            deliveriesStore = json.data;
            renderDeliveriesTable();
        }
    } catch (e) {
        showToast('Erro de ligação com API', 'error');
    }
}

// 3. Renderizar Tabela
function renderDeliveriesTable(data = deliveriesStore) {
    const tbody = document.getElementById('crud-table-body');
    if (!tbody) return;

    tbody.innerHTML = data.map(item => {
        let badge = 'bg-slate-100 text-slate-700';
        if (item.status === 'Pendente') badge = 'bg-[#ff931e]/15 text-[#c96f00]';
        if (item.status === 'Em Trânsito') badge = 'bg-[#36a9e1]/15 text-[#1d7ab0]';
        if (item.status === 'Concluído') badge = 'bg-emerald-100 text-emerald-800';
        if (item.status === 'Atrasado') badge = 'bg-red-100 text-red-800';

        return `
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-all">
                <td class="p-3 font-mono font-bold text-[#36a9e1]">${item.id}</td>
                <td class="p-3 font-semibold text-slate-900 dark:text-slate-100">${item.customer}</td>
                <td class="p-3 text-slate-600 dark:text-slate-300 truncate max-w-xs">${item.address}</td>
                <td class="p-3 text-slate-500">${item.hub}</td>
                <td class="p-3"><span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold ${badge}">${item.status}</span></td>
                <td class="p-3 font-mono text-slate-500">${item.sla}</td>
                <td class="p-3 text-center space-x-2">
                    <button onclick="editDelivery('${item.id}')" class="text-slate-400 hover:text-[#36a9e1]"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button onclick="deleteDelivery('${item.id}')" class="text-slate-400 hover:text-red-500"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
    }).join('');
}

// 4. Filtrar na Tabela
function filterDeliveries() {
    const q = document.getElementById('crud-search').value.toLowerCase();
    const status = document.getElementById('crud-filter-status').value;
    const hub = document.getElementById('crud-filter-hub').value;

    const filtered = deliveriesStore.filter(d => {
        const matchQ = d.id.toLowerCase().includes(q) || d.customer.toLowerCase().includes(q) || d.address.toLowerCase().includes(q);
        const matchS = status === 'ALL' || d.status === status;
        const matchH = hub === 'ALL' || d.hub.includes(hub);
        return matchQ && matchS && matchH;
    });
    renderDeliveriesTable(filtered);
}

// 5. Guardar / Atualizar Entrega (POST / PUT)
async function saveDelivery(e) {
    e.preventDefault();
    const id = document.getElementById('form-id').value;

    const hubText = document.getElementById('form-hub').value;
    let hubId = 1;
    if (hubText.includes('Sul')) hubId = 2;
    if (hubText.includes('Oeste')) hubId = 3;

    const payload = {
        id: id || `DEL-${Math.floor(900 + Math.random() * 90)}`,
        customer: document.getElementById('form-customer').value,
        address: document.getElementById('form-address').value,
        hub_id: hubId,
        status: document.getElementById('form-status').value,
        sla: '19:00'
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/deliveries/${id}` : `${API_URL}/deliveries`;

    try {
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        showToast(id ? 'Entrega atualizada!' : `Entrega ${payload.id} criada!`, 'success');
        closeDeliveryModal();
        fetchDeliveries();
    } catch (err) {
        showToast('Erro ao guardar na base de dados', 'error');
    }
}

// 6. Eliminar Entrega (DELETE)
async function deleteDelivery(id) {
    if (confirm('Tem a certeza que deseja remover esta entrega da base de dados?')) {
        try {
            await fetch(`${API_URL}/deliveries/${id}`, { method: 'DELETE' });
            showToast('Entrega removida.', 'info');
            fetchDeliveries();
        } catch (err) {
            showToast('Erro ao eliminar', 'error');
        }
    }
}

// 7. Controlos do Modal
function openDeliveryModal(isEdit = false) {
    document.getElementById('modal-title').innerText = isEdit ? 'Editar Entrega' : 'Nova Entrega';
    if (!isEdit) {
        document.getElementById('delivery-form').reset();
        document.getElementById('form-id').value = '';
    }
    document.getElementById('delivery-modal').classList.remove('hidden');
}

function closeDeliveryModal() {
    document.getElementById('delivery-modal').classList.add('hidden');
}

function editDelivery(id) {
    const item = deliveriesStore.find(d => d.id === id);
    if (!item) return;
    document.getElementById('form-id').value = item.id;
    document.getElementById('form-customer').value = item.customer;
    document.getElementById('form-address').value = item.address;
    document.getElementById('form-status').value = item.status;

    const selectHub = document.getElementById('form-hub');
    for (let i = 0; i < selectHub.options.length; i++) {
        if (selectHub.options[i].text.includes(item.hub)) {
            selectHub.selectedIndex = i;
            break;
        }
    }
    openDeliveryModal(true);
}

// 8. Exportar CSV
function exportCSV() {
    let csv = 'ID,Cliente,Endereco,Hub,Status,SLA\n';
    deliveriesStore.forEach(d => csv += `"${d.id}","${d.customer}","${d.address}","${d.hub}","${d.status}","${d.sla}"\n`);
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'urbanlink_entregas.csv';
    a.click();
    showToast('CSV Exportado!', 'success');
}
