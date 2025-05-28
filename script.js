// Gerencia os itens do pedido
const pedido = [];

// Atualiza o link do WhatsApp conforme o pedido
function atualizarLinkWhatsApp() {
  if (pedido.length === 0) {
    document.getElementById('link-whatsapp').href = '#';
    return;
  }

  const telefone = '5599999999999'; // Substitua pelo seu número com DDD e código do país (55 para Brasil)
  let mensagem = 'Olá, gostaria de fazer o pedido:%0A';

  pedido.forEach(item => {
    mensagem += `- ${item.nome} (R$ ${item.preco.toFixed(2)})%0A`;
  });

  const url = `https://wa.me/${telefone}?text=${mensagem}`;
  document.getElementById('link-whatsapp').href = url;
}

// Adiciona um item ao pedido
function adicionarPedido(nome, preco) {
  pedido.push({ nome, preco });
  atualizarCarrinho();
  atualizarLinkWhatsApp();
}

// Atualiza a visualização do carrinho na página
function atualizarCarrinho() {
  const ul = document.getElementById('itens-pedido');
  ul.innerHTML = '';

  pedido.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.style.marginLeft = '10px';
    btnRemover.onclick = () => {
      pedido.splice(index, 1);
      atualizarCarrinho();
      atualizarLinkWhatsApp();
    };

    li.appendChild(btnRemover);
    ul.appendChild(li);
  });
}

// Finaliza o pedido: abre WhatsApp se tiver itens
function finalizarPedido() {
  if (pedido.length === 0) {
    alert('Seu pedido está vazio!');
    return;
  }
  const linkWhats = document.getElementById('link-whatsapp');
  if (linkWhats.href === '#') {
    alert('Erro ao gerar link do WhatsApp');
    return;
  }
  window.location.href = linkWhats.href; // abre na mesma aba, como pediu
}

// Controle das abas
document.querySelectorAll('.tab-button').forEach(botao => {
  botao.addEventListener('click', () => {
    // Remove active de todos os botões e conteúdos
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));

    // Adiciona active no botão clicado e conteúdo correspondente
    botao.classList.add('active');
    const tabId = botao.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});

// Previne edição / digitação ao clicar em qualquer texto do site (se for esse o problema)
// Se você não quer que o texto seja editável ao clicar em qualquer letra, provavelmente você tem algum "contenteditable" ativo.
// Vou prevenir edição de todo o body exceto campos de input, textarea, select.

document.body.addEventListener('mousedown', event => {
  const tag = event.target.tagName.toLowerCase();
  if (tag !== 'input' && tag !== 'textarea' && tag !== 'select') {
    event.preventDefault(); // evita seleção e edição
  }
});
