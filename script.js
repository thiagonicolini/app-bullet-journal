document.addEventListener('keydown', (event) =>{
            if (event.key === 'Enter' && event.target.classList.contains('campo-tarefa')){
                const novoItem = document.createElement('li');
                novoItem.classList.add('tarefa');
                const listaDoDia = event.target.closest('ul');
                novoItem.innerHTML = '<input type="checkbox" class="checkbox-tarefa"><input type="text" class="campo-tarefa" placeholder="Digite sua tarefa aqui...">';
                listaDoDia.appendChild(novoItem);
                novoItem.querySelector('.campo-tarefa').focus();
            }
            // se a pessoa apagar todo o texto e depois apertar backspace ela apaga a caixinha do checkbok

             if (event.key === 'Backspace' && event.target.value === ''){
            const tarefaAtual = event.target.closest('li');
            const tarefaAnterior = tarefaAtual.previousElementSibling;
            tarefaAnterior.querySelector('.campo-tarefa').focus();
            tarefaAtual.remove();
 }
        })

document.addEventListener('change', (event) =>{
        if (event.target.type === 'checkbox'){
            
            const campoDeTexto = event.target.nextElementSibling;
            if (event.target.checked){
                campoDeTexto.style.textDecoration = 'line-through';
            }
            else{
                campoDeTexto.style.textDecoration = 'none';
            }
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

        if(index === everyDay.length -1){
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
    listaDoDia.classList.add('escondida')
    }


});





