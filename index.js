// Carrega as músicas assim que a página abre
document.addEventListener('DOMContentLoaded', carregarMusicas);

function carregarMusicas() {
    const listaMusicas = document.getElementById('listaMusicas');
    // Busca as músicas salvas ou cria um array vazio se não houver nenhuma
    const musicas = JSON.parse(localStorage.getItem('musicas')) || [];

    // Limpa a lista antes de renderizar
    listaMusicas.innerHTML = '';

    if (musicas.length === 0) {
        listaMusicas.innerHTML = '<p>Nenhuma música cadastrada ainda.</p>';
        return;
    }

    // Cria os cards para cada música salva
    musicas.forEach(musica => {
        const article = document.createElement('article');
        article.className = 'musica';

        article.innerHTML = `
            <h2>${musica.titulo}</h2>
            <p class="artista">${musica.artista}</p>
            <p class="detalhes">${musica.genero} | ${musica.ano} | ${musica.duracao} min</p>
            <div class="acoes">
                <a class="editar" href="editar.html?id=${musica.id}">Editar</a>
                <button class="apagar" data-id="${musica.id}">Apagar</button>
            </div>
        `;

        listaMusicas.appendChild(article);
    });

    // Adiciona a função de apagar aos novos botões
    const botoesApagar = document.querySelectorAll('.apagar');
    botoesApagar.forEach(botao => {
        botao.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            apagarMusica(id);
        });
    });
}

function apagarMusica(id) {
    if (confirm('Tem certeza que deseja apagar esta música?')) {
        let musicas = JSON.parse(localStorage.getItem('musicas')) || [];
        // Filtra a lista, removendo a música com o ID selecionado
        musicas = musicas.filter(musica => musica.id !== id);
        // Salva a nova lista e recarrega a tela
        localStorage.setItem('musicas', JSON.stringify(musicas));
        carregarMusicas();
    }
}