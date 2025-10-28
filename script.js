document.addEventListener("DOMContentLoaded", function() {

    const botaoAdicionar = document.getElementById("botaoAdicionar");
    const campoNovaTarefa = document.getElementById("campoNovaTarefa");
    const listaDeTarefas = document.getElementById("listaDeTarefas");
    const contador = document.getElementById("contador");
    const seletorPrioridade = document.getElementById("prioridade");
    let pendentes = 0;

    // Habilita / desabilita o botão conforme o input
    campoNovaTarefa.addEventListener("input", function() {
        const texto = campoNovaTarefa.value.trim();
        if (texto === "") {
            botaoAdicionar.disabled = true;
            botaoAdicionar.style.backgroundColor = "gray";
            botaoAdicionar.style.cursor = "not-allowed";
        } else {
            botaoAdicionar.disabled = false;
            botaoAdicionar.style.backgroundColor = "#0d6efd";
            botaoAdicionar.style.cursor = "pointer";
        }
    });

    botaoAdicionar.disabled = true;
    botaoAdicionar.style.backgroundColor = "gray";

    // ======== FUNÇÃO ADICIONAR TAREFA ========
    function adicionarTarefa() {
        const textoTarefa = campoNovaTarefa.value.trim();
        const prioridade = seletorPrioridade.value;

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

        pendentes += 1;
        contador.textContent = `Tarefas Pendentes: ${pendentes}`;

        const itemLista = document.createElement("li");
        const textoSpan = document.createElement("span");
        textoSpan.textContent = textoTarefa;

        // === Tag de prioridade ===
        const tagPrioridade = document.createElement("span");
        tagPrioridade.className = "tag-prioridade";

        if (prioridade === "baixa") {
            tagPrioridade.style.backgroundColor = "#28a745"; // verde
            tagPrioridade.textContent = "Baixa";
        } else if (prioridade === "media") {
            tagPrioridade.style.backgroundColor = "#2196f3"; // azul (alterável)
            tagPrioridade.textContent = "Média";
        } else {
            tagPrioridade.style.backgroundColor = "#dc3545"; // vermelho
            tagPrioridade.textContent = "Urgente";
        }

        const cabecalhoTarefa = document.createElement("div");
        cabecalhoTarefa.className = "cabecalho-tarefa";
        cabecalhoTarefa.appendChild(tagPrioridade);
        cabecalhoTarefa.appendChild(textoSpan);

        // === Progresso ===
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

        inputProgresso.addEventListener("input", function() {
            let valor = parseInt(inputProgresso.value);
            if (isNaN(valor) || valor < 0) valor = 0;
            if (valor > 100) valor = 100;
            inputProgresso.value = valor;

            barraInterna.style.width = valor + "%";

            if (valor <= 49) {
                barraInterna.style.backgroundColor = "#ffc107";
            } else if (valor <= 80) {
                barraInterna.style.backgroundColor = "#0d6efd";
            } else if (valor < 100) {
                barraInterna.style.backgroundColor = "#28a745";
            }

            if (valor === 100 && !itemLista.classList.contains("completo")) {
                itemLista.classList.add("completo");
                setTimeout(() => {
                    itemLista.remove();
                    pendentes -= 1;
                    contador.textContent = `Tarefas Pendentes: ${pendentes}`;
                }, 500);
            }
        });

        const progressoLinha = document.createElement("div");
        progressoLinha.className = "progresso-linha";
        progressoLinha.appendChild(inputProgresso);
        progressoLinha.appendChild(barraProgresso);
        progressoContainer.appendChild(progressoLinha);

        // === Botão deletar ===
        const botaoDeletar = document.createElement("button");
        botaoDeletar.textContent = "X";
        botaoDeletar.className = "deletar";

        // Monta o item
        itemLista.appendChild(cabecalhoTarefa);
        itemLista.appendChild(progressoContainer);
        itemLista.appendChild(botaoDeletar);
        listaDeTarefas.appendChild(itemLista);

        campoNovaTarefa.value = "";
        botaoAdicionar.disabled = true; // desativa novamente
        botaoAdicionar.style.backgroundColor = "gray";
    }

    // ======== FUNÇÃO DE CLIQUE NA LISTA ========
    function lidarCliqueLista(evento) {
        if (evento.target.classList.contains("deletar")) {
            const itemParaRemover = evento.target.parentElement;
            listaDeTarefas.removeChild(itemParaRemover);
            pendentes -= 1;
            contador.textContent = `Tarefas Pendentes: ${pendentes}`;
            return;
        }

        if (evento.target.tagName === "SPAN") {
            evento.target.classList.toggle("concluida");
        }
    }

    // ======== EVENTOS ========
    botaoAdicionar.addEventListener("click", adicionarTarefa);
    listaDeTarefas.addEventListener("click", lidarCliqueLista);

    campoNovaTarefa.addEventListener("keypress", function(evento) {
        if (evento.key === "Enter" && !botaoAdicionar.disabled) {
            adicionarTarefa();
        }
    });
});
