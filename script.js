// vamos salvar tudo que o usuário fez
function salvarDados(){
    //selecione o documento principal
        const listaPai = document.querySelector('main ul');
    //guardemos no localStorage as minhas tarefas e preservaremos o visual oficial com innerHTML
        localStorage.setItem('minhasTarefas', listaPai.innerHTML);

}

function carregarDados(){
    //selecione a parte principal do documento assim como fez na função anterior
        const listaPai = document.querySelector('main ul');
    //Pegue exatamente as 'minhasTarefas' que estão guardadas no localStorage
        const dadosSalvos = localStorage.getItem('minhasTarefas');
    // se eu tiver dadados salvos faça isso
    if(dadosSalvos){
    //pegue  o conteúdo de dados salvos e coloque a formatação html,
        listaPai.innerHTML = dadosSalvos;
    }
}

 carregarDados();

// 1. O VIGIA DE TECLADO: Nós precisamos ouvir tudo o que é digitado na tela.
// Você já tem um vigia de 'keydown' no seu código, então vamos usar ele!

    // 2. A CONDIÇÃO DUPLA (O 'if'): Precisamos fazer duas perguntas ao mesmo tempo:
    // PERGUNTA A: A tecla que a pessoa acabou de apertar (event.key) foi o "Enter"?
    // PERGUNTA B: O elemento que estava selecionado (event.target) tem a classe do título do dia?
    
    // if ( A tecla foi Enter E O alvo era o título do dia ) {
        
        // 3. A AÇÃO (O que acontece se a resposta for Sim):
        // Se a pessoa deu Enter no título, nós precisamos:
        // - Encontrar a lista (<ul>) que pertence a este cartão específico.
        // - Criar um novo item de lista (<li>) igualzinho ao que você já cria nas tarefas normais.
        // - Injetar o HTML do checkbox e do input de texto dentro desse <li>.
        // - Adicionar esse <li> novo no final da <ul>.
        // - Mudar o foco do teclado (focus) para a nova linha, para ela já sair digitando.
        // - Salvar os dados para a "foto" registrar a nova tarefa.

    // }
document.addEventListener('keydown', (event) =>{
    
    // 2. A CONDIÇÃO DUPLA (O 'if'): Precisamos fazer duas perguntas ao mesmo tempo:
    // PERGUNTA A: A tecla que a pessoa acabou de apertar (event.key) foi o "Enter"?
    // PERGUNTA B: O elemento que estava selecionado (event.target) tem a classe do título do dia?
            if (event.key === 'Enter' && event.target.classList.contains('titulo-card')){
                // - Encontrar a lista (<ul>) que pertence a este cartão específico.
                const listaDoDia = event.target.closest('.dia').querySelector('.bloco-tarefas');  
                // - Criar um novo item de lista (<li>) igualzinho as tarefas normais
                const novoItem = document.createElement('li')
                // adicionamos a classe tarefa para puxar a formatação do CSS
                novoItem.classList.add('tarefa')
                 // - Injetar o HTML do checkbox e do input de texto dentro desse <li>.
                novoItem.innerHTML = '<input type="checkbox" class="checkbox-tarefa"><input type="text" class="campo-tarefa" placeholder="Digite sua tarefa aqui...">';
                // - Adicionar esse <li> novo no final da <ul>.
                listaDoDia.appendChild(novoItem);
                // - Mudar o foco do teclado (focus) para a nova linha, para ela já sair digitando.
                novoItem.querySelector('.campo-tarefa').focus();
                salvarDados();
            }

            // se a pessoa clicar enter em campo-tarefa...
            if (event.key === 'Enter' && event.target.classList.contains('campo-tarefa')){
                //adicionamos uma linha, a constr novoItem, recebe esse comando
                const novoItem = document.createElement('li');
                // nessa linha adicionados a tarefa
                novoItem.classList.add('tarefa');
                // selecionamos a ul lista do dia. [???]
                const listaDoDia = event.target.closest('ul');
                // adicionamos formatação ighual aos outros
                novoItem.innerHTML = '<input type="checkbox" class="checkbox-tarefa"><input type="text" class="campo-tarefa" placeholder="Digite sua tarefa aqui...">';
                // colocamos ao final da lista
                listaDoDia.appendChild(novoItem);
                // coloque sempre o foco no 'campo-tarefa'
                novoItem.querySelector('.campo-tarefa').focus();
                salvarDados();
            }
            // se a pessoa apagar todo o texto e depois apertar backspace ela apaga a caixinha do checkbok
            // o event.target.value === '' identifica se o campo estiver vazio
             if (event.key === 'Backspace' && event.target.value === ''){
            /* Aqui estamos navegando pela arvore DOM */
            //crie a variavel tarefaAtual, dentro dela você pega o elemento que recebeu a condição e encontra o li mais próximo
            const tarefaAtual = event.target.closest('li');
            // crie a variavel tarefaAtual, pegue o "irmão" que vem imediatamente antes dele
            const tarefaAnterior = tarefaAtual.previousElementSibling;
            //procura dentro da tarefaAnterior algum elemento que tenha '.campo=tarefa e deixa o cursor nela
            tarefaAnterior.querySelector('.campo-tarefa').focus();
            //remove a tarefaAtual do html
            tarefaAtual.remove();
            //salva os dados
            salvarDados();
 }
        })

document.addEventListener('change', (event) =>{
        if (event.target.type === 'checkbox'){
            //  pegue o irmão que vem imediatamente antes
            const campoDeTexto = event.target.nextElementSibling;
            // se a pessoa marcar o check...
            if (event.target.checked){
                // a tarefa fica riscada
                campoDeTexto.style.textDecoration = 'line-through';
                // a partir de agora a configuração vai ficar marcada, dentro deste evento. 
                event.target.setAttribute('checked', 'checked');
            }
            // a pessoa desmarcar check, não ficar marcado check e removemos o setAttribute 'checked' que colocamos no if. 
            else{
                campoDeTexto.style.textDecoration = 'none';
                event.target.removeAttribute('checked');
            }
            //salvamos
            salvarDados();
            }
        });

// 1. O VIGIA GERAL: Comece criando o escutador de 'click' no 'document'.
document.addEventListener('click', (event) => {

    // --- REGRA DO BOTÃO FECHAR (Essa você já domina) ---
    // Se o elemento clicado (event.target) tem a classe 'fechar':
        // Mande o elevador subir até '.dia', remova ele.
        // Salve os dados.
        // Coloque o 'return' para abortar o resto do código.

    // --- A MIRA PRINCIPAL ---
    // Crie uma variável (ex: cartaoClicado). 
    // Nela, mande o elevador (a partir do event.target) tentar achar o 'li.dia' mais próximo.

    // --- A BIFURCAÇÃO (O CORAÇÃO DO CÓDIGO) ---
    // Crie um 'if' perguntando se 'cartaoClicado' existe (ou seja, se a pessoa acertou o clique em um cartão).

    // SE SIM (Clicou em qualquer lugar de um cartão):
        // Crie uma variável para achar a 'ul' ('.bloco-tarefas') de DENTRO do 'cartaoClicado'.
        // Crie outra variável para achar o primeiro 'li.dia' do DOCUMENTO INTEIRO.
        
        // Compare: O 'cartaoClicado' é estritamente igual ao primeiro cartão?
            // Se SIM (Objetivo 1): Remova a classe 'escondida' da lista desse cartão.
            // Se NÃO (Objetivo 3): Como você quer que o cartão ABRA se clicar em qualquer parte dele, apenas remova a classe 'escondida' da lista desse cartão também! 
            // (Dica: Pense bem... se a ação é a mesma para os dois casos, você precisa mesmo de um if/else aqui dentro?)

    // SE NÃO (O 'else' principal - Clicou fora dos cartões, no fundo da tela):
        // Crie uma variável selecionando TODOS os cartões 'li.dia' da tela.
        // Faça um laço de repetição para passar por cada cartão e seu número na fila (index).
        // Dentro do laço, ache a 'ul' ('.bloco-tarefas') do cartão atual.
        // Crie um 'if': Se o index for igual a 0, remova a classe 'escondida'.
        // Se não for (else): adicione a classe 'escondida' (Objetivo 2).

});


const addTarefa = document.querySelector ('button.add');
//crie uma variavel ultima cor
let ultimaCor = '';
addTarefa.addEventListener('click', (event) =>{
    // não duplicar evento
    event.stopPropagation();
    const coresRandom = ['#B88EFE',  '#FE814B','#24D0FE','#01916E', '#E3B23C' ];
    // criarCard cria um elemento li
    const criarCard = document.createElement('li')
    // no criar card a gente adiciona dia
    criarCard.classList.add('dia');
    // estilizar o novo card 
    criarCard.innerHTML = `<header class="bloco">
    <input type="text" class="titulo-card" placeholder="Que dia é hoje?...">
    <div class= "fechar"> x </div>
    </header>
    <ul class="bloco-tarefas">
    <li class="tarefa">
    <input type="checkbox">
    <input type="text" class="campo-tarefa" placeholder="Digite sua tarefa aqui...">
    </li></ul>`
    //arredonde as possibilidades 
    let sorteador = Math.floor(Math.random()* coresRandom.length);
    //pegando a cor do array
    let corEscolhida = coresRandom[sorteador];
    // se a cor escolhida for igual a ultima, sorteie denovo
    while(corEscolhida === ultimaCor){
    sorteador = Math.floor(Math.random()* coresRandom.length);
    corEscolhida = coresRandom[sorteador];
    }
    ultimaCor = corEscolhida;
    criarCard.style.backgroundColor = corEscolhida;
    // vamos aparecer na tela
    // 1. selecione a ul pai
    const listaPai = document.querySelector('main ul');
    const todasAsListas = document.querySelectorAll('.bloco-tarefas');
    todasAsListas.forEach((lista)=>{
    lista.classList.add('escondida');
});
    //criar o card la encima
    listaPai.prepend(criarCard);
    salvarDados();
})

// salvaremos os caracteres digitados agora
document.addEventListener('input', (event) =>{
    // vigie só o texto
    if(event.target.type === 'text'){
        // se for isso, pegue o que tenha na tela e coloque dentro do html 
            event.target.setAttribute('value', event.target.value);
        // salve agora
        salvarDados();
    }
}
)


/*Botão de fechar o card
const fecharCard = document.querySelector('.fechar');
fecharCard.addEventListener('click', (event) =>{
    const elementoClicado = event.target;
        //se a pessoa clicar no x, ele vai remover o card
    if(event.target === fecharCard){
        elementoClicado.remove()

    }
    

})*/