-- Inserir dados de exemplo para teste

-- Categorias
INSERT INTO categories (name, priority) VALUES 
('Trabalho', 5),
('Estudos', 4),
('Pessoal', 3),
('Saúde', 5),
('Projetos', 4),
('Casa', 2)
ON CONFLICT DO NOTHING;

-- Origens
INSERT INTO origins (name, relevance) VALUES 
('Email', 4),
('Reunião', 5),
('Ideia Própria', 3),
('Solicitação', 4),
('Planejamento', 5),
('Urgente', 5)
ON CONFLICT DO NOTHING;

-- Usuário de exemplo
INSERT INTO users (name, email, password) VALUES 
('Usuário Teste', 'teste@exemplo.com', 'senha123')
ON CONFLICT (email) DO NOTHING;

-- Tarefas de exemplo
INSERT INTO tasks (title, description, status, desired_date, deadline, importance, progress, user_id, category_id, origin_id)
SELECT 
  'Finalizar relatório mensal',
  'Compilar dados e criar relatório de performance do mês',
  'em_andamento',
  CURRENT_DATE + INTERVAL '2 days',
  CURRENT_DATE + INTERVAL '5 days',
  4,
  60,
  u.id,
  c.id,
  o.id
FROM users u, categories c, origins o
WHERE u.email = 'teste@exemplo.com' 
  AND c.name = 'Trabalho' 
  AND o.name = 'Planejamento'
LIMIT 1;

INSERT INTO tasks (title, description, status, desired_date, deadline, importance, progress, user_id, category_id, origin_id)
SELECT 
  'Estudar JavaScript avançado',
  'Completar curso online de JavaScript ES6+',
  'pendente',
  CURRENT_DATE + INTERVAL '1 day',
  CURRENT_DATE + INTERVAL '7 days',
  3,
  25,
  u.id,
  c.id,
  o.id
FROM users u, categories c, origins o
WHERE u.email = 'teste@exemplo.com' 
  AND c.name = 'Estudos' 
  AND o.name = 'Ideia Própria'
LIMIT 1;

INSERT INTO tasks (title, description, status, desired_date, deadline, importance, progress, user_id, category_id, origin_id)
SELECT 
  'Consulta médica',
  'Agendar e comparecer à consulta de rotina',
  'concluida',
  CURRENT_DATE - INTERVAL '1 day',
  CURRENT_DATE,
  5,
  100,
  u.id,
  c.id,
  o.id
FROM users u, categories c, origins o
WHERE u.email = 'teste@exemplo.com' 
  AND c.name = 'Saúde' 
  AND o.name = 'Planejamento'
LIMIT 1;

INSERT INTO tasks (title, description, status, desired_date, deadline, importance, progress, user_id, category_id, origin_id)
SELECT 
  'Organizar escritório',
  'Limpar e organizar mesa de trabalho',
  'pendente',
  CURRENT_DATE + INTERVAL '3 days',
  CURRENT_DATE + INTERVAL '10 days',
  2,
  0,
  u.id,
  c.id,
  o.id
FROM users u, categories c, origins o
WHERE u.email = 'teste@exemplo.com' 
  AND c.name = 'Casa' 
  AND o.name = 'Ideia Própria'
LIMIT 1;

INSERT INTO tasks (title, description, status, desired_date, deadline, importance, progress, user_id, category_id, origin_id)
SELECT
  'Responder emails importantes',
  'Verificar e responder emails pendentes da semana',
  'em_andamento',
  CURRENT_DATE,
  CURRENT_DATE + INTERVAL '2 days',
  4,
  40,
  u.id,
  c.id,
  o.id
FROM users u, categories c, origins o
WHERE u.email = 'teste@exemplo.com'
  AND c.name = 'Trabalho'
  AND o.name = 'Email'
LIMIT 1;

INSERT INTO tasks (title, description, status, desired_date, deadline, importance, progress, user_id, category_id, origin_id)
SELECT
  'Preparar apresentação para cliente',
  'Criar slides e ensaiar apresentação do projeto para reunião com cliente na próxima semana. Incluir demonstração do protótipo e cronograma de entrega.',
  'pendente',
  CURRENT_DATE + INTERVAL '3 days',
  CURRENT_DATE + INTERVAL '6 days',
  5,
  15,
  u.id,
  c.id,
  o.id
FROM users u, categories c, origins o
WHERE u.email = 'teste@exemplo.com'
  AND c.name = 'Trabalho'
  AND o.name = 'Reunião'
LIMIT 1;

INSERT INTO tasks (title, description, status, desired_date, deadline, importance, progress, user_id, category_id, origin_id)
SELECT
  'Ler livro "Clean Code"',
  'Continuar leitura do livro sobre boas práticas de programação. Meta: terminar os capítulos 5-8 esta semana.',
  'em_andamento',
  CURRENT_DATE + INTERVAL '1 day',
  CURRENT_DATE + INTERVAL '14 days',
  3,
  65,
  u.id,
  c.id,
  o.id
FROM users u, categories c, origins o
WHERE u.email = 'teste@exemplo.com'
  AND c.name = 'Estudos'
  AND o.name = 'Ideia Própria'
LIMIT 1;

INSERT INTO tasks (title, description, status, desired_date, deadline, importance, progress, user_id, category_id, origin_id)
SELECT
  'Fazer exercícios físicos',
  'Manter rotina de exercícios: 30 minutos de caminhada ou academia, 3x por semana.',
  'em_andamento',
  CURRENT_DATE,
  CURRENT_DATE + INTERVAL '7 days',
  4,
  80,
  u.id,
  c.id,
  o.id
FROM users u, categories c, origins o
WHERE u.email = 'teste@exemplo.com'
  AND c.name = 'Saúde'
  AND o.name = 'Planejamento'
LIMIT 1;

INSERT INTO tasks (title, description, status, desired_date, deadline, importance, progress, user_id, category_id, origin_id)
SELECT
  'Planejar viagem de férias',
  'Pesquisar destinos, comparar preços de passagens e hotéis. Definir roteiro e fazer reservas.',
  'pendente',
  CURRENT_DATE + INTERVAL '5 days',
  CURRENT_DATE + INTERVAL '30 days',
  2,
  10,
  u.id,
  c.id,
  o.id
FROM users u, categories c, origins o
WHERE u.email = 'teste@exemplo.com'
  AND c.name = 'Pessoal'
  AND o.name = 'Ideia Própria'
LIMIT 1;

INSERT INTO tasks (title, description, status, desired_date, deadline, importance, progress, user_id, category_id, origin_id)
SELECT
  'Atualizar portfólio online',
  'Adicionar projetos recentes, atualizar CV e melhorar design do site pessoal.',
  'pendente',
  CURRENT_DATE + INTERVAL '2 days',
  CURRENT_DATE + INTERVAL '10 days',
  3,
  0,
  u.id,
  c.id,
  o.id
FROM users u, categories c, origins o
WHERE u.email = 'teste@exemplo.com'
  AND c.name = 'Projetos'
  AND o.name = 'Ideia Própria'
LIMIT 1;

-- Agendamentos de exemplo
INSERT INTO agenda (task_id, start_time, end_time, notes)
SELECT 
  t.id,
  CURRENT_DATE + INTERVAL '1 day' + TIME '09:00:00',
  CURRENT_DATE + INTERVAL '1 day' + TIME '11:00:00',
  'Bloco focado para finalizar o relatório'
FROM tasks t
WHERE t.title = 'Finalizar relatório mensal'
LIMIT 1;

INSERT INTO agenda (task_id, start_time, end_time, notes)
SELECT
  t.id,
  CURRENT_DATE + INTERVAL '2 days' + TIME '14:00:00',
  CURRENT_DATE + INTERVAL '2 days' + TIME '16:00:00',
  'Sessão de estudos concentrada'
FROM tasks t
WHERE t.title = 'Estudar JavaScript avançado'
LIMIT 1;

INSERT INTO agenda (task_id, start_time, end_time, notes)
SELECT
  t.id,
  CURRENT_DATE + INTERVAL '3 days' + TIME '10:00:00',
  CURRENT_DATE + INTERVAL '3 days' + TIME '12:00:00',
  'Trabalhar na apresentação - criar slides'
FROM tasks t
WHERE t.title = 'Preparar apresentação para cliente'
LIMIT 1;

INSERT INTO agenda (task_id, start_time, end_time, notes)
SELECT
  t.id,
  CURRENT_DATE + INTERVAL '1 day' + TIME '07:00:00',
  CURRENT_DATE + INTERVAL '1 day' + TIME '07:30:00',
  'Caminhada matinal no parque'
FROM tasks t
WHERE t.title = 'Fazer exercícios físicos'
LIMIT 1;

INSERT INTO agenda (task_id, start_time, end_time, notes)
SELECT
  t.id,
  CURRENT_DATE + INTERVAL '4 days' + TIME '19:00:00',
  CURRENT_DATE + INTERVAL '4 days' + TIME '20:30:00',
  'Leitura noturna - capítulos 5-6'
FROM tasks t
WHERE t.title = 'Ler livro "Clean Code"'
LIMIT 1;
