document.addEventListener("DOMContentLoaded", function() {

    const botaoAdicionar = document.getElementById("botaoAdicionar");
    const campoNovaTarefa = document.getElementById("campoNovaTarefa");
    const listaDeTarefas = document.getElementById("listaDeTarefas");

    function adicionarTarefa() {
        const textoTarefa = campoNovaTarefa.value.trim(); 
        if (textoTarefa === "") {
            alert("Por favor, digite uma tarefa.");
            return; 
        }

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
            if (valor === 100) {
                itemLista.classList.add("completo");
                setTimeout(() => {
                    itemLista.remove();
                }, 500); // pequena transição antes de sumir
            }
        });

        progressoContainer.appendChild(inputProgresso);
        progressoContainer.appendChild(barraProgresso);
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
