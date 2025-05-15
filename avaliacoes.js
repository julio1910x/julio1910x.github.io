/**
 * Array para armazenar as avaliações
 * @type {Array<{nome: string, comentario: string, nota: number}>}
 */
let avaliacoes = [];

/**
 * Função para adicionar uma avaliação
 * @param {Event} event - Evento de submit do formulário
 */
function adicionarAvaliacao(event) {
    event.preventDefault();  // Impede o envio do formulário

    const nome = document.getElementById('nome').value;
    const comentario = document.getElementById('comentario').value;
    const nota = document.getElementById('nota').value;

    // Verifica se a nota foi selecionada
    if (nota === "0") {
        alert('Por favor, selecione uma nota!');
        return;
    }

    // Adicionando a nova avaliação no array
    const novaAvaliacao = { nome, comentario, nota };
    avaliacoes.push(novaAvaliacao);

    // Limpar os campos do formulário
    document.getElementById('nome').value = '';
    document.getElementById('comentario').value = '';
    document.getElementById('nota').value = '0';
    removerEstrelas();

    // Atualizando a lista de avaliações
    exibirAvaliacoes();
}

/**
 * Função para exibir as avaliações na tela
 */
function exibirAvaliacoes() {
    const lista = document.getElementById('avaliacoesLista');
    lista.innerHTML = '';  // Limpar a lista antes de adicionar

    // Criando o HTML das avaliações
    avaliacoes.forEach((avaliacao, index) => {
        const li = document.createElement('li');
        li.classList.add('avaliacao-item');
        li.innerHTML = `
            <h3>${avaliacao.nome} - ${avaliacao.nota} Estrela${avaliacao.nota > 1 ? 's' : ''}</h3>
            <p>${avaliacao.comentario}</p>
            <div class="estrelas">
                ${exibirEstrelas(avaliacao.nota)}
            </div>
            <button class="excluir-btn" onclick="excluirAvaliacao(${index})">Excluir</button>
        `;
        lista.appendChild(li);
    });
}

/**
 * Função para exibir as estrelas de avaliação
 * @param {number} nota - Número de estrelas (1-5)
 * @returns {string} HTML das estrelas
 */
function exibirEstrelas(nota) {
    let estrelasHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= nota) {
            estrelasHTML += `<span class="estrela">&#9733;</span>`;
        } else {
            estrelasHTML += `<span class="estrela estrela-vazia">&#9733;</span>`;
        }
    }
    return estrelasHTML;
}

/**
 * Função para selecionar a nota ao clicar nas estrelas
 * @param {number} nota - Número de estrelas selecionadas (1-5)
 */
function selecionarNota(nota) {
    document.getElementById('nota').value = nota;
    removerEstrelas();
    const estrelas = document.querySelectorAll('.estrela');
    for (let i = 0; i < nota; i++) {
        estrelas[i].classList.remove('estrela-vazia');
    }
}

/**
 * Função para remover as estrelas vazias (resetar visualização)
 */
function removerEstrelas() {
    const estrelas = document.querySelectorAll('.estrela');
    estrelas.forEach(estrela => estrela.classList.add('estrela-vazia'));
}

/**
 * Função para excluir uma avaliação
 * @param {number} index - Índice da avaliação a ser removida
 */
function excluirAvaliacao(index) {
    avaliacoes.splice(index, 1); // Remove a avaliação do array
    exibirAvaliacoes(); // Atualiza a lista de avaliações
}