# UrbanLink Flow — Plataforma de Gestão & Simulação Logística

Projeto Integrador / TCC (SENAI) organizado em arquitetura modular full-stack (**HTML/CSS/JS + Node.js/Express + Supabase**).

## Estrutura de Pastas

```text
urbanlink-flow/
├── database/
│   └── schema.sql            # Script DDL e dados iniciais do PostgreSQL/Supabase
├── public/                   # Frontend estático (servido pelo Express)
│   ├── css/
│   │   └── style.css         # Estilos da identidade visual UrbanLink
│   ├── js/
│   │   ├── tailwind-config.js # Paleta e fontes customizadas do Tailwind
│   │   ├── map.js            # Motor de mapas Leaflet (Esri) e telemetria
│   │   ├── optimizer.js      # Cálculo de rota Haversine e emissões de CO2
│   │   ├── simulator.js      # Simulador de cenários urbanos e gráficos
│   │   ├── crud.js           # Integração REST API (Login e CRUD de entregas)
│   │   └── main.js           # Navegação, temas claro/escuro e inicialização
│   └── index.html            # Interface principal da plataforma
├── src/                      # Backend Node.js / Express
│   ├── config/
│   │   └── supabase.js       # Cliente Supabase via HTTPS (porta 443)
│   ├── routes/
│   │   ├── authRoutes.js     # Rota de autenticação (/api/v1/login)
│   │   ├── deliveryRoutes.js # Rotas CRUD (/api/v1/deliveries)
│   │   └── routeOptimizerRoutes.js # Rota de otimização (/api/v1/routes/optimize)
│   └── server.js             # Ponto de entrada da aplicação
├── .env.example              # Modelo de variáveis de ambiente
├── .gitignore                # Proteção contra envio de .env e node_modules
└── package.json              # Dependências e scripts de execução
```

## Como Executar

1. Copie ou renomeie `.env.example` para `.env` e preencha `SUPABASE_URL` e `SUPABASE_KEY`.
2. Instale as dependências (caso ainda não tenha a pasta `node_modules`):
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   npm start
   ```
4. Acesse no navegador: `http://localhost:3005`
