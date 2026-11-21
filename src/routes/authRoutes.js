const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// 1. LOGIN
router.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const senha = req.body.senha || req.body.password;
        const perfil = req.body.perfil || req.body.role;

        if (!email || !senha || !perfil) {
            return res.status(400).json({ error: 'Preencha e-mail, senha e perfil.' });
        }

        const { data, error } = await supabase
            .from('tb_usuario')
            .select('*')
            .eq('email', email.trim().toLowerCase())
            .single();

        if (error || !data) {
            return res.status(401).json({ error: `Usuário não encontrado no banco. Detalhe: ${error?.message || 'vazio'}` });
        }

        const senhaBanco = data.senha ?? data.senha_hash;
        if (senhaBanco !== senha) {
            return res.status(401).json({ error: 'A senha digitada não bate com a do banco.' });
        }

        if (data.perfil !== perfil) {
            return res.status(401).json({ error: `Perfil incorreto. No banco este e-mail é: ${data.perfil}` });
        }

        return res.status(200).json({
            success: 'success',
            message: 'Login realizado!',
            user: data
        });
    } catch (err) {
        return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
});

// 2. CADASTRO DE NOVO USUÁRIO
router.post('/register', async (req, res) => {
    try {
        const { nome, email, senha, palavra_seguranca } = req.body;

        if (!nome || !email || !senha || !palavra_seguranca) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        const { data, error } = await supabase
            .from('tb_usuario')
            .insert([{
                nome: nome.trim(),
                email: email.trim().toLowerCase(),
                senha: senha,
                perfil: 'USUARIO',
                palavra_seguranca: palavra_seguranca.trim().toLowerCase()
            }])
            .select('nome, email, perfil')
            .single();

        if (error) {
            if (error.code === '23505') {
                return res.status(409).json({ error: 'Este e-mail já está cadastrado.' });
            }
            return res.status(400).json({ error: error.message });
        }

        return res.status(201).json({ message: 'Conta criada com sucesso!', user: data });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }
});

// 3. REDEFINIÇÃO DE SENHA (ESQUECI A SENHA)
router.patch('/reset-password', async (req, res) => {
    try {
        const { email, palavra_seguranca, nova_senha } = req.body;

        if (!email || !palavra_seguranca || !nova_senha) {
            return res.status(400).json({ error: 'Informe e-mail, palavra de segurança e a nova senha.' });
        }

        const emailLimpo = email.trim().toLowerCase();

        const { data: usuario, error: buscaError } = await supabase
            .from('tb_usuario')
            .select('email')
            .eq('email', emailLimpo)
            .eq('palavra_seguranca', palavra_seguranca.trim().toLowerCase())
            .single();

        if (buscaError || !usuario) {
            return res.status(401).json({ error: 'E-mail ou palavra de segurança incorretos.' });
        }

        const { error: updateError } = await supabase
            .from('tb_usuario')
            .update({ senha: nova_senha })
            .eq('email', emailLimpo);

        if (updateError) {
            return res.status(500).json({ error: 'Falha ao atualizar a senha.' });
        }

        return res.status(200).json({ message: 'Senha redefinida com sucesso!' });
    } catch (err) {
        return res.status(500).json({ error: 'Erro interno ao redefinir senha.' });
    }
});

module.exports = router;