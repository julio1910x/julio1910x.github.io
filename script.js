// Função para excluir item do pedido
function excluirItem(index) {
    pedido.splice(index, 1); // Remove o item selecionado
    exibirPedido(); // Atualiza a visualização do carrinho
}

// Função para exibir o pedido com botão de excluir
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
