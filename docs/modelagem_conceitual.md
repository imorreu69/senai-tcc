# Modelagem Conceitual — UrbanLink Flow

## 1. Descrição Geral
O modelo conceitual define as entidades de negócio e as regras de relacionamento do sistema de gestão logística, sem depender de tipos de dados ou recursos específicos de um SGBD.

## 2. Entidades e Atributos

### Entidade: USUARIO
Representa as pessoas cadastradas que acessam a plataforma.
* **id_usuario** (Atributo identificador): Código único de cada usuário.
* **nome**: Nome completo do usuário.
* **email**: Endereço eletrônico utilizado para autenticação (único no sistema).
* **senha**: Credencial de acesso.
* **perfil**: Categoria de permissão (`OPERADOR` ou `USUARIO`).
* **palavra_seguranca**: Palavra-chave pessoal utilizada para validação na redefinição de senha.
* **reset_token** e **reset_expires**: Atributos auxiliares para controle de recuperação de senha.

### Entidade: ENTREGA
Representa cada pedido ou carga monitorada no mapa operacional.
* **id_entrega** (Atributo identificador): Código único da entrega.
* **descricao**: Identificação ou resumo do conteúdo da entrega.
* **endereco**: Localização textual de destino.
* **latitude** e **longitude**: Coordenadas geográficas para marcação no mapa.
* **status**: Situação operacional atual da entrega (ex: *Pendente*, *Em Rota*, *Entregue*).

## 3. Relacionamentos e Cardinalidade
* **USUARIO (1) — gerencia / consulta — (N) ENTREGA:** Um usuário pode gerenciar ou acompanhar diversas entregas. Usuários com perfil `OPERADOR` possuem permissão de criação, alteração e exclusão de entregas; usuários com perfil `USUARIO` possuem permissão apenas de leitura.