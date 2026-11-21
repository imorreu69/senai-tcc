# UrbanLink Flow

Sistema web de gestão de entregas urbanas e rastreamento em mapa, desenvolvido como Trabalho de Conclusão de Curso (TCC) no SENAI.

## Acesso ao Sistema

* **Aplicação em produção:** https://senai-tcc-kappa.vercel.app

## Objetivo

Centralizar o controle operacional de entregas em uma única aplicação web, permitindo que operadores cadastrem e atualizem o status das rotas enquanto usuários comuns acompanham o andamento dos pedidos pelo mapa.

## Funcionalidades

* **Login e controle de perfil:** Autenticação separada por nível de acesso (`OPERADOR` e `USUARIO`), ocultando menus administrativos para usuários comuns.
* **Cadastro de usuário:** Criação de conta diretamente na tela inicial com atribuição automática do perfil `USUARIO` e validação de e-mail único.
* **Redefinição de senha:** Alteração de senha feita na própria tela de acesso mediante confirmação do e-mail e da palavra de segurança cadastrada.
* **CRUD de entregas:** Cadastro, listagem, edição de status e exclusão de entregas no banco de dados.
* **Mapa interativo:** Visualização geográfica dos pontos de entrega usando Leaflet.

## Tecnologias Utilizadas

* **Frontend:** HTML5, CSS3, Tailwind CSS, JavaScript, Leaflet.js
* **Backend:** Node.js, Express
* **Banco de Dados:** PostgreSQL (Supabase)
* **Deploy e Versionamento:** Vercel, Git, GitHub

## Modelagem do Banco de Dados

O banco de dados relacional no Supabase possui duas tabelas principais:

### `tb_usuario`

| Coluna | Tipo | Restrição | Descrição |
| :--- | :--- | :--- | :--- |
| `id_usuario` | `INTEGER` | `PRIMARY KEY` | Identificador do usuário |
| `nome` | `VARCHAR` | `NOT NULL` | Nome do usuário |
| `email` | `VARCHAR` | `UNIQUE, NOT NULL` | E-mail de login |
| `senha` | `VARCHAR` | `NOT NULL` | Senha de acesso |
| `perfil` | `VARCHAR` | `NOT NULL` | Perfil (`OPERADOR` ou `USUARIO`) |
| `palavra_seguranca` | `VARCHAR` | `NOT NULL` | Palavra-chave usada na recuperação de senha |
| `reset_token` | `VARCHAR` | `NULL` | Token auxiliar de recuperação |
| `reset_expires` | `TIMESTAMP` | `NULL` | Data de expiração do token |

### `tb_entrega`

| Coluna | Tipo | Restrição | Descrição |
| :--- | :--- | :--- | :--- |
| `id_entrega` | `INTEGER` | `PRIMARY KEY` | Identificador da entrega |
| `descricao` | `VARCHAR` | `NOT NULL` | Descrição ou código da entrega |
| `endereco` | `VARCHAR` | `NOT NULL` | Endereço de destino |
| `latitude` | `NUMERIC` | `NULL` | Latitude do destino |
| `longitude` | `NUMERIC` | `NULL` | Longitude do destino |
| `status` | `VARCHAR` | `NOT NULL` | Status atual da entrega |

### Estrutura das Tabelas

```text
tb_usuario                          tb_entrega
--------------------------          --------------------------
id_usuario (PK, INTEGER)            id_entrega (PK, INTEGER)
nome (VARCHAR)                      descricao (VARCHAR)
email (UQ, VARCHAR)                 endereco (VARCHAR)
senha (VARCHAR)                     latitude (NUMERIC)
perfil (VARCHAR)                    longitude (NUMERIC)
palavra_seguranca (VARCHAR)         status (VARCHAR)
reset_token (VARCHAR)
reset_expires (TIMESTAMP)
