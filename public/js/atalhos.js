document.addEventListener('DOMContentLoaded', function() {
  // Carregar atalhos
  carregarAtalhos();
  
  // Configurar eventos
  document.getElementById('form-atalho').addEventListener('submit', salvarAtalho);
});

let editandoAtalho = null;

// Carregar atalhos
function carregarAtalhos() {
  const container = document.getElementById('lista-atalhos');
  
  try {
    const atalhos = JSON.parse(localStorage.getItem('atalhos') || '[]');
    
    if (atalhos.length === 0) {
      container.innerHTML = '<p>Nenhum atalho encontrado. Adicione seu primeiro atalho!</p>';
      return;
    }
    
    let html = '';
    atalhos.forEach((atalho, index) => {
      html += `
        <div class="atalho-item" data-index="${index}">
          <h4>${atalho.nome}</h4>
          <p>${atalho.descricao || 'Sem descrição'}</p>
          <div class="atalho-actions">
            <a href="${atalho.url}" target="_blank" class="btn btn-primary">Acessar</a>
            <button onclick="editarAtalho(${index})" class="btn btn-sm btn-secondary">Editar</button>
            <button onclick="excluirAtalho(${index})" class="btn btn-sm btn-danger">Excluir</button>
          </div>
        </div>
      `;
    });
    
    container.innerHTML = html;
  } catch (error) {
    console.error('Erro ao carregar atalhos:', error);
    container.innerHTML = '<p>Erro ao carregar atalhos.</p>';
  }
}

// Salvar atalho
function salvarAtalho(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const dados = {
    nome: formData.get('nome').trim(),
    url: formData.get('url').trim(),
    descricao: formData.get('descricao').trim()
  };
  
  // Validações
  if (!dados.nome) {
    alert('Nome é obrigatório.');
    return;
  }
  
  if (!dados.url) {
    alert('URL é obrigatória.');
    return;
  }
  
  // Validar URL
  try {
    new URL(dados.url);
  } catch (error) {
    alert('URL inválida. Certifique-se de incluir http:// ou https://');
    return;
  }
  
  try {
    const atalhos = JSON.parse(localStorage.getItem('atalhos') || '[]');
    
    if (editandoAtalho !== null) {
      // Editando atalho existente
      atalhos[editandoAtalho] = dados;
      alert('Atalho atualizado com sucesso!');
    } else {
      // Novo atalho
      atalhos.push(dados);
      alert('Atalho adicionado com sucesso!');
    }
    
    localStorage.setItem('atalhos', JSON.stringify(atalhos));
    
    // Limpar formulário e recarregar lista
    cancelarEdicao();
    carregarAtalhos();
  } catch (error) {
    console.error('Erro ao salvar atalho:', error);
    alert('Erro ao salvar atalho. Tente novamente.');
  }
}

// Editar atalho
function editarAtalho(index) {
  try {
    const atalhos = JSON.parse(localStorage.getItem('atalhos') || '[]');
    const atalho = atalhos[index];
    
    if (!atalho) {
      alert('Atalho não encontrado.');
      return;
    }
    
    editandoAtalho = index;
    
    // Preencher formulário
    document.getElementById('nome-atalho').value = atalho.nome;
    document.getElementById('url-atalho').value = atalho.url;
    document.getElementById('descricao-atalho').value = atalho.descricao || '';
    
    // Alterar texto do botão
    const submitBtn = document.querySelector('#form-atalho button[type="submit"]');
    submitBtn.textContent = 'Atualizar Atalho';
    
    // Adicionar botão cancelar se não existir
    let cancelBtn = document.getElementById('cancelar-edicao-atalho');
    if (!cancelBtn) {
      cancelBtn = document.createElement('button');
      cancelBtn.id = 'cancelar-edicao-atalho';
      cancelBtn.type = 'button';
      cancelBtn.className = 'btn btn-secondary';
      cancelBtn.textContent = 'Cancelar';
      cancelBtn.onclick = cancelarEdicao;
      submitBtn.parentNode.insertBefore(cancelBtn, submitBtn.nextSibling);
    }
    cancelBtn.style.display = 'inline-block';
    
    // Scroll para o formulário
    document.getElementById('form-atalho').scrollIntoView({ behavior: 'smooth' });
  } catch (error) {
    console.error('Erro ao editar atalho:', error);
    alert('Erro ao editar atalho.');
  }
}

// Cancelar edição
function cancelarEdicao() {
  editandoAtalho = null;
  document.getElementById('form-atalho').reset();
  
  // Restaurar texto do botão
  const submitBtn = document.querySelector('#form-atalho button[type="submit"]');
  submitBtn.textContent = 'Salvar Atalho';
  
  // Esconder botão cancelar
  const cancelBtn = document.getElementById('cancelar-edicao-atalho');
  if (cancelBtn) {
    cancelBtn.style.display = 'none';
  }
}

// Excluir atalho
function excluirAtalho(index) {
  if (!confirm('Tem certeza que deseja excluir este atalho?')) {
    return;
  }
  
  try {
    const atalhos = JSON.parse(localStorage.getItem('atalhos') || '[]');
    atalhos.splice(index, 1);
    localStorage.setItem('atalhos', JSON.stringify(atalhos));
    
    alert('Atalho excluído com sucesso!');
    
    // Se estava editando este atalho, cancelar edição
    if (editandoAtalho === index) {
      cancelarEdicao();
    } else if (editandoAtalho !== null && editandoAtalho > index) {
      // Ajustar índice se estava editando um atalho posterior
      editandoAtalho--;
    }
    
    carregarAtalhos();
  } catch (error) {
    console.error('Erro ao excluir atalho:', error);
    alert('Erro ao excluir atalho. Tente novamente.');
  }
}

// Função para importar atalhos (funcionalidade extra)
function importarAtalhos() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const novosAtalhos = JSON.parse(e.target.result);
        
        if (!Array.isArray(novosAtalhos)) {
          alert('Arquivo inválido. Deve conter um array de atalhos.');
          return;
        }
        
        // Validar estrutura dos atalhos
        const atalhosValidos = novosAtalhos.filter(atalho => 
          atalho.nome && atalho.url && typeof atalho.nome === 'string' && typeof atalho.url === 'string'
        );
        
        if (atalhosValidos.length === 0) {
          alert('Nenhum atalho válido encontrado no arquivo.');
          return;
        }
        
        const atalhosExistentes = JSON.parse(localStorage.getItem('atalhos') || '[]');
        const todosAtalhos = [...atalhosExistentes, ...atalhosValidos];
        
        localStorage.setItem('atalhos', JSON.stringify(todosAtalhos));
        
        alert(`${atalhosValidos.length} atalho(s) importado(s) com sucesso!`);
        carregarAtalhos();
      } catch (error) {
        console.error('Erro ao importar atalhos:', error);
        alert('Erro ao importar atalhos. Verifique se o arquivo é válido.');
      }
    };
    
    reader.readAsText(file);
  };
  
  input.click();
}

// Função para exportar atalhos
function exportarAtalhos() {
  try {
    const atalhos = JSON.parse(localStorage.getItem('atalhos') || '[]');
    
    if (atalhos.length === 0) {
      alert('Nenhum atalho para exportar.');
      return;
    }
    
    const blob = new Blob([JSON.stringify(atalhos, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meus-atalhos.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Erro ao exportar atalhos:', error);
    alert('Erro ao exportar atalhos.');
  }
}

// Adicionar botões de importar/exportar
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    const container = document.querySelector('.atalhos-container');
    if (container && !document.getElementById('atalhos-extras')) {
      const extrasDiv = document.createElement('div');
      extrasDiv.id = 'atalhos-extras';
      extrasDiv.className = 'card';
      extrasDiv.innerHTML = `
        <h3 class="card-title">Gerenciar Atalhos</h3>
        <div style="display: flex; gap: 1rem;">
          <button onclick="exportarAtalhos()" class="btn btn-secondary">Exportar Atalhos</button>
          <button onclick="importarAtalhos()" class="btn btn-secondary">Importar Atalhos</button>
        </div>
      `;
      
      container.appendChild(extrasDiv);
    }
  }, 100);
});
