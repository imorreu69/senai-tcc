# Instruções de Instalação, Configuração e Uso — UrbanLink Flow

## 1. Pré-requisitos

* **Node.js** (versão 18 ou superior)
* **Git**
* Conta no **Supabase** (banco de dados PostgreSQL)
* Conta na **Vercel** (opcional, para deploy em nuvem)

---

## 2. Configuração do Banco de Dados (Supabase)

1. Acesse o painel do Supabase e crie um novo projeto.
2. No menu lateral, abra o **SQL Editor**.
3. Copie o conteúdo do arquivo `database/schema.sql`, cole no editor e clique em **Run** para criar as tabelas `tb_usuario` e `tb_entrega`.
4. Em seguida, copie o conteúdo de `database/seeds.sql`, cole no editor e clique em **Run** para inserir os usuários iniciais e as entregas de teste.
5. Acesse **Project Settings > API** e copie a **Project URL** e a chave pública (**anon / publishable key**).

---

## 3. Instalação e Execução Local

1. Clone o repositório e entre na pasta do projeto:
   ```bash
   git clone [https://github.com/imorreu69/senai-tcc.git](https://github.com/imorreu69/senai-tcc.git)
   cd senai-tcc