document.addEventListener('DOMContentLoaded', function() {
  // Carregar dados iniciais
  carregarCategorias();
  carregarOrigens();
  carregarTarefas();
  
  // Configurar eventos
  document.getElementById('form-tarefa').addEventListener('submit', salvarTarefa);
  document.getElementById('cancelar-edicao').addEventListener('click', cancelarEdicao);
  document.getElementById('limpar-filtros').addEventListener('click', limparFiltros);
  
  // Configurar filtros
  document.getElementById('filtro-status').addEventListener('change', aplicarFiltros);
  document.getElementById('filtro-categoria').addEventListener('change', aplicarFiltros);
  document.getElementById('filtro-origem').addEventListener('change', aplicarFiltros);
});

let tarefasData = [];
let editandoTarefa = null;

// Carregar categorias
async function carregarCategorias() {
  try {
    const response = await fetch('/categorias');
    const categorias = await response.json();
    
    const selectTarefa = document.getElementById('categoria-tarefa');
    const selectFiltro = document.getElementById('filtro-categoria');
    
    // Limpar opções existentes (exceto a primeira)
    selectTarefa.innerHTML = '<option value="">Selecione uma categoria</option>';
    selectFiltro.innerHTML = '<option value="">Todas as Categorias</option>';
    
    categorias.forEach(categoria => {
      const option1 = new Option(categoria.name, categoria.id);
      const option2 = new Option(categoria.name, categoria.id);
      selectTarefa.appendChild(option1);
      selectFiltro.appendChild(option2);
    });
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
  }
}

// Carregar origens
async function carregarOrigens() {
  try {
    const response = await fetch('/origens');
    const origens = await response.json();
    
    const selectTarefa = document.getElementById('origem-tarefa');
    const selectFiltro = document.getElementById('filtro-origem');
    
    // Limpar opções existentes (exceto a primeira)
    selectTarefa.innerHTML = '<option value="">Selecione uma origem</option>';
    selectFiltro.innerHTML = '<option value="">Todas as Origens</option>';
    
    origens.forEach(origem => {
      const option1 = new Option(origem.name, origem.id);
      const option2 = new Option(origem.name, origem.id);
      selectTarefa.appendChild(option1);
      selectFiltro.appendChild(option2);
    });
  } catch (error) {
    console.error('Erro ao carregar origens:', error);
  }
}

// Carregar tarefas
async function carregarTarefas() {
  const container = document.getElementById('lista-tarefas');
  container.innerHTML = '<p class="loading">Carregando tarefas...</p>';
  
  try {
    const response = await fetch('/tarefas');
    tarefasData = await response.json();
    
    aplicarFiltros();
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error);
    container.innerHTML = '<p>Erro ao carregar tarefas.</p>';
  }
}

// Aplicar filtros
function aplicarFiltros() {
  const filtroStatus = document.getElementById('filtro-status').value;
  const filtroCategoria = document.getElementById('filtro-categoria').value;
  const filtroOrigem = document.getElementById('filtro-origem').value;
  
  let tarefasFiltradas = tarefasData;
  
  if (filtroStatus) {
    tarefasFiltradas = tarefasFiltradas.filter(t => t.status === filtroStatus);
  }
  
  if (filtroCategoria) {
    tarefasFiltradas = tarefasFiltradas.filter(t => t.category_id === filtroCategoria);
  }
  
  if (filtroOrigem) {
    tarefasFiltradas = tarefasFiltradas.filter(t => t.origin_id === filtroOrigem);
  }
  
  exibirTarefas(tarefasFiltradas);
}

// Exibir tarefas
function exibirTarefas(tarefas) {
  const container = document.getElementById('lista-tarefas');
  
  if (tarefas.length === 0) {
    container.innerHTML = '<p>Nenhuma tarefa encontrada.</p>';
    return;
  }
  
  let html = '';
  tarefas.forEach(tarefa => {
    const dataDesejada = tarefa.desired_date ? new Date(tarefa.desired_date).toLocaleDateString('pt-BR') : 'Não definida';
    const dataLimite = tarefa.deadline ? new Date(tarefa.deadline).toLocaleDateString('pt-BR') : 'Não definida';
    const statusClass = tarefa.status.replace('_', '-');
    
    html += `
      <div class="task-item" data-id="${tarefa.id}">
        <div class="task-info">
          <h4>${tarefa.title}</h4>
          <p>${tarefa.description || 'Sem descrição'}</p>
          <p><strong>Data Desejada:</strong> ${dataDesejada}</p>
          <p><strong>Data Limite:</strong> ${dataLimite}</p>
          <p><strong>Status:</strong> <span class="status-${statusClass}">${tarefa.status}</span></p>
          <p><strong>Importância:</strong> ${tarefa.importance}/5</p>
        </div>
        <div class="task-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${tarefa.progress || 0}%"></div>
          </div>
          <span class="progress-text">${tarefa.progress || 0}%</span>
        </div>
        <div class="task-actions">
          <button onclick="editarTarefa('${tarefa.id}')" class="btn btn-sm btn-primary">Editar</button>
          <button onclick="excluirTarefa('${tarefa.id}')" class="btn btn-sm btn-danger">Excluir</button>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

// Salvar tarefa
async function salvarTarefa(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const dados = Object.fromEntries(formData.entries());
  
  // Converter valores numéricos
  dados.importance = parseInt(dados.importance);
  dados.progress = parseInt(dados.progress);
  
  try {
    let response;
    if (editandoTarefa) {
      response = await fetch(`/tarefas/${editandoTarefa}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      });
    } else {
      response = await fetch('/tarefas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      });
    }
    
    if (response.ok) {
      alert(editandoTarefa ? 'Tarefa atualizada com sucesso!' : 'Tarefa criada com sucesso!');
      cancelarEdicao();
      carregarTarefas();
    } else {
      throw new Error('Erro ao salvar tarefa');
    }
  } catch (error) {
    console.error('Erro ao salvar tarefa:', error);
    alert('Erro ao salvar tarefa. Tente novamente.');
  }
}

// Editar tarefa
function editarTarefa(id) {
  const tarefa = tarefasData.find(t => t.id === id);
  if (!tarefa) return;
  
  editandoTarefa = id;
  
  // Preencher formulário
  document.getElementById('titulo-tarefa').value = tarefa.title;
  document.getElementById('descricao-tarefa').value = tarefa.description || '';
  document.getElementById('categoria-tarefa').value = tarefa.category_id || '';
  document.getElementById('origem-tarefa').value = tarefa.origin_id || '';
  document.getElementById('data-desejada').value = tarefa.desired_date || '';
  document.getElementById('data-limite').value = tarefa.deadline || '';
  document.getElementById('importancia').value = tarefa.importance || 3;
  document.getElementById('progresso').value = tarefa.progress || 0;
  document.getElementById('status-tarefa').value = tarefa.status || 'pendente';
  
  // Mostrar botão cancelar e alterar texto do botão salvar
  document.getElementById('cancelar-edicao').style.display = 'inline-block';
  document.querySelector('#form-tarefa button[type="submit"]').textContent = 'Atualizar Tarefa';
  
  // Scroll para o formulário
  document.getElementById('form-tarefa').scrollIntoView({ behavior: 'smooth' });
}

// Cancelar edição
function cancelarEdicao() {
  editandoTarefa = null;
  document.getElementById('form-tarefa').reset();
  document.getElementById('cancelar-edicao').style.display = 'none';
  document.querySelector('#form-tarefa button[type="submit"]').textContent = 'Salvar Tarefa';
}

// Excluir tarefa
async function excluirTarefa(id) {
  if (!confirm('Tem certeza que deseja excluir esta tarefa?')) {
    return;
  }
  
  try {
    const response = await fetch(`/tarefas/${id}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      alert('Tarefa excluída com sucesso!');
      carregarTarefas();
    } else {
      throw new Error('Erro ao excluir tarefa');
    }
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
    alert('Erro ao excluir tarefa. Tente novamente.');
  }
}

// Limpar filtros
function limparFiltros() {
  document.getElementById('filtro-status').value = '';
  document.getElementById('filtro-categoria').value = '';
  document.getElementById('filtro-origem').value = '';
  aplicarFiltros();
}
