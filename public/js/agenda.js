document.addEventListener('DOMContentLoaded', function() {
  // Inicializar calendário
  inicializarCalendario();
  
  // Carregar tarefas para o select
  carregarTarefasSelect();
  
  // Configurar eventos
  document.getElementById('prev-month').addEventListener('click', mesAnterior);
  document.getElementById('next-month').addEventListener('click', proximoMes);
  document.getElementById('form-agenda').addEventListener('submit', salvarAgenda);
  document.getElementById('cancelar-agenda').addEventListener('click', cancelarAgenda);
});

let dataAtual = new Date();
let dataSelecionada = null;
let agendamentos = [];

// Inicializar calendário
function inicializarCalendario() {
  carregarAgendamentos();
  renderizarCalendario();
}

// Carregar agendamentos
async function carregarAgendamentos() {
  try {
    const response = await fetch('/agendas');
    agendamentos = await response.json();
  } catch (error) {
    console.error('Erro ao carregar agendamentos:', error);
    agendamentos = [];
  }
}

// Renderizar calendário
function renderizarCalendario() {
  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();
  
  // Atualizar título do mês
  const nomesMeses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  document.getElementById('current-month').textContent = `${nomesMeses[mes]} ${ano}`;
  
  // Calcular primeiro dia do mês e número de dias
  const primeiroDia = new Date(ano, mes, 1);
  const ultimoDia = new Date(ano, mes + 1, 0);
  const diasNoMes = ultimoDia.getDate();
  const diaSemanaInicio = primeiroDia.getDay();
  
  const calendarBody = document.getElementById('calendar-body');
  calendarBody.innerHTML = '';
  
  // Adicionar dias vazios do mês anterior
  for (let i = 0; i < diaSemanaInicio; i++) {
    const diaVazio = document.createElement('div');
    diaVazio.className = 'calendar-day empty';
    calendarBody.appendChild(diaVazio);
  }
  
  // Adicionar dias do mês atual
  const hoje = new Date();
  for (let dia = 1; dia <= diasNoMes; dia++) {
    const dataCompleta = new Date(ano, mes, dia);
    const dataStr = dataCompleta.toISOString().split('T')[0];
    
    const diaElement = document.createElement('div');
    diaElement.className = 'calendar-day';
    diaElement.textContent = dia;
    diaElement.dataset.date = dataStr;
    
    // Marcar dia atual
    if (dataCompleta.toDateString() === hoje.toDateString()) {
      diaElement.classList.add('today');
    }
    
    // Verificar se há agendamentos neste dia
    const agendamentosNoDia = agendamentos.filter(agenda => {
      if (!agenda.start_time) return false;
      return agenda.start_time.startsWith(dataStr);
    });
    
    if (agendamentosNoDia.length > 0) {
      diaElement.classList.add('has-tasks');
      
      // Adicionar contador de tarefas
      const contador = document.createElement('div');
      contador.className = 'task-count';
      contador.textContent = agendamentosNoDia.length;
      diaElement.appendChild(contador);
    }
    
    // Adicionar evento de clique
    diaElement.addEventListener('click', () => selecionarDia(dataStr));
    
    calendarBody.appendChild(diaElement);
  }
}

// Selecionar dia
function selecionarDia(dataStr) {
  // Remover seleção anterior
  document.querySelectorAll('.calendar-day.selected').forEach(el => {
    el.classList.remove('selected');
  });
  
  // Adicionar seleção atual
  const diaElement = document.querySelector(`[data-date="${dataStr}"]`);
  if (diaElement) {
    diaElement.classList.add('selected');
  }
  
  dataSelecionada = dataStr;
  
  // Atualizar título e carregar tarefas do dia
  const dataFormatada = new Date(dataStr + 'T00:00:00').toLocaleDateString('pt-BR');
  document.getElementById('selected-date').textContent = dataFormatada;
  
  carregarTarefasDoDia(dataStr);
  
  // Mostrar formulário de agendamento
  document.getElementById('form-agenda-container').style.display = 'block';
  
  // Pré-preencher data no formulário
  document.getElementById('data-inicio').value = dataStr + 'T09:00';
  document.getElementById('data-fim').value = dataStr + 'T10:00';
}

// Carregar tarefas do dia selecionado
function carregarTarefasDoDia(dataStr) {
  const container = document.getElementById('tarefas-do-dia');
  
  const agendamentosNoDia = agendamentos.filter(agenda => {
    if (!agenda.start_time) return false;
    return agenda.start_time.startsWith(dataStr);
  });
  
  if (agendamentosNoDia.length === 0) {
    container.innerHTML = '<p>Nenhuma tarefa agendada para este dia.</p>';
    return;
  }
  
  let html = '';
  agendamentosNoDia.forEach(agenda => {
    const inicio = new Date(agenda.start_time).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    const fim = new Date(agenda.end_time).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    html += `
      <div class="agenda-item">
        <div class="agenda-time">${inicio} - ${fim}</div>
        <div class="agenda-task">Tarefa ID: ${agenda.task_id}</div>
        <div class="agenda-notes">${agenda.notes || 'Sem anotações'}</div>
        <div class="agenda-actions">
          <button onclick="editarAgenda('${agenda.id}')" class="btn btn-sm btn-primary">Editar</button>
          <button onclick="excluirAgenda('${agenda.id}')" class="btn btn-sm btn-danger">Excluir</button>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

// Carregar tarefas para o select
async function carregarTarefasSelect() {
  try {
    const response = await fetch('/tarefas');
    const tarefas = await response.json();
    
    const select = document.getElementById('tarefa-agenda');
    select.innerHTML = '<option value="">Selecione uma tarefa</option>';
    
    tarefas.forEach(tarefa => {
      const option = new Option(tarefa.title, tarefa.id);
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error);
  }
}

// Navegar para mês anterior
function mesAnterior() {
  dataAtual.setMonth(dataAtual.getMonth() - 1);
  renderizarCalendario();
}

// Navegar para próximo mês
function proximoMes() {
  dataAtual.setMonth(dataAtual.getMonth() + 1);
  renderizarCalendario();
}

// Salvar agendamento
async function salvarAgenda(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const dados = Object.fromEntries(formData.entries());
  
  // Validações
  if (!dados.task_id) {
    alert('Selecione uma tarefa.');
    return;
  }
  
  if (!dados.start_time || !dados.end_time) {
    alert('Defina horário de início e fim.');
    return;
  }
  
  if (new Date(dados.start_time) >= new Date(dados.end_time)) {
    alert('Horário de início deve ser anterior ao horário de fim.');
    return;
  }
  
  try {
    const response = await fetch('/agendas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });
    
    if (response.ok) {
      alert('Agendamento criado com sucesso!');
      cancelarAgenda();
      carregarAgendamentos().then(() => {
        renderizarCalendario();
        if (dataSelecionada) {
          carregarTarefasDoDia(dataSelecionada);
        }
      });
    } else {
      throw new Error('Erro ao criar agendamento');
    }
  } catch (error) {
    console.error('Erro ao salvar agendamento:', error);
    alert('Erro ao salvar agendamento. Tente novamente.');
  }
}

// Cancelar agendamento
function cancelarAgenda() {
  document.getElementById('form-agenda').reset();
  document.getElementById('form-agenda-container').style.display = 'none';
}

// Editar agendamento
function editarAgenda(id) {
  const agenda = agendamentos.find(a => a.id === id);
  if (!agenda) return;
  
  // Preencher formulário
  document.getElementById('tarefa-agenda').value = agenda.task_id;
  document.getElementById('data-inicio').value = agenda.start_time.slice(0, 16);
  document.getElementById('data-fim').value = agenda.end_time.slice(0, 16);
  document.getElementById('anotacoes-agenda').value = agenda.notes || '';
  
  // Mostrar formulário
  document.getElementById('form-agenda-container').style.display = 'block';
  
  // Alterar comportamento do formulário para edição
  const form = document.getElementById('form-agenda');
  form.onsubmit = async function(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const dados = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch(`/agendas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      });
      
      if (response.ok) {
        alert('Agendamento atualizado com sucesso!');
        cancelarAgenda();
        // Restaurar comportamento original do formulário
        form.onsubmit = salvarAgenda;
        carregarAgendamentos().then(() => {
          renderizarCalendario();
          if (dataSelecionada) {
            carregarTarefasDoDia(dataSelecionada);
          }
        });
      } else {
        throw new Error('Erro ao atualizar agendamento');
      }
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error);
      alert('Erro ao atualizar agendamento. Tente novamente.');
    }
  };
}

// Excluir agendamento
async function excluirAgenda(id) {
  if (!confirm('Tem certeza que deseja excluir este agendamento?')) {
    return;
  }
  
  try {
    const response = await fetch(`/agendas/${id}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      alert('Agendamento excluído com sucesso!');
      carregarAgendamentos().then(() => {
        renderizarCalendario();
        if (dataSelecionada) {
          carregarTarefasDoDia(dataSelecionada);
        }
      });
    } else {
      throw new Error('Erro ao excluir agendamento');
    }
  } catch (error) {
    console.error('Erro ao excluir agendamento:', error);
    alert('Erro ao excluir agendamento. Tente novamente.');
  }
}
