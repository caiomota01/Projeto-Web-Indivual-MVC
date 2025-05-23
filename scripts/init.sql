-- Enable extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  priority INT
);

-- Origins table
CREATE TABLE IF NOT EXISTS origins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  relevance INT
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  status VARCHAR(50),
  desired_date DATE,
  deadline DATE,
  importance INT,
  progress INT,
  user_id UUID REFERENCES users(id),
  category_id UUID REFERENCES categories(id),
  origin_id UUID REFERENCES origins(id)
);

-- Agenda table
CREATE TABLE IF NOT EXISTS agenda (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID REFERENCES tasks(id),
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  notes TEXT
);