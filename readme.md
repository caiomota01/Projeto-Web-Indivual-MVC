# YourBoard - Gerenciador de Tarefas

**YourBoard** é uma aplicação web completa para organização pessoal de tarefas, voltada a estudantes e jovens profissionais. O sistema permite criar tarefas com datas, prioridades, categorias, origens e acompanhá-las em um painel visual de produtividade. Desenvolvido com arquitetura MVC, Node.js e PostgreSQL.

## ✨ Funcionalidades Implementadas

### 📊 **Dashboard**
- Visualização das 3 tarefas mais próximas do prazo
- Gráfico de produtividade semanal (Chart.js)
- Widget de diário rápido
- Atalhos para sites importantes

### 📝 **Gerenciamento de Tarefas**
- CRUD completo de tarefas
- Classificação por categorias e origens
- Filtros por status, categoria e origem
- Acompanhamento por nível de importância e progresso
- Edição inline e exclusão com confirmação

### 📅 **Agenda**
- Calendário visual interativo
- Agendamento de blocos de tempo para tarefas
- Visualização de tarefas por dia
- Criação, edição e exclusão de agendamentos

### 📈 **Gráficos e Analytics**
- Gráfico de tarefas por status (pizza)
- Progresso médio por categoria (barras)
- Distribuição de tarefas por origem (rosca)
- Evolução semanal de tarefas (linha)

### 📖 **Diário Pessoal**
- Editor de entradas diárias
- Histórico de entradas com busca por data
- Funcionalidade de exportar diário
- Visualização de entradas completas

### 🔗 **Atalhos**
- Gerenciamento de links úteis
- Funcionalidades de importar/exportar atalhos
- Acesso rápido a sites importantes

## 🛠 Tecnologias Utilizadas

- **Backend**: Node.js + Express
- **Frontend**: EJS Templates + Vanilla JavaScript
- **Database**: PostgreSQL
- **Charts**: Chart.js
- **CSS**: Sistema de design customizado com variáveis CSS
- **Arquitetura**: MVC (Model-View-Controller)

## 📋 Requisitos

- Node.js (v14 ou superior)
- PostgreSQL (local, Supabase, ou outro provedor)
- npm

## 🚀 Instalação e Configuração

### 1. **Clonar o repositório:**

```bash
git clone https://github.com/caiomota01/Projeto-Web-Indivual-MVC
cd Projeto-Web-Indivual-MVC
```

### 2. **Instalar as dependências:**

```bash
npm install
```

### 3. **Configuração do Banco de Dados**

Crie um arquivo `.env` na raiz do projeto com suas credenciais do PostgreSQL:

```env
DB_USER=seu_usuario
DB_HOST=seu_host
DB_DATABASE=seu_banco
DB_PASSWORD=sua_senha
DB_PORT=5432
DB_SSL=false
PORT=3000
```

### 4. **Inicializar o banco de dados:**

```bash
npm run init-db
```

Este comando criará todas as tabelas necessárias (users, tasks, categories, origins, agenda).

### 5. **Carregar dados de exemplo (opcional):**

```bash
npm run sample-data
```

Este comando inserirá dados de exemplo para testar a aplicação.

### 6. **Iniciar a aplicação:**

```bash
npm start
```

Ou para desenvolvimento com auto-reload:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`
    

## 📱 Como Usar

### Dashboard
- Acesse `/` ou `/dashboard` para ver o painel principal
- Visualize suas tarefas mais urgentes
- Acompanhe sua produtividade semanal
- Faça anotações rápidas no diário

### Tarefas
- Acesse `/tarefas` para gerenciar suas tarefas
- Crie novas tarefas com título, descrição, datas e prioridades
- Use os filtros para encontrar tarefas específicas
- Edite ou exclua tarefas conforme necessário

### Agenda
- Acesse `/agenda` para ver o calendário
- Clique em um dia para ver as tarefas agendadas
- Agende blocos de tempo para suas tarefas
- Gerencie seus agendamentos

### Gráficos
- Acesse `/graficos` para ver analytics
- Analise a distribuição de suas tarefas
- Acompanhe seu progresso por categoria
- Visualize sua evolução ao longo do tempo

### Diário
- Acesse `/diario` para fazer anotações pessoais
- Escreva sobre seu dia e seus aprendizados
- Consulte entradas anteriores
- Exporte seu diário quando necessário

### Atalhos
- Acesse `/atalhos` para gerenciar links úteis
- Adicione sites que você acessa frequentemente
- Organize seus recursos online

## 🛠 Scripts Disponíveis

* `npm start`: Inicia o servidor Node.js
* `npm run dev`: Inicia com nodemon (auto-reload)
* `npm test`: Executa os testes automatizados
* `npm run test:coverage`: Gera relatório de cobertura
* `npm run init-db`: Inicializa o banco de dados
* `npm run sample-data`: Carrega dados de exemplo

## 📁 Estrutura do Projeto

```
mvc-boilerplate-main/
├── 📁 config/
│   └── db.js                 # Configuração do banco de dados
├── 📁 controllers/           # Controladores (lógica de negócio)
│   ├── AgendaController.js
│   ├── CategoriaController.js
│   ├── OrigemController.js
│   ├── TarefaController.js
│   └── userController.js
├── 📁 models/               # Modelos (acesso aos dados)
│   ├── agendaModel.js
│   ├── categoriaModel.js
│   ├── origemModel.js
│   ├── tarefaModel.js
│   └── userModel.js
├── 📁 routes/               # Rotas da aplicação
│   ├── agendaRoutes.js
│   ├── categoriaRoutes.js
│   ├── frontRoutes.js       # Rotas das páginas
│   ├── origemRoutes.js
│   ├── tarefaRoutes.js
│   └── userRoutes.js
├── 📁 views/                # Templates EJS
│   ├── 📁 layout/
│   │   └── main.ejs         # Layout principal
│   └── 📁 pages/            # Páginas da aplicação
│       ├── agenda.ejs
│       ├── atalhos.ejs
│       ├── dashboard.ejs
│       ├── diario.ejs
│       ├── graficos.ejs
│       └── tarefas.ejs
├── 📁 public/               # Arquivos estáticos
│   ├── 📁 css/
│   │   └── style.css        # Estilos da aplicação
│   └── 📁 js/               # JavaScript do frontend
│       ├── agenda.js
│       ├── atalhos.js
│       ├── dashboard.js
│       ├── diario.js
│       ├── graficos.js
│       └── tarefas.js
├── 📁 scripts/              # Scripts utilitários
│   ├── init.sql             # Schema do banco
│   ├── sample-data.sql      # Dados de exemplo
│   ├── runSQLScript.js      # Executor de SQL
│   └── loadSampleData.js    # Carregador de dados
├── 📁 services/             # Serviços de negócio
│   └── userService.js
├── 📁 tests/                # Testes automatizados
├── server.js                # Servidor principal
├── package.json             # Dependências e scripts
└── README.md               # Este arquivo
```

## 🏗 Arquitetura MVC

### **Models** (Modelos)
- Responsáveis pelo acesso aos dados
- Contêm as queries SQL
- Abstraem a interação com o banco de dados

### **Views** (Visualizações)
- Templates EJS para renderização
- Interface do usuário
- Recebem dados dos controladores

### **Controllers** (Controladores)
- Lógica de negócio da aplicação
- Processam requisições HTTP
- Coordenam Models e Views

## 🔗 API Endpoints

### Tarefas
- `GET /tarefas` - Listar todas as tarefas
- `POST /tarefas` - Criar nova tarefa
- `PUT /tarefas/:id` - Atualizar tarefa
- `DELETE /tarefas/:id` - Excluir tarefa

### Categorias
- `GET /categorias` - Listar categorias
- `POST /categorias` - Criar categoria
- `PUT /categorias/:id` - Atualizar categoria
- `DELETE /categorias/:id` - Excluir categoria

### Origens
- `GET /origens` - Listar origens
- `POST /origens` - Criar origem
- `PUT /origens/:id` - Atualizar origem
- `DELETE /origens/:id` - Excluir origem

### Agenda
- `GET /agendas` - Listar agendamentos
- `POST /agendas` - Criar agendamento
- `PUT /agendas/:id` - Atualizar agendamento
- `DELETE /agendas/:id` - Excluir agendamento

## 🎨 Design System

O projeto utiliza um sistema de design consistente com:
- Variáveis CSS para cores e tipografia
- Componentes reutilizáveis
- Layout responsivo
- Sidebar fixa com navegação
- Cards para organização de conteúdo

## 📊 Funcionalidades de Dados

- **Persistência**: PostgreSQL para dados estruturados
- **Cache Local**: localStorage para diário e atalhos
- **Visualizações**: Chart.js para gráficos interativos
- **Filtros**: Sistema de filtros dinâmicos
- **Exportação**: Funcionalidades de export/import

## 🚀 Deploy

Para fazer deploy da aplicação:

1. Configure as variáveis de ambiente no servidor
2. Execute `npm run init-db` para criar as tabelas
3. Execute `npm start` para iniciar a aplicação
4. Configure um proxy reverso (nginx) se necessário

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Caio Mota** - [GitHub](https://github.com/caiomota01)

---

⭐ **YourBoard** - Organize suas tarefas, acompanhe seu progresso, alcance seus objetivos!

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