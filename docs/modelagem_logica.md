# Modelagem Lógica — UrbanLink Flow

## 1. Esquema Relacional

* **tb_usuario** (<ins>id_usuario</ins>, nome, email, senha, perfil, palavra_seguranca, reset_token, reset_expires)
* **tb_entrega** (<ins>id_entrega</ins>, descricao, endereco, latitude, longitude, status)

---

## 2. Dicionário de Dados

### Tabela: `tb_usuario`
| Coluna | Tipo Lógico | Tamanho | Restrições | Descrição |
| :--- | :--- | :--- | :--- | :--- |
| `id_usuario` | Inteiro | — | `PK`, Autoincremento | Identificador único do usuário |
| `nome` | Texto | 100 | `NOT NULL` | Nome completo |
| `email` | Texto | 150 | `UNIQUE`, `NOT NULL` | E-mail de login |
| `senha` | Texto | 255 | `NOT NULL` | Senha de acesso |
| `perfil` | Texto | 20 | `NOT NULL`, `DEFAULT 'USUARIO'` | Nível de acesso (`OPERADOR` ou `USUARIO`) |
| `palavra_seguranca` | Texto | 100 | `NOT NULL` | Palavra de verificação para troca de senha |
| `reset_token` | Texto | 100 | `NULL` | Token temporário de recuperação |
| `reset_expires` | Data/Hora | — | `NULL` | Validade do token de recuperação |

### Tabela: `tb_entrega`
| Coluna | Tipo Lógico | Tamanho | Restrições | Descrição |
| :--- | :--- | :--- | :--- | :--- |
| `id_entrega` | Inteiro | — | `PK`, Autoincremento | Identificador único da entrega |
| `descricao` | Texto | 200 | `NOT NULL` | Descrição da carga ou pedido |
| `endereco` | Texto | 255 | `NOT NULL` | Endereço completo de entrega |
| `latitude` | Decimal | (10,7) | `NULL` | Coordenada de latitude |
| `longitude` | Decimal | (10,7) | `NULL` | Coordenada de longitude |
| `status` | Texto | 50 | `NOT NULL`, `DEFAULT 'Pendente'` | Estado atual da entrega |

## 3. Diagrama Entidade-Relacionamento
![Diagrama Entidade-Relacionamento](./der_urbanlink.png)