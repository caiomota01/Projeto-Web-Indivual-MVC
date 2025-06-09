document.addEventListener('DOMContentLoaded', function() {
  // Configurar data atual
  const hoje = new Date().toISOString().split('T')[0];
  document.getElementById('data-diario').value = hoje;
  
  // Carregar histórico
  carregarHistorico();
  
  // Carregar entrada do dia atual
  carregarEntradaDia(hoje);
  
  // Configurar eventos
  document.getElementById('salvar-diario').addEventListener('click', salvarEntrada);
  document.getElementById('data-diario').addEventListener('change', function() {
    const dataSelecionada = this.value;
    carregarEntradaDia(dataSelecionada);
  });
});

// Carregar entrada de um dia específico
function carregarEntradaDia(data) {
  try {
    const entradas = JSON.parse(localStorage.getItem('diario') || '{}');
    const entrada = entradas[data] || '';
    document.getElementById('conteudo-diario').value = entrada;
  } catch (error) {
    console.error('Erro ao carregar entrada do diário:', error);
  }
}

// Salvar entrada do diário
function salvarEntrada() {
  const data = document.getElementById('data-diario').value;
  const conteudo = document.getElementById('conteudo-diario').value.trim();
  
  if (!data) {
    alert('Selecione uma data.');
    return;
  }
  
  try {
    const entradas = JSON.parse(localStorage.getItem('diario') || '{}');
    
    if (conteudo) {
      entradas[data] = conteudo;
    } else {
      delete entradas[data]; // Remove entrada vazia
    }
    
    localStorage.setItem('diario', JSON.stringify(entradas));
    
    alert('Entrada salva com sucesso!');
    carregarHistorico();
  } catch (error) {
    console.error('Erro ao salvar entrada:', error);
    alert('Erro ao salvar entrada. Tente novamente.');
  }
}

// Carregar histórico de entradas
function carregarHistorico() {
  const container = document.getElementById('historico-diario');
  
  try {
    const entradas = JSON.parse(localStorage.getItem('diario') || '{}');
    const datasOrdenadas = Object.keys(entradas).sort((a, b) => new Date(b) - new Date(a));
    
    if (datasOrdenadas.length === 0) {
      container.innerHTML = '<p>Nenhuma entrada encontrada. Comece escrevendo sua primeira entrada!</p>';
      return;
    }
    
    let html = '';
    datasOrdenadas.forEach(data => {
      const dataFormatada = new Date(data + 'T00:00:00').toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      const conteudo = entradas[data];
      const preview = conteudo.length > 150 ? conteudo.substring(0, 150) + '...' : conteudo;
      
      html += `
        <div class="diario-entry">
          <div class="diario-entry-date">${dataFormatada}</div>
          <div class="diario-entry-content">${preview}</div>
          <div class="diario-entry-actions">
            <button onclick="editarEntrada('${data}')" class="btn btn-sm btn-primary">Editar</button>
            <button onclick="excluirEntrada('${data}')" class="btn btn-sm btn-danger">Excluir</button>
            <button onclick="verEntradaCompleta('${data}')" class="btn btn-sm btn-secondary">Ver Completa</button>
          </div>
        </div>
      `;
    });
    
    container.innerHTML = html;
  } catch (error) {
    console.error('Erro ao carregar histórico:', error);
    container.innerHTML = '<p>Erro ao carregar histórico.</p>';
  }
}

// Editar entrada
function editarEntrada(data) {
  document.getElementById('data-diario').value = data;
  carregarEntradaDia(data);
  
  // Scroll para o formulário
  document.getElementById('data-diario').scrollIntoView({ behavior: 'smooth' });
}

// Excluir entrada
function excluirEntrada(data) {
  if (!confirm('Tem certeza que deseja excluir esta entrada?')) {
    return;
  }
  
  try {
    const entradas = JSON.parse(localStorage.getItem('diario') || '{}');
    delete entradas[data];
    localStorage.setItem('diario', JSON.stringify(entradas));
    
    alert('Entrada excluída com sucesso!');
    carregarHistorico();
    
    // Se estava editando esta entrada, limpar o formulário
    if (document.getElementById('data-diario').value === data) {
      const hoje = new Date().toISOString().split('T')[0];
      document.getElementById('data-diario').value = hoje;
      carregarEntradaDia(hoje);
    }
  } catch (error) {
    console.error('Erro ao excluir entrada:', error);
    alert('Erro ao excluir entrada. Tente novamente.');
  }
}

// Ver entrada completa
function verEntradaCompleta(data) {
  try {
    const entradas = JSON.parse(localStorage.getItem('diario') || '{}');
    const conteudo = entradas[data];
    
    if (!conteudo) {
      alert('Entrada não encontrada.');
      return;
    }
    
    const dataFormatada = new Date(data + 'T00:00:00').toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Criar modal simples
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
        <h3>${dataFormatada}</h3>
        <div style="white-space: pre-wrap; line-height: 1.6; margin-top: 1rem;">${conteudo}</div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Fechar modal ao clicar fora
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.remove();
      }
    });
  } catch (error) {
    console.error('Erro ao exibir entrada:', error);
    alert('Erro ao exibir entrada.');
  }
}

// Função para exportar diário (funcionalidade extra)
function exportarDiario() {
  try {
    const entradas = JSON.parse(localStorage.getItem('diario') || '{}');
    const datasOrdenadas = Object.keys(entradas).sort();
    
    if (datasOrdenadas.length === 0) {
      alert('Nenhuma entrada para exportar.');
      return;
    }
    
    let texto = 'MEU DIÁRIO\n\n';
    
    datasOrdenadas.forEach(data => {
      const dataFormatada = new Date(data + 'T00:00:00').toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      texto += `${dataFormatada}\n`;
      texto += '='.repeat(dataFormatada.length) + '\n';
      texto += entradas[data] + '\n\n';
    });
    
    // Criar e baixar arquivo
    const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meu-diario.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Erro ao exportar diário:', error);
    alert('Erro ao exportar diário.');
  }
}

// Adicionar botão de exportar se não existir
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    const container = document.querySelector('.diario-container');
    if (container && !document.getElementById('exportar-diario')) {
      const exportBtn = document.createElement('button');
      exportBtn.id = 'exportar-diario';
      exportBtn.className = 'btn btn-secondary';
      exportBtn.textContent = 'Exportar Diário';
      exportBtn.onclick = exportarDiario;
      exportBtn.style.marginTop = '1rem';
      
      container.appendChild(exportBtn);
    }
  }, 100);
});
