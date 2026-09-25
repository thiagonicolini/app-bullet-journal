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
                const listaDoDia = event.target.closest('.dia');  
                // - Criar um novo item de lista (<li>) igualzinho ao que você já cria nas tarefas normais.
                const novoItem = document.createElement('ul');
                 // - Injetar o HTML do checkbox e do input de texto dentro desse <li>.
                novoItem.innerHTML = '<input type="checkbox" class="checkbox-tarefa"><input type="text" class="campo-tarefa" placeholder="Digite sua tarefa aqui...">';
                // - Adicionar esse <li> novo no final da <ul>.
                listaDoDia.appendChild(novoItem);
                // - Mudar o foco do teclado (focus) para a nova linha, para ela já sair digitando.
                novoItem.querySelector('.campo-tarefa').focus();
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
             if (event.key === 'Backspace' && event.target.value === ''){
            const tarefaAtual = event.target.closest('li');
            const tarefaAnterior = tarefaAtual.previousElementSibling;
            tarefaAnterior.querySelector('.campo-tarefa').focus();
            tarefaAtual.remove();
            salvarDados();
 }
        })

document.addEventListener('change', (event) =>{
        if (event.target.type === 'checkbox'){
            
            const campoDeTexto = event.target.nextElementSibling;
            if (event.target.checked){
                campoDeTexto.style.textDecoration = 'line-through';
                event.target.setAttribute('checked', 'checked');
            }
            else{
                campoDeTexto.style.textDecoration = 'none';
                event.target.removeAttribute('checked');
            }
            salvarDados();
            }
        });


document.addEventListener('click', (event) =>{
   if (event.target.closest('header')){
        const caixaDoDia = event.target.closest('li.dia');
        const listaDoDia = caixaDoDia.querySelector('.bloco-tarefas');
        listaDoDia.classList.toggle('escondida');
    }
    if(!event.target.closest('li.dia')){
        const everyDay = document.querySelectorAll ('li.dia');
        everyDay.forEach((caixaDoDia, index) =>{
            const listaDoDia = caixaDoDia.querySelector('.bloco-tarefas');

        if(index === 0){
            listaDoDia.classList.remove('escondida')
        } else{
            listaDoDia.classList.add('escondida')
        }
    })
    }
   });

const everyDay = document.querySelectorAll ('li.dia');
everyDay.forEach((element, index)=> {
    if(index !== everyDay.length -1){
    const listaDoDia = element.querySelector('ul');
    listaDoDia.classList.add('escondida');
    }
});

const addTarefa = document.querySelector ('button.add');
//crie uma variavel ultima cor
let ultimaCor = '';
addTarefa.addEventListener('click', (event) =>{
    // não duplicar evento
    event.stopPropagation();
    const coresRandom = ['#B88EFE',  '#FE814B','#24D0FE','#01916E', '#E3B23C' ];
    const criarCard = document.createElement('li')
    criarCard.classList.add('dia');
    criarCard.innerHTML = `<header class="bloco">
    <input type="text" class="titulo-card" placeholder="Que dia é hoje?...">
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

