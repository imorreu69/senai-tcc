require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Obrigatório para conexões remotas
    }
});

// Autenticação
app.post('/api/v1/login', async (req, res) => {
    const { email, password, perfil } = req.body;
    
    // LINHA NOVA PARA DIAGNÓSTICO:
    console.log(`Tentativa de Login -> Email: '${email}', Senha: '${password}', Perfil: '${perfil}'`);

    try {
        const result = await pool.query(
            'SELECT id_usuario, nome, perfil FROM tb_usuario WHERE email = $1 AND senha = $2 AND perfil = $3',
            [email, password, perfil]
        );
        if (result.rows.length > 0) {
            res.json({ status: 'success', user: result.rows[0] });
        } else {
            res.status(401).json({ status: 'error', message: 'Credenciais inválidas' });
        }
    } catch (err) {
        console.error("ERRO DETALHADO DO SUPABASE:", err);
        res.status(500).json({ error: err.message });
    }
});

// Listar entregas (Lê do Banco)
app.get('/api/v1/deliveries', async (req, res) => {
    try {
        const query = `
            SELECT e.id_entrega as id, e.cliente_nome as customer, 
                   e.endereco_destino as address, h.nome as hub, 
                   e.status, e.sla 
            FROM tb_entrega e
            JOIN tb_hub h ON e.id_hub_origem = h.id_hub
            ORDER BY e.id_entrega DESC
        `;
        const result = await pool.query(query);
        res.json({ status: 'success', data: result.rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Criar nova entrega
app.post('/api/v1/deliveries', async (req, res) => {
    const { id, customer, address, hub_id, status, sla } = req.body;
    try {
        await pool.query(
            'INSERT INTO tb_entrega (id_entrega, cliente_nome, endereco_destino, id_hub_origem, status, sla) VALUES ($1, $2, $3, $4, $5, $6)',
            [id, customer, address, hub_id, status, sla]
        );
        res.json({ status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Atualizar entrega
app.put('/api/v1/deliveries/:id', async (req, res) => {
    const { customer, address, hub_id, status } = req.body;
    try {
        await pool.query(
            'UPDATE tb_entrega SET cliente_nome = $1, endereco_destino = $2, id_hub_origem = $3, status = $4 WHERE id_entrega = $5',
            [customer, address, hub_id, status, req.params.id]
        );
        res.json({ status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Deletar entrega
app.delete('/api/v1/deliveries/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM tb_entrega WHERE id_entrega = $1', [req.params.id]);
        res.json({ status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Otimizador Mock
app.post('/api/v1/routes/optimize', (req, res) => {
    res.json({ status: 'success', distance_km: 8.4, estimated_time_min: 19, co2_saved_kg: 1.76 });
});

app.listen(3005, () => console.log('API UrbanLink Flow rodando na porta 3005'));