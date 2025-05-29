const carrinho = [];
const listaCarrinho = document.getElementById('lista-carrinho');
const totalElement = document.getElementById('total');

function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();
}

function atualizarCarrinho() {
    listaCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}`;
        listaCarrinho.appendChild(li);
        total += item.preco;
    });

    totalElement.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}

function enviarPedido() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio.');
        return;
    }

    let mensagem = "Olá! Gostaria de fazer o seguinte pedido:\n\n";
    carrinho.forEach(item => {
        mensagem += `- ${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}\n`;
    });

    const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    mensagem += `\nTotal: R$ ${total.toFixed(2).replace('.', ',')}`;
    const telefone = "SEU_NUMERO_AQUI"; // Substitua pelo número do WhatsApp com DDD
    const link = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    document.getElementById('link-whatsapp').href = link;
    window.open(link, '_blank');
}
