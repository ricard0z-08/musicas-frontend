document.getElementById('botaoCadastrar').addEventListener('click', function() {
    const titulo = document.getElementById('titulo').value;
    const artista = document.getElementById('artista').value;
    const genero = document.getElementById('genero').value;
    const ano = document.getElementById('ano').value;
    const duracao = document.getElementById('duracao').value;

    // Validação simples para não salvar música vazia
    if (!titulo || !artista) {
        alert('Por favor, preencha pelo menos o título e o artista.');
        return;
    }

    // Cria o objeto da música (usamos a data atual em milissegundos como ID único)
    const novaMusica = {
        id: Date.now(),
        titulo: titulo,
        artista: artista,
        genero: genero,
        ano: ano,
        duracao: duracao
    };

    // Busca a lista atual, adiciona a nova música e salva de volta
    const musicas = JSON.parse(localStorage.getItem('musicas')) || [];
    musicas.push(novaMusica);
    localStorage.setItem('musicas', JSON.stringify(musicas));

    alert('Música cadastrada com sucesso!');
    // Redireciona de volta para a tela inicial
    window.location.href = 'index.html';
});