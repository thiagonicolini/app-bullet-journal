document.addEventListener('keydown', (event) =>{
            if (event.key === 'Enter' && event.target.classList.contains('campo-tarefa')){
                const novoItem = document.createElement('li');
                novoItem.classList.add('tarefa');
                const listaDoDia = event.target.closest('ul');
                novoItem.innerHTML = '<input type="checkbox" class="checkbox-tarefa"><input type="text" class="campo-tarefa" placeholder="Digite sua tarefa aqui...">';
                listaDoDia.appendChild(novoItem);
                novoItem.querySelector('.campo-tarefa').focus();
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
   if (event.target.tagName === 'H2'){
        const caixaDoDia = event.target.closest ('li.dia');
        const listaDoDia = caixaDoDia.querySelector('ul');
        listaDoDia.classList.toggle('escondida');
   }

})

const everyDay = document.querySelectorAll ('.li.dia');

everyDay.forEach(element => {
    const caixaDoDia = event.target.closest ('li.dia');
    const listaDoDia = caixaDoDia.querySelector('ul');
    
    
});

