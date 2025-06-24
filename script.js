// Abas - ativação
window.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(tab => tab.classList.remove('active'));
      button.classList.add('active');
      document.getElementById(button.dataset.tab).classList.add('active');
    });
  });
});

// Carrinho
const carrinho = [];
const listaCarrinho = document.getElementById('lista-carrinho');
const btnFinalizar = document.getElementById('finalizar-pedido');
const btnLimpar = document.getElementById('limpar-carrinho');
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

  document.getElementById('total').textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;

  if (carrinho.length > 0) {
    let mensagem = 'Olá! Gostaria de fazer o seguinte pedido:\n\n';
    carrinho.forEach(item => {
      mensagem += `- ${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}\n`;
    });
    mensagem += `\nTotal: R$ ${total.toFixed(2).replace('.', ',')}`;
    const telefone = '5511951188862';
    const link = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    linkWhatsApp.href = link;
    linkWhatsApp.style.pointerEvents = 'auto';
    linkWhatsApp.style.opacity = 1;
  } else {
    linkWhatsApp.href = '#';
    linkWhatsApp.style.pointerEvents = 'none';
    linkWhatsApp.style.opacity = 0.5;
  }
}

function adicionarAoCarrinho(nome, preco) {
  if (!isNaN(preco)) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();
  }
}

document.querySelectorAll('.button[data-produto]').forEach(button => {
  button.addEventListener('click', () => {
    const nome = button.getAttribute('data-produto');
    const preco = parseFloat(button.getAttribute('data-preco'));
    adicionarAoCarrinho(nome, preco);
  });
});

btnFinalizar.addEventListener('click', () => {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio.');
    return;
  }
  window.open(linkWhatsApp.href, '_blank');
});

btnLimpar.addEventListener('click', () => {
  carrinho.length = 0;
  atualizarCarrinho();
});

atualizarCarrinho();
