let pedido = [];

function adicionarPedido(nome, preco) {
    pedido.push({ nome, preco });
    exibirPedido();
}

function exibirPedido() {
    const listaPedido = document.getElementById('itens-pedido');
    listaPedido.innerHTML = '';

    let total = 0;

    pedido.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.nome} - R$ ${item.preco.toFixed(2)} 
            <button onclick="excluirItem(${index})" style="background-color: #e74c3c; color: white; border: none; cursor: pointer; margin-left: 10px;">Excluir</button>
        `;
        listaPedido.appendChild(li);

        total += item.preco;
    });

    const totalElemento = document.createElement('li');
    totalElemento.style.fontWeight = 'bold';
    totalElemento.style.marginTop = '10px';
    totalElemento.textContent = `Total: R$ ${total.toFixed(2)}`;
    listaPedido.appendChild(totalElemento);

    atualizarLinkWhatsApp();
}

function excluirItem(index) {
    pedido.splice(index, 1);
    exibirPedido();
}

function finalizarPedido() {
    if (pedido.length === 0) {
        alert('Adicione pelo menos um item ao pedido antes de finalizar.');
        return;
    }
    // Abre o WhatsApp no link atualizado
    window.open(document.getElementById('link-whatsapp').href, '_blank');
}

// Atualiza o link do WhatsApp com a mensagem formatada e desabilita botão se vazio
function atualizarLinkWhatsApp() {
    const linkWhats = document.getElementById('link-whatsapp');
    const botaoWhats = linkWhats.querySelector('button');

    if (pedido.length === 0) {
        linkWhats.href = '#';
        botaoWhats.disabled = true;  // desabilita botão se sem pedido
        botaoWhats.style.cursor = 'not-allowed';
        botaoWhats.style.opacity = '0.6';
        return;
    }

    botaoWhats.disabled = false;
    botaoWhats.style.cursor = 'pointer';
    botaoWhats.style.opacity = '1';

    let mensagem = 'Olá, gostaria de fazer o seguinte pedido:\n';

    pedido.forEach(item => {
        mensagem += `- ${item.nome} (R$ ${item.preco.toFixed(2)})\n`;
    });

    const total = pedido.reduce((acc, item) => acc + item.preco, 0);

    mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

    // Número do WhatsApp
    const numeroWhats = '5511951188862';

    // Usa encodeURIComponent para evitar problemas na URL
    const url = `https://wa.me/${numeroWhats}?text=${encodeURIComponent(mensagem)}`;
    linkWhats.href = url;
}

// Controle das abas (se precisar, mantém igual)
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tab = button.getAttribute('data-tab');

        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        button.classList.add('active');
        document.getElementById(tab).classList.add('active');
    });
});
