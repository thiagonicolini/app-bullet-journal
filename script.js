const camposDeTarefas = document.querySelectorAll('.campo-tarefa');
    camposDeTarefas.forEach(element => {
        element.addEventListener('keydown', (event) =>{
            if (event.key === 'Enter'){
                console.log(event.target.value);
            }
        })
    });