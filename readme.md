# YourBoard - Gerenciador de Tarefas

**YourBoard** é uma aplicação web para organização pessoal de tarefas, voltada a estudantes e jovens profissionais. O sistema permite criar tarefas com datas, prioridades, categorias, origens e acompanhá-las em um painel visual de produtividade. Desenvolvido com arquitetura MVC, Node.js e PostgreSQL.

## Funcionalidades

- Cadastro e login de usuários
- CRUD completo de tarefas
- Classificação por categorias e origens
- Acompanhamento por nível de importância e progresso
- Visualização de tarefas em formato de agenda
- Dashboard com gráficos de produtividade (em construção)
- Padrão de mini metas e organização de rotinas

## Requisitos

- Node.js (v14 ou superior)
- PostgreSQL (Supabase, DBeaver ou local)
- npm

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/yourboard.git
cd yourboard
Instale as dependências:

bash
Sempre exibir os detalhes

Copiar
npm install
Configure o arquivo .env:

Renomeie o arquivo .env.example para .env e insira suas credenciais:

env
Sempre exibir os detalhes

Copiar
DB_USER=postgres.koeiopqqlkgjjbfkftkr
DB_HOST=aws-0-sa-east-1.pooler.supabase.com
DB_DATABASE=postgres
DB_PASSWORD=VE33226sp993@
DB_PORT=6543
DB_SSL=false
PORT=3000
Inicialize o banco de dados:

bash
Sempre exibir os detalhes

Copiar
npm run init-db
Isso criará as tabelas e registros iniciais no PostgreSQL.

Endpoints Principais
Método	Rota	Descrição
POST	/tarefas	Cria uma nova tarefa
GET	/tarefas	Lista todas as tarefas
PUT	/tarefas/:id	Atualiza uma tarefa
DELETE	/tarefas/:id	Deleta uma tarefa
POST	/categorias	Cria uma nova categoria
GET	/categorias	Lista todas as categorias
PUT	/categorias/:id	Atualiza uma categoria
DELETE	/categorias/:id	Deleta uma categoria
POST	/origens	Cria uma nova origem
GET	/origens	Lista todas as origens
PUT	/origens/:id	Atualiza uma origem
DELETE	/origens/:id	Deleta uma origem
POST	/agendas	Cria um agendamento
GET	/agendas	Lista todos os agendamentos
PUT	/agendas/:id	Atualiza um agendamento
DELETE	/agendas/:id	Deleta um agendamento

Exemplo de requisição para criar tarefa
json
Sempre exibir os detalhes

Copiar
{
  "titulo": "Estudar para prova",
  "descricao": "Revisar capítulos 1 a 3",
  "status": "pendente",
  "data_desejada": "2024-06-10",
  "data_limite": "2024-06-15",
  "importancia": 5,
  "progresso": 0,
  "usuario_id": 1,
  "categoria_id": 1,
  "origem_id": 1
}
Estrutura de Diretórios
bash
Sempre exibir os detalhes

Copiar
yourboard/
├── config/         # Configurações do banco de dados
├── controllers/    # Controladores com regras de negócio
├── models/         # Models para manipulação de dados
├── routes/         # Rotas da aplicação
├── scripts/        # Script init-db com schema do banco
├── tests/          # Testes automatizados
├── views/          # (opcional - se utilizar templates)
├── server.js       # Arquivo principal do servidor
├── .env.example    # Exemplo de variáveis de ambiente
└── README.md
Scripts Disponíveis
npm start: Inicia o servidor na porta definida

npm run dev: Inicia com nodemon para desenvolvimento

npm run init-db: Executa os scripts de banco de dados

npm run test: Executa os testes (se aplicáveis)

npm run test:coverage: Gera cobertura de testes (opcional)

Tecnologias Utilizadas
Node.js

Express

PostgreSQL

Supabase

DBeaver

Prints / Wireframes
Tela de Login

Tela Inicial com visualização resumida de:

Agenda

Gráficos de progresso

Diário

Atalhos rápidos

Os wireframes foram desenvolvidos em média fidelidade e podem ser encontrados na pasta /docs.

Autor
Caio Almeida Mota
Projeto acadêmico - INTELI, 2025

Licença
Este projeto foi desenvolvido com fins educacionais e não possui fins comerciais.
Sinta-se à vontade para adaptar e contribuir.

Observações
O arquivo .env não deve ser versionado por segurança.

Para dúvidas ou sugestões, entre em contato ou abra uma issue.
"""

Caminho de saída do arquivo
file_path = Path("/mnt/data/README_YourBoard.md")
file_path.write_text(readme_content)

file_path.name