-- ============================================================================
-- SCRIPT DML: INSERÇÃO DE DADOS INICIAIS (SEEDS) — URBANLINK FLOW
-- ============================================================================

-- 1. Usuários iniciais (1 Operador Master e 2 Usuários Comuns)
INSERT INTO tb_usuario (nome, email, senha, perfil, palavra_seguranca)
VALUES 
    ('Administrador Master', 'admin@urbanlink.com', '123456', 'OPERADOR', 'urbanlink2026'),
    ('Carlos Silva', 'carlos.silva@urbanlink.com', '123456', 'USUARIO', 'rex'),
    ('Mariana Costa', 'mariana.costa@urbanlink.com', '123456', 'USUARIO', 'rio')
ON CONFLICT (email) DO NOTHING;

-- 2. Entregas iniciais no Rio de Janeiro para visualização no mapa
INSERT INTO tb_entrega (descricao, endereco, latitude, longitude, status)
VALUES 
    ('Carga Eletrônicos #101', 'Av. Rio Branco, 156 - Centro, Rio de Janeiro - RJ', -22.9068467, -43.1769123, 'Em Rota'),
    ('Insumos Industriais #102', 'Av. Brasil, 4036 - Manguinhos, Rio de Janeiro - RJ', -22.8781234, -43.2456789, 'Pendente'),
    ('Encomenda Expressa #103', 'Av. das Américas, 4666 - Barra da Tijuca, Rio de Janeiro - RJ', -22.9998123, -43.3654321, 'Entregue');