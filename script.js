document.addEventListener("DOMContentLoaded", function() {

    const botaoAdicionar = document.getElementById("botaoAdicionar");
    const campoNovaTarefa = document.getElementById("campoNovaTarefa");
    const listaDeTarefas = document.getElementById("listaDeTarefas");
    const contador = document.getElementById("contador");
    let pendetes = 0;

    campoNovaTarefa.addEventListener("input", function() {
    const texto = campoNovaTarefa.value.trim();
    if (texto === "") {
        botaoAdicionar.disabled = true;                // desativa o botão
        botaoAdicionar.style.backgroundColor = "gray"; // cor cinza
        botaoAdicionar.style.cursor = "not-allowed";   // cursor de bloqueado
    } else {
        botaoAdicionar.disabled = false;               // ativa o botão
        botaoAdicionar.style.backgroundColor = "#0d6efd"; // azul padrão
        botaoAdicionar.style.cursor = "pointer";       // cursor normal
    }
    });

    botaoAdicionar.disabled = true; // começa desativado
    botaoAdicionar.style.backgroundColor = "gray";


    function adicionarTarefa() {
        const textoTarefa = campoNovaTarefa.value.trim(); 
        if (textoTarefa === "") {
            alert("Por favor, digite uma tarefa.");
            return; 
        }
        
        const tarefasExistentes = listaDeTarefas.querySelectorAll("li span");
    for (let tarefa of tarefasExistentes) {
        if (tarefa.textContent.toLowerCase() === textoTarefa.toLowerCase()) {
            alert("Essa tarefa já existe na lista!");
            campoNovaTarefa.value = "";
            return;
        }
    }
        pendetes += 1;
        contador.textContent = `Tarefas Pendentes: ${pendetes}`;
        const itemLista = document.createElement("li");
        const textoSpan = document.createElement("span");
        textoSpan.textContent = textoTarefa;

        // ======== BLOCO DE PROGRESSO =========
        const progressoContainer = document.createElement("div");
        progressoContainer.className = "progresso-container";

        const inputProgresso = document.createElement("input");
        inputProgresso.type = "number";
        inputProgresso.min = "0";
        inputProgresso.max = "100";
        inputProgresso.value = "0";
        inputProgresso.className = "input-progresso";

        const barraProgresso = document.createElement("div");
        barraProgresso.className = "barra-progresso";

        const barraInterna = document.createElement("div");
        barraInterna.className = "barra-interna";
        barraProgresso.appendChild(barraInterna);

        // Atualiza a barra conforme o valor digitado
        inputProgresso.addEventListener("input", function() {
            let valor = parseInt(inputProgresso.value);
            if (isNaN(valor) || valor < 0) valor = 0;
            if (valor > 100) valor = 100;
            inputProgresso.value = valor;

            // Atualiza largura da barra
            barraInterna.style.width = valor + "%";

            // Define cor conforme o progresso
            if (valor <= 49) {
                barraInterna.style.backgroundColor = "#ffc107"; // amarelo
            } else if (valor <= 80) {
                barraInterna.style.backgroundColor = "#0d6efd"; // azul
            } else if (valor < 100) {
                barraInterna.style.backgroundColor = "#28a745"; // verde
            }

            // Quando chega a 100%, remove a tarefa
            if (valor === 100 && !itemLista.classList.contains("completo")) {
                itemLista.classList.add("completo");
                setTimeout(() => {
                    itemLista.remove();
                    pendetes -= 1;
            contador.textContent = `Tarefas Pendentes: ${pendetes}`;
                }, 500); // pequena transição antes de sumir
            }
        });

       const progressoLinha = document.createElement("div");
progressoLinha.className = "progresso-linha";

progressoLinha.appendChild(inputProgresso);
progressoLinha.appendChild(barraProgresso);

progressoContainer.appendChild(progressoLinha);
        // =====================================

        const botaoDeletar = document.createElement("button");
        botaoDeletar.textContent = "X";
        botaoDeletar.className = "deletar"; 

        itemLista.appendChild(textoSpan);
        itemLista.appendChild(progressoContainer);
        itemLista.appendChild(botaoDeletar);

        listaDeTarefas.appendChild(itemLista);
        campoNovaTarefa.value = "";
    }

    function lidarCliqueLista(evento) {
        if (evento.target.classList.contains("deletar")) {
            const itemParaRemover = evento.target.parentElement;
            listaDeTarefas.removeChild(itemParaRemover);
            pendetes -= 1;
            contador.textContent = `Tarefas Pendentes: ${pendetes}`;
        }

        if (evento.target.tagName === "SPAN") {
            evento.target.classList.toggle("concluida");
            
        }
    }

    botaoAdicionar.addEventListener("click", adicionarTarefa);
    listaDeTarefas.addEventListener("click", lidarCliqueLista);

    campoNovaTarefa.addEventListener("keypress", function(evento) {
        if (evento.key === "Enter") {
            adicionarTarefa();
        }
    });

});
