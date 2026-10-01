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

// escute quando houver um click
document.addEventListener('click', (event) =>{
    // se o elemento que recebeu o clique estiver dentro do header, faça...
   if (event.target.closest('header')){
    /* navegando pelo dom*/
        // a caixaDoDia é a variavel que recebe o elemento mais proximo do elemento li.dia mais próximo do elemento clicado
        const caixaDoDia = event.target.closest('li.dia');
        // lá dentro recebemos o bloco tarefa, 
        const listaDoDia = caixaDoDia.querySelector('.bloco-tarefas');
        //ou seja, sempre que clicarem no header fecha ou abre dependendo do estado inicial, ele se esconde por toogle. 
        listaDoDia.classList.toggle('escondida');
    }
    //se o elemento clicado não estiver dentro do 'li.dia' execute o código
    if(!event.target.closest('li.dia')){
        // everyDay seleciona todos os 'li.dia' que tiver
        const everyDay = document.querySelectorAll ('li.dia');
        // Para cada elemento do everyDay execute essa função
        everyDay.forEach((caixaDoDia, index) =>{
            // encontre o bloco tarefas
            const listaDoDia = caixaDoDia.querySelector('.bloco-tarefas');
        // se o index for identico a 0 removemos a classe escondida
        if(index === 0){
            listaDoDia.classList.remove('escondida')
        // se não adicionamos a classe escondida
        } else{
            listaDoDia.classList.add('escondida')
        }
    })
    }
   });

// selecione todas as li.dia
const everyDay = document.querySelectorAll ('li.dia');
// para cada everyDay (elemento encontrado) recebemos o elemento atual e o index (posição desse elemento)
everyDay.forEach((element, index)=> {
    //se a posição atual não for a ultima do array
    if(index !== everyDay.length -1){
    // deixe a ul dentro do elemento atual escondida
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