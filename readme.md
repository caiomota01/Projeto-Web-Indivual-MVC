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

1. **Clonar o repositório:**

```bash
git clone https://github.com/caiomota01/Projeto-Web-Indivual-MVC
cd Projeto-Web-Indivual-MVC
```


2. **Instalar as dependências:**
    
```bash
npm install
```

Configuração do Banco de Dados
------------------------------

1. **Criar banco de dados:**
    
DB_USER=postgres.koeiopqqlkgjjbfkftkr
DB_HOST=aws-0-sa-east-1.pooler.supabase.com
DB_DATABASE=postgres
DB_PASSWORD=VE33226sp993@
DB_PORT=6543
DB_SSL=false
PORT=3000
    
2. **Executar o script SQL de inicialização:**
    
```bash
npm run init-db
```
    
Isso criará a tabela `users` no seu banco de dados PostgreSQL com UUID como chave primária e inserirá alguns registros de exemplo.
    

Funcionalidades
---------------

Cadastro de usuários

CRUD de tarefas com:

Título, descrição, status, datas (desejada e limite), importância e progresso

Categoria (com prioridade)

Origem (com relevância)

Agenda de tarefas com data/hora de início/fim e anotações

Visualização do progresso e produtividade

Padrão MVC (Model-View-Controller)

Scripts Disponíveis
-------------------

* `npm start`: Inicia o servidor Node.js.
* `npm run dev`: Inicia o servidor com `nodemon`, reiniciando automaticamente após alterações no código.
* `npm run test`: Executa os testes automatizados.
* `npm run test:coverage`: Executa os testes e gera um relatório de cobertura de código.

Estrutura de Diretórios
-----------------------

* **`config/`**: Configurações do banco de dados e outras configurações do projeto.
* **`controllers/`**: Controladores da aplicação (lógica de negócio).
* **`models/`**: Modelos da aplicação (definições de dados e interações com o banco de dados).
* **`routes/`**: Rotas da aplicação.
* **`tests/`**: Testes automatizados.
* **`views/`**: Views da aplicação (se aplicável).


Autor
Caio Almeida Mota
Projeto acadêmico - INTELI, 2025

Licença
-------



Este README.md fornece uma visão geral clara do boilerplate, incluindo instruções de instalação, configuração do banco de dados, funcionalidades principais, scripts disponíveis, estrutura de diretórios, como contribuir e informações de licença. Certifique-se de personalizar as seções com detalhes específicos do seu projeto conforme necessário.