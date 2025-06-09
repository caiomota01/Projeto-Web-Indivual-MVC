// Funcionalidades comuns para todas as páginas

// Toggle do menu mobile
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
}

// Fechar sidebar ao clicar fora (mobile)
document.addEventListener('click', function(event) {
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.querySelector('.mobile-menu-btn');
  
  if (window.innerWidth <= 768 && 
      sidebar && 
      !sidebar.contains(event.target) && 
      menuBtn && 
      !menuBtn.contains(event.target) && 
      sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
  }
});

// Fechar sidebar ao redimensionar para desktop
window.addEventListener('resize', function() {
  const sidebar = document.getElementById('sidebar');
  if (window.innerWidth > 768 && sidebar) {
    sidebar.classList.remove('open');
  }
});

// Smooth scroll para links internos
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Função para mostrar notificações toast
function showToast(message, type = 'info') {
  // Remover toast existente se houver
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Criar novo toast
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <i class="fas fa-${getToastIcon(type)}"></i>
      <span>${message}</span>
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  // Adicionar estilos se não existirem
  if (!document.querySelector('#toast-styles')) {
    const styles = document.createElement('style');
    styles.id = 'toast-styles';
    styles.textContent = `
      .toast {
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 2000;
        min-width: 300px;
        border-left: 4px solid;
        animation: slideIn 0.3s ease;
      }
      
      .toast-success { border-left-color: #48BB78; }
      .toast-error { border-left-color: #F56565; }
      .toast-warning { border-left-color: #ED8936; }
      .toast-info { border-left-color: #4299E1; }
      
      .toast-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .toast-close {
        background: none;
        border: none;
        cursor: pointer;
        color: #718096;
        padding: 0.25rem;
      }
      
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(styles);
  }
  
  document.body.appendChild(toast);
  
  // Auto remover após 5 segundos
  setTimeout(() => {
    if (toast.parentElement) {
      toast.remove();
    }
  }, 5000);
}

function getToastIcon(type) {
  switch(type) {
    case 'success': return 'check-circle';
    case 'error': return 'exclamation-circle';
    case 'warning': return 'exclamation-triangle';
    default: return 'info-circle';
  }
}

// Função para formatar datas
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
}

// Função para formatar data e hora
function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('pt-BR');
}

// Função para calcular dias restantes
function getDaysRemaining(dateString) {
  const today = new Date();
  const targetDate = new Date(dateString);
  const diffTime = targetDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Função para obter status em português
function getStatusText(status) {
  const statusMap = {
    'pendente': 'Pendente',
    'em_andamento': 'Em Andamento',
    'concluida': 'Concluída',
    'cancelada': 'Cancelada'
  };
  return statusMap[status] || status;
}

// Função para obter classe CSS do status
function getStatusClass(status) {
  return `status-${status.replace('_', '-')}`;
}
