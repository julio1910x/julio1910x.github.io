// Controle de abas (pode remover do HTML se quiser)
// Se preferir, pode deixar só um lugar para o script (no final do body ou defer)
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    const tab = button.dataset.tab;

    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    document.querySelectorAll('.tab-content').forEach(section => section.classList.remove('active'));
    document.getElementById(tab).classList.add('active');
  });
});

// Lógica do carrinho
const carrinho = [];
const listaCarrinho = document.getElementById('itens-pedido');
const btnFinalizar = document.getElementById('finalizar-pedido');
const linkWhatsApp = document.getElementById('link-whatsapp');

function atualizarCarrinho() {
  listaCarrinho.innerHTML = '';
  let total = 0;

  carrinho.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}`;
    listaCarrinho.appendChild(li);
    total += item.preco;
  });

  // Atualiza o texto do link do WhatsApp com o pedido e total
  if (carrinho.length > 0) {
    let mensagem = "Olá! Gostaria de fazer o seguinte pedido:\n\n";
    carrinho.forEach(item => {
      mensagem += `- ${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}\n`;
    });
    mensagem += `\nTotal: R$ ${total.toFixed(2).replace('.', ',')}`;

    const telefone = "5511951188862"; // Seu número com DDD, sem + ou espaços
    const link = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    linkWhatsApp.href = link;
    linkWhatsApp.style.pointerEvents = 'auto'; // ativa o link
    linkWhatsApp.style.opacity = 1;
  } else {
    // Se carrinho vazio, desativa o link
    linkWhatsApp.href = "#";
    linkWhatsApp.style.pointerEvents = 'none';
    linkWhatsApp.style.opacity = 0.5;
  }
}

// Função para adicionar itens
function adicionarAoCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  atualizarCarrinho();
}

// Evento nos botões "Adicionar ao pedido"
document.querySelectorAll('.button[data-produto]').forEach(button => {
  button.addEventListener('click', () => {
    const nome = button.getAttribute('data-produto');
    const preco = parseFloat(button.getAttribute('data-preco'));
    adicionarAoCarrinho(nome, preco);
  });
});

// Finalizar pedido: abre WhatsApp ou alerta se vazio
btnFinalizar.addEventListener('click', () => {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio.');
    return;
  }
  // Abre link do WhatsApp em nova aba
  window.open(linkWhatsApp.href, '_blank');
});

// Inicializa estado do link (desativado pois carrinho inicia vazio)
atualizarCarrinho();
