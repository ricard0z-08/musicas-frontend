let musicaAtual = null;

// Quando a página carrega, buscamos a música pelo ID na URL
document.addEventListener('DOMContentLoaded', () => {
    // Pega o ID da barra de endereços (ex: editar.html?id=123)
    const parametrosUrl = new URLSearchParams(window.location.search);
    const id = parseInt(parametrosUrl.get('id'));

    if (!id) {
        alert('Música não encontrada!');
        window.location.href = 'index.html';
        return;
    }

    const musicas = JSON.parse(localStorage.getItem('musicas')) || [];
    musicaAtual = musicas.find(m => m.id === id);

    if (!musicaAtual) {
        alert('Música não encontrada!');
        window.location.href = 'index.html';
        return;
    }

    // Preenche os campos com os dados da música encontrada
    document.getElementById('titulo').value = musicaAtual.titulo;
    document.getElementById('artista').value = musicaAtual.artista;
    document.getElementById('genero').value = musicaAtual.genero;
    document.getElementById('ano').value = musicaAtual.ano;
    document.getElementById('duracao').value = musicaAtual.duracao;
});

// Salva as alterações quando o botão é clicado
document.getElementById('botaoSalvar').addEventListener('click', function() {
    if (!musicaAtual) return;

    const titulo = document.getElementById('titulo').value;
    const artista = document.getElementById('artista').value;

    if (!titulo || !artista) {
        alert('Por favor, preencha pelo menos o título e o artista.');
        return;
    }

    // Atualiza os dados do objeto
    musicaAtual.titulo = titulo;
    musicaAtual.artista = artista;
    musicaAtual.genero = document.getElementById('genero').value;
    musicaAtual.ano = document.getElementById('ano').value;
    musicaAtual.duracao = document.getElementById('duracao').value;

    // Substitui a música antiga pela atualizada na lista
    const musicas = JSON.parse(localStorage.getItem('musicas')) || [];
    const index = musicas.findIndex(m => m.id === musicaAtual.id);
    
    if (index !== -1) {
        musicas[index] = musicaAtual;
        localStorage.setItem('musicas', JSON.stringify(musicas));
        alert('Alterações salvas com sucesso!');
        window.location.href = 'index.html';
    }
});