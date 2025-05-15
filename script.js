/**
 * Array para armazenar os itens do pedido
 * @type {Array<{nome: string, preco: number}>}
 */
let pedido = [];

/**
 * Função para adicionar itens ao pedido
 * @param {string} nome - Nome do item
 * @param {number} preco - Preço do item
 */
function adicionarPedido(nome, preco) {
    pedido.push({ nome: nome, preco: preco });
    exibirPedido(); // Atualizar a visualização do pedido
}

/**
 * Função para exibir o pedido no carrinho
 */
function exibirPedido() {
    const listaPedido = document.getElementById('itens-pedido');
    listaPedido.innerHTML = ''; // Limpar a lista antes de adicionar os novos itens

    let total = 0;

    pedido.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.nome} - R$ ${item.preco.toFixed(2)} 
                        <button onclick="excluirItem(${index})" style="background-color: #e74c3c; color: white; border: none; cursor: pointer;">Excluir</button>`;
        listaPedido.appendChild(li);

        total += item.preco;
    });

    // Exibir o total do pedido
    const totalElemento = document.createElement('li');
    totalElemento.textContent = `Total: R$ ${total.toFixed(2)}`;
    listaPedido.appendChild(totalElemento);
}

/**
 * Função para excluir um item do pedido
 * @param {number} index - Índice do item a ser removido
 */
function excluirItem(index) {
    pedido.splice(index, 1); // Remove o item selecionado
    exibirPedido(); // Atualiza a visualização do carrinho
}

/**
 * Função para finalizar o pedido
 */
function finalizarPedido() {
    if (pedido.length === 0) {
        alert('Adicione pelo menos um item ao pedido!');
        return;
    }

    alert('Pedido finalizado com sucesso! Obrigado pela compra!');
    pedido = []; // Limpar o pedido após finalização
    exibirPedido(); // Atualizar o carrinho
}