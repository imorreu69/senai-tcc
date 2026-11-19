-- ======================================================
-- URBANLINK FLOW - SCHEMA DO BANCO DE DADOS (POSTGRESQL)
-- ======================================================

CREATE TABLE IF NOT EXISTS tb_usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    senha VARCHAR(120) NOT NULL,
    perfil VARCHAR(30) DEFAULT 'OPERADOR'
);

CREATE TABLE IF NOT EXISTS tb_hub (
    id_hub SERIAL PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL
);

CREATE TABLE IF NOT EXISTS tb_veiculo (
    id_veiculo SERIAL PRIMARY KEY,
    placa VARCHAR(10) UNIQUE NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    soc_bateria INT DEFAULT 100
);

CREATE TABLE IF NOT EXISTS tb_entrega (
    id_entrega VARCHAR(20) PRIMARY KEY,
    id_hub_origem INT REFERENCES tb_hub(id_hub),
    cliente_nome VARCHAR(100) NOT NULL,
    endereco_destino TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'Pendente',
    sla VARCHAR(10) DEFAULT '19:00'
);

-- Dados iniciais (Seeds)
INSERT INTO tb_usuario (nome, email, senha, perfil)
VALUES ('Administrador UrbanLink', 'admin@urbanlink.com', '123456', 'OPERADOR')
ON CONFLICT (email) DO NOTHING;

INSERT INTO tb_hub (id_hub, nome, latitude, longitude) VALUES
(1, 'Hub Central', -23.55052000, -46.63330800),
(2, 'Hub Sul', -23.57000000, -46.64500000),
(3, 'Hub Oeste', -23.52000000, -46.68000000)
ON CONFLICT (id_hub) DO NOTHING;

INSERT INTO tb_entrega (id_entrega, id_hub_origem, cliente_nome, endereco_destino, status, sla) VALUES
('DEL-901', 1, 'Hospital das Clínicas', 'Av. Dr. Enéas Carvalho de Aguiar, 255', 'Em Trânsito', '18:30'),
('DEL-902', 2, 'Mercado Municipal', 'Rua da Cantareira, 306 - Centro', 'Pendente', '19:00')
ON CONFLICT (id_entrega) DO NOTHING;
