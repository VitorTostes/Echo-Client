// echoclient.js
document.addEventListener('DOMContentLoaded', () => {
  console.log('Página Echo Assistant carregada');
  
  // Funcionalidades específicas desta página
  const chatDisplay = document.getElementById('chatDisplay');
  
  if (chatDisplay) {
    chatDisplay.innerHTML = '<p>O que vamos estudar hoje?</p>';
  }

  if (!window.location.pathname.includes('assistant.html')) {
  console.warn('Este script deve rodar apenas em assistant.html');
} else {
  // Seu código normal aqui
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Página Echo Assistant carregada com sucesso');
    // ... resto do seu código
  });
}

});
