// Seu array de pedido
let pedido = [];

// Referência ao botão WhatsApp
const botaoWhatsapp = document.getElementById('botao-whatsapp');

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

    if(pedido.length > 0) {
        const totalElemento = document.createElement('li');
        totalElemento.style.fontWeight = 'bold';
        totalElemento.style.marginTop = '10px';
        totalElemento.textContent = `Total: R$ ${total.toFixed(2)}`;
        listaPedido.appendChild(totalElemento);
    }

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
    if(botaoWhatsapp.dataset.href) {
        window.open(botaoWhatsapp.dataset.href, '_blank');
    }
}

// Atualiza o link do WhatsApp com a mensagem formatada e habilita/desabilita o botão
function atualizarLinkWhatsApp() {
    if (pedido.length === 0) {
        botaoWhatsapp.disabled = true;
        botaoWhatsapp.dataset.href = '';
    } else {
        botaoWhatsapp.disabled = false;

        let mensagem = 'Olá, gostaria de fazer o seguinte pedido:%0A';

        pedido.forEach(item => {
            mensagem += `- ${item.nome} (R$ ${item.preco.toFixed(2)})%0A`;
        });

        const total = pedido.reduce((acc, item) => acc + item.preco, 0);

        mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;

        const numeroWhats = '5511951188862';

        botaoWhatsapp.dataset.href = `https://wa.me/${numeroWhats}?text=${mensagem}`;
    }
}

// Evento para abrir o WhatsApp quando o botão for clicado
botaoWhatsapp.addEventListener('click', () => {
    if (!botaoWhatsapp.disabled && botaoWhatsapp.dataset.href) {
        window.open(botaoWhatsapp.dataset.href, '_blank');
    }
});

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
