document.addEventListener('DOMContentLoaded', function() {
  // Carregar tarefas próximas
  carregarTarefasProximas();
  
  // Carregar gráfico de produtividade
  carregarGraficoProdutividade();
  
  // Carregar atalhos
  carregarAtalhos();
  
  // Configurar evento para salvar diário
  document.getElementById('salvar-diario').addEventListener('click', salvarDiarioRapido);
});

// Função para carregar as tarefas mais próximas da data limite
async function carregarTarefasProximas() {
  const container = document.getElementById('proximas-tarefas');
  
  try {
    const response = await fetch('/tarefas');
    const tarefas = await response.json();
    
    // Ordenar por data limite e pegar as 3 mais próximas
    const tarefasProximas = tarefas
      .filter(tarefa => tarefa.deadline && tarefa.status !== 'concluida')
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      .slice(0, 3);

    if (tarefasProximas.length === 0) {
      container.innerHTML = '<p>Nenhuma tarefa próxima encontrada.</p>';
      return;
    }

    let html = '';
    tarefasProximas.forEach(tarefa => {
      const dataLimite = new Date(tarefa.deadline).toLocaleDateString('pt-BR');
      const statusClass = tarefa.status.replace('_', '-');
      html += `
        <div class="task-item">
          <div class="task-info">
            <h4>${tarefa.title}</h4>
            <p>Prazo: ${dataLimite}</p>
            <p>Status: <span class="status-${statusClass}">${tarefa.status}</span></p>
          </div>
          <div class="task-progress">
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${tarefa.progress || 0}%"></div>
            </div>
            <span class="progress-text">${tarefa.progress || 0}%</span>
          </div>
        </div>
      `;
    });
    
    container.innerHTML = html;
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error);
    container.innerHTML = '<p>Erro ao carregar tarefas.</p>';
  }
}

// Função para carregar o gráfico de produtividade
async function carregarGraficoProdutividade() {
  try {
    const response = await fetch('/tarefas');
    const tarefas = await response.json();
    
    // Dados para o gráfico (exemplo)
    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const hoje = new Date();
    const diaSemanaAtual = hoje.getDay();
    
    // Calcular produtividade por dia (tarefas concluídas)
    const produtividadePorDia = new Array(7).fill(0);
    
    tarefas.forEach(tarefa => {
      if (tarefa.status === 'concluida') {
        const dataConclusao = new Date(tarefa.deadline);
        const diaSemana = dataConclusao.getDay();
        const diasAtras = (diaSemanaAtual - diaSemana + 7) % 7;

        if (diasAtras < 7) {
          produtividadePorDia[diaSemana]++;
        }
      }
    });

    // Criar gráfico
    const ctx = document.getElementById('produtividadeChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: diasSemana,
        datasets: [{
          label: 'Tarefas Concluídas',
          data: produtividadePorDia,
          backgroundColor: 'rgba(30, 58, 95, 0.6)',
          borderColor: 'rgba(30, 58, 95, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  } catch (error) {
    console.error('Erro ao carregar gráfico:', error);
  }
}

// Função para carregar atalhos
async function carregarAtalhos() {
  const container = document.getElementById('lista-atalhos');

  try {
    // Por enquanto, usar dados do localStorage
    const atalhos = JSON.parse(localStorage.getItem('atalhos') || '[]');

    if (atalhos.length === 0) {
      container.innerHTML = '<p>Nenhum atalho encontrado.</p>';
      return;
    }

    let html = '';
    atalhos.slice(0, 3).forEach(atalho => {
      html += `
        <div class="atalho-item">
          <h5>${atalho.nome}</h5>
          <a href="${atalho.url}" target="_blank" class="btn btn-sm btn-primary">Acessar</a>
        </div>
      `;
    });

    container.innerHTML = html;
  } catch (error) {
    console.error('Erro ao carregar atalhos:', error);
    container.innerHTML = '<p>Erro ao carregar atalhos.</p>';
  }
}

// Função para salvar diário rápido
function salvarDiarioRapido() {
  const textarea = document.getElementById('diario-rapido');
  const conteudo = textarea.value.trim();

  if (!conteudo) {
    alert('Digite algo no diário antes de salvar.');
    return;
  }

  try {
    const hoje = new Date().toISOString().split('T')[0];
    const entradas = JSON.parse(localStorage.getItem('diario') || '{}');
    entradas[hoje] = conteudo;
    localStorage.setItem('diario', JSON.stringify(entradas));

    textarea.value = '';
    alert('Entrada do diário salva com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar diário:', error);
    alert('Erro ao salvar entrada do diário.');
  }
}