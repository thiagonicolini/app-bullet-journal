document.addEventListener('keydown', (event) =>{
            if (event.key === 'Enter' && event.target.classList.contains('campo-tarefa')){
                const novoItem = document.createElement('li');
                novoItem.classList.add('tarefa');
                const listaDoDia = event.target.closest('ul');
                novoItem.innerHTML = '<input type="checkbox"><input type="text" class="campo-tarefa" placeholder="Digite sua tarefa aqui...">';
                listaDoDia.appendChild(novoItem);
            }
        })