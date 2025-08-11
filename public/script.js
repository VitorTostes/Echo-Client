// Funções compartilhadas
function setupChat() {
  const messageInput = document.getElementById('messageInput');
  const sendBtn = document.getElementById('sendBtn');

  if (!messageInput || !sendBtn) return;

  const adjustTextarea = () => {
    messageInput.style.height = 'auto';
    const needsScroll = messageInput.scrollHeight > 180;
    const newHeight = Math.min(messageInput.scrollHeight, 180);
    
    messageInput.style.height = `${newHeight}px`;
    messageInput.style.paddingRight = needsScroll ? '16px' : '10px';
    messageInput.style.overflowY = needsScroll ? 'scroll' : 'hidden';
    
    if (needsScroll) {
      requestAnimationFrame(() => {
        messageInput.scrollTop = messageInput.scrollHeight;
      });
    }
  };

  const sendMessage = () => {
    const message = messageInput.value.trim();
    if (message) {
      console.log('Mensagem enviada:', message);
      
      const chatDisplay = document.getElementById('chatDisplay');
      if (chatDisplay) {
        chatDisplay.innerHTML += `<div class="message sent">${message}</div>`;
      }
      
      messageInput.value = '';
      adjustTextarea();
      
      setTimeout(() => {
        if (chatDisplay) {
          chatDisplay.innerHTML += `<div class="message received">Resposta para: "${message}"</div>`;
        } else {
          alert(`Resposta: "${message}"`);
        }
      }, 1000);
    }
  };

  messageInput.addEventListener('input', adjustTextarea);
  sendBtn.addEventListener('click', sendMessage);
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  adjustTextarea();
}

document.addEventListener('DOMContentLoaded', () => {
  // Controle do menu sidebar
  const menuBtn = document.getElementById('menuBtn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      document.querySelector('.sidebar').classList.toggle('active');
    });
  }

  // Controle do ícone ativo na sidebar
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const sidebarIcons = document.querySelectorAll('.sidebar-icon');
  
  sidebarIcons.forEach(icon => {
    icon.classList.remove('active');
    
    // Verifica qual ícone deve estar ativo
    const iconOnClick = icon.getAttribute('onclick');
    if (iconOnClick) {
      // Extrai o nome da página do onclick (ex: "profile.html")
      const pageLink = iconOnClick.match(/location\.href='(.*?)'/);
      if (pageLink && pageLink[1] && currentPage.includes(pageLink[1].replace('.html', ''))) {
        icon.classList.add('active');
      }
    }
  });

  // Botões específicos (só executa se existirem)
  const clientBtn = document.getElementById('clientBtn');
  const asstBtn = document.getElementById('asstBtn');
  
  if (clientBtn) {
    clientBtn.addEventListener('click', () => {
      // Verificação mais robusta para o redirecionamento
      try {
        // Tenta acessar o arquivo
        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', 'echoclient.html', true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              window.location.href = 'echoclient.html';
            } else {
              console.error('Arquivo não encontrado. Status:', xhr.status);
              alert('Página Echo Client não encontrada!\nVerifique se o arquivo echoclient.html existe na mesma pasta.');
            }
          }
        };
        xhr.send();
      } catch (error) {
        console.error('Erro ao verificar página:', error);
        alert('Ocorreu um erro ao tentar acessar a página.');
      }
    });
  }
  
  if (asstBtn) {
    asstBtn.addEventListener('click', () => {
      // Verificação mais robusta para o redirecionamento
      try {
        // Tenta acessar o arquivo
        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', 'assistant.html', true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              window.location.href = 'assistant.html';
            } else {
              console.error('Arquivo não encontrado. Status:', xhr.status);
              alert('Página Echo Client não encontrada!\nVerifique se o arquivo assistant.html existe na mesma pasta.');
            }
          }
        };
        xhr.send();
      } catch (error) {
        console.error('Erro ao verificar página:', error);
        alert('Ocorreu um erro ao tentar acessar a página.');
      }
    });
  }

  // Configura o chat
  setupChat();
  
  // Cria footer do chat se existir o container
  const chatContent = document.querySelector('.chat-content');
  const messageInput = document.getElementById('messageInput');
  
  if (chatContent && messageInput) {
    const container = document.createElement('div');
    container.className = 'chat-input-container';
    messageInput.parentNode.insertBefore(container, messageInput);
    container.appendChild(messageInput);
  }
});