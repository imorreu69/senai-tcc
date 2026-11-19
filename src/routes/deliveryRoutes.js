const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// GET /api/v1/deliveries - Listar todas as entregas
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('tb_entrega')
            .select(`
                id:id_entrega,
                customer:cliente_nome,
                address:endereco_destino,
                status,
                sla,
                tb_hub ( nome )
            `)
            .order('id_entrega', { ascending: false });

        if (error) throw error;

        const formatted = (data || []).map(item => ({
            id: item.id,
            customer: item.customer,
            address: item.address,
            hub: item.tb_hub ? item.tb_hub.nome : 'Hub Central',
            status: item.status,
            sla: item.sla || '19:00'
        }));

        res.json({ status: 'success', data: formatted });
    } catch (err) {
        console.error('ERRO AO LISTAR ENTREGAS:', err);
        res.status(500).json({ error: err.message });
    }
});

// POST /api/v1/deliveries - Criar nova entrega
router.post('/', async (req, res) => {
    const { id, customer, address, hub_id, status, sla } = req.body;

    try {
        const { error } = await supabase
            .from('tb_entrega')
            .insert([{
                id_entrega: id,
                cliente_nome: customer,
                endereco_destino: address,
                id_hub_origem: hub_id,
                status,
                sla: sla || '19:00'
            }]);

        if (error) throw error;

        res.status(201).json({ status: 'success' });
    } catch (err) {
        console.error('ERRO AO CRIAR ENTREGA:', err);
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/v1/deliveries/:id - Atualizar entrega existente
router.put('/:id', async (req, res) => {
    const { customer, address, hub_id, status } = req.body;

    try {
        const { error } = await supabase
            .from('tb_entrega')
            .update({
                cliente_nome: customer,
                endereco_destino: address,
                id_hub_origem: hub_id,
                status
            })
            .eq('id_entrega', req.params.id);

        if (error) throw error;

        res.json({ status: 'success' });
    } catch (err) {
        console.error('ERRO AO ATUALIZAR ENTREGA:', err);
        res.status(500).json({ error: err.message });
    }
});

// DELETE /api/v1/deliveries/:id - Remover entrega
router.delete('/:id', async (req, res) => {
    try {
        const { error } = await supabase
            .from('tb_entrega')
            .delete()
            .eq('id_entrega', req.params.id);

        if (error) throw error;

        res.json({ status: 'success' });
    } catch (err) {
        console.error('ERRO AO DELETAR ENTREGA:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
