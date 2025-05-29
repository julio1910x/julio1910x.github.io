document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

        button.classList.add('active');
        document.getElementById(button.getAttribute('data-tab')).classList.add('active');
    });
});

const itensPedido = [];

function adicionarPedido(nome, preco) {
    itensPedido.push({ nome, preco });
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById('itens-pedido');
    lista.innerHTML = '';

    itensPedido.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$ ${item.preco}`;
        lista.appendChild(li);
    });

    atualizarLinkWhatsapp();
}

function atualizarLinkWhatsapp() {
    const mensagem = encodeURIComponent("Gostaria de fazer um pedido do site Pajamas Burger. Meu pedido é:\n" +
        itensPedido.map(item => `- ${item.nome} (R$ ${item.preco})`).join('\n'));

    const link = `https://api.whatsapp.com/send?phone=+5511951188862&text=${mensagem}`;
    document.getElementById('link-whatsapp').href = link;
}

function finalizarPedido() {
    if (itensPedido.length === 0) {
        alert("Adicione itens ao pedido antes de finalizar.");
        return;
    }
    window.open(document.getElementById('link-whatsapp').href, '_blank');
}
