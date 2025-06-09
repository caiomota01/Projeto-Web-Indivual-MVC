document.addEventListener('DOMContentLoaded', function() {
  // Carregar todos os gráficos
  carregarGraficoStatus();
  carregarGraficoCategoria();
  carregarGraficoOrigem();
  carregarGraficoEvolucao();
});

// Gráfico de tarefas por status
async function carregarGraficoStatus() {
  try {
    const response = await fetch('/tarefas');
    const tarefas = await response.json();
    
    // Contar tarefas por status
    const statusCount = {};
    tarefas.forEach(tarefa => {
      const status = tarefa.status || 'sem_status';
      statusCount[status] = (statusCount[status] || 0) + 1;
    });
    
    const labels = Object.keys(statusCount).map(status => {
      switch(status) {
        case 'pendente': return 'Pendente';
        case 'em_andamento': return 'Em Andamento';
        case 'concluida': return 'Concluída';
        case 'cancelada': return 'Cancelada';
        default: return 'Sem Status';
      }
    });
    
    const data = Object.values(statusCount);
    const colors = [
      '#F59E0B', // Pendente - Amarelo
      '#3B82F6', // Em Andamento - Azul
      '#10B981', // Concluída - Verde
      '#EF4444', // Cancelada - Vermelho
      '#6B7280'  // Sem Status - Cinza
    ];
    
    const ctx = document.getElementById('statusChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors.slice(0, labels.length),
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Distribuição por Status'
          }
        }
      }
    });
  } catch (error) {
    console.error('Erro ao carregar gráfico de status:', error);
  }
}

// Gráfico de progresso por categoria
async function carregarGraficoCategoria() {
  try {
    const [tarefasResponse, categoriasResponse] = await Promise.all([
      fetch('/tarefas'),
      fetch('/categorias')
    ]);
    
    const tarefas = await tarefasResponse.json();
    const categorias = await categoriasResponse.json();
    
    // Criar mapa de categorias
    const categoriaMap = {};
    categorias.forEach(cat => {
      categoriaMap[cat.id] = cat.name;
    });
    
    // Calcular progresso médio por categoria
    const categoriaProgress = {};
    const categoriaCount = {};
    
    tarefas.forEach(tarefa => {
      const catId = tarefa.category_id;
      const catName = categoriaMap[catId] || 'Sem Categoria';
      const progress = tarefa.progress || 0;
      
      if (!categoriaProgress[catName]) {
        categoriaProgress[catName] = 0;
        categoriaCount[catName] = 0;
      }
      
      categoriaProgress[catName] += progress;
      categoriaCount[catName]++;
    });
    
    // Calcular médias
    const labels = Object.keys(categoriaProgress);
    const data = labels.map(cat => 
      categoriaCount[cat] > 0 ? Math.round(categoriaProgress[cat] / categoriaCount[cat]) : 0
    );
    
    const ctx = document.getElementById('categoriaChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Progresso Médio (%)',
          data: data,
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
            max: 100,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Progresso Médio por Categoria'
          }
        }
      }
    });
  } catch (error) {
    console.error('Erro ao carregar gráfico de categoria:', error);
  }
}

// Gráfico de tarefas por origem
async function carregarGraficoOrigem() {
  try {
    const [tarefasResponse, origensResponse] = await Promise.all([
      fetch('/tarefas'),
      fetch('/origens')
    ]);
    
    const tarefas = await tarefasResponse.json();
    const origens = await origensResponse.json();
    
    // Criar mapa de origens
    const origemMap = {};
    origens.forEach(origem => {
      origemMap[origem.id] = origem.name;
    });
    
    // Contar tarefas por origem
    const origemCount = {};
    tarefas.forEach(tarefa => {
      const origemId = tarefa.origin_id;
      const origemName = origemMap[origemId] || 'Sem Origem';
      origemCount[origemName] = (origemCount[origemName] || 0) + 1;
    });
    
    const labels = Object.keys(origemCount);
    const data = Object.values(origemCount);
    
    const ctx = document.getElementById('origemChart').getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            '#F97316', // Laranja
            '#8B5CF6', // Roxo
            '#06B6D4', // Ciano
            '#84CC16', // Lima
            '#F59E0B', // Âmbar
            '#EF4444'  // Vermelho
          ],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Tarefas por Origem'
          }
        }
      }
    });
  } catch (error) {
    console.error('Erro ao carregar gráfico de origem:', error);
  }
}

// Gráfico de evolução semanal
async function carregarGraficoEvolucao() {
  try {
    const response = await fetch('/tarefas');
    const tarefas = await response.json();
    
    // Calcular dados dos últimos 7 dias
    const hoje = new Date();
    const diasSemana = [];
    const tarefasCriadas = [];
    const tarefasConcluidas = [];
    
    for (let i = 6; i >= 0; i--) {
      const data = new Date(hoje);
      data.setDate(data.getDate() - i);
      const dataStr = data.toISOString().split('T')[0];
      
      diasSemana.push(data.toLocaleDateString('pt-BR', { weekday: 'short' }));
      
      // Contar tarefas criadas neste dia (simulado - usando data limite como referência)
      const criadasNoDia = tarefas.filter(tarefa => {
        if (!tarefa.desired_date) return false;
        return tarefa.desired_date.startsWith(dataStr);
      }).length;
      
      // Contar tarefas concluídas neste dia (simulado)
      const concluidasNoDia = tarefas.filter(tarefa => {
        if (tarefa.status !== 'concluida' || !tarefa.deadline) return false;
        return tarefa.deadline.startsWith(dataStr);
      }).length;
      
      tarefasCriadas.push(criadasNoDia);
      tarefasConcluidas.push(concluidasNoDia);
    }
    
    const ctx = document.getElementById('evolucaoChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: diasSemana,
        datasets: [
          {
            label: 'Tarefas Criadas',
            data: tarefasCriadas,
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Tarefas Concluídas',
            data: tarefasConcluidas,
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
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
        },
        plugins: {
          title: {
            display: true,
            text: 'Evolução dos Últimos 7 Dias'
          }
        }
      }
    });
  } catch (error) {
    console.error('Erro ao carregar gráfico de evolução:', error);
  }
}

// Função para atualizar todos os gráficos
function atualizarGraficos() {
  // Destruir gráficos existentes
  Chart.helpers.each(Chart.instances, function(instance) {
    instance.destroy();
  });
  
  // Recriar gráficos
  carregarGraficoStatus();
  carregarGraficoCategoria();
  carregarGraficoOrigem();
  carregarGraficoEvolucao();
}

// Adicionar botão de atualizar
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    const container = document.querySelector('.graficos-container');
    if (container && !document.getElementById('atualizar-graficos')) {
      const updateBtn = document.createElement('button');
      updateBtn.id = 'atualizar-graficos';
      updateBtn.className = 'btn btn-primary';
      updateBtn.textContent = 'Atualizar Gráficos';
      updateBtn.onclick = atualizarGraficos;
      updateBtn.style.marginBottom = '1rem';
      
      container.insertBefore(updateBtn, container.firstChild);
    }
  }, 100);
});
