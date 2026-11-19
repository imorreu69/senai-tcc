const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// POST /api/v1/login
router.post('/login', async (req, res) => {
    const { email, password, perfil } = req.body;

    try {
        const { data, error } = await supabase
            .from('tb_usuario')
            .select('id_usuario, nome, perfil')
            .eq('email', email)
            .eq('senha', password)
            .eq('perfil', perfil);

        if (error) throw error;

        if (data && data.length > 0) {
            res.json({ status: 'success', user: data[0] });
        } else {
            res.status(401).json({ status: 'error', message: 'Credenciais inválidas' });
        }
    } catch (err) {
        console.error('ERRO NO LOGIN:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
