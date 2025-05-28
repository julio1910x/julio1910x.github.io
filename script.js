// Seu array de pedido
let pedido = [];

// Função para adicionar item no pedido
function adicionarPedido(nome, preco) {
    pedido.push({ nome, preco });
    exibirPedido();
}

// Função para mostrar o pedido no carrinho
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

// Excluir item do pedido
function excluirItem(index) {
    pedido.splice(index, 1);
    exibirPedido();
}

// Finalizar pedido
function finalizarPedido() {
    if (pedido.length === 0) {
        alert('Adicione pelo menos um item ao pedido antes de finalizar.');
        return;
    }

    alert('Pedido finalizado! Você será redirecionado ao WhatsApp.');
    // Redireciona automaticamente
    window.open(document.getElementById('link-whatsapp').href, '_blank');
}

// Atualiza o link do WhatsApp com a mensagem formatada
function atualizarLinkWhatsApp() {
    if (pedido.length === 0) {
        document.getElementById('link-whatsapp').href = '#';
        return;
    }

    let mensagem = 'Olá, gostaria de fazer o seguinte pedido:%0A';

    pedido.forEach(item => {
        mensagem += `- ${item.nome} (R$ ${item.preco.toFixed(2)})%0A`;
    });

    const total = pedido.reduce((acc, item) => acc + item.preco, 0);

    mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;

    // Número do WhatsApp (coloque o seu número)
    const numeroWhats = '5511999999999';

    document.getElementById('link-whatsapp').href = `https://wa.me/${numeroWhats}?text=${mensagem}`;
}

// Controle das abas
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tab = button.getAttribute('data-tab');

        // Remove a classe active de todas as abas e botões
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Adiciona active na aba e conteúdo selecionados
        button.classList.add('active');
        document.getElementById(tab).classList.add('active');
    });
});
