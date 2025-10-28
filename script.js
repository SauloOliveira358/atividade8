// Inicia o script "ouvindo" um evento principal: 'DOMContentLoaded'.
// Isso é uma boa prática. Garante que o script JavaScript só vai rodar
// DEPOIS que todo o HTML da página foi carregado e está pronto.
// Se tentarmos selecionar um elemento (ex: getElementById) ANTES do HTML
// carregar, o resultado será 'null' e teremos um erro.
document.addEventListener("DOMContentLoaded", function() {

    // --- Bloco 1: Seleção dos Elementos Principais ---
    // "Guardamos" os elementos do HTML em variáveis (constantes, pois não vão mudar).
    // Isso é feito para melhor performance (não ter que "procurar" o
    // elemento no DOM toda hora) e para o código ficar mais limpo.
    
    // Seleciona o botão de "Adicionar" pelo seu ID
    const botaoAdicionar = document.getElementById("botaoAdicionar");
    // Seleciona o campo de <input> onde o usuário digita
    const campoNovaTarefa = document.getElementById("campoNovaTarefa");
    // Seleciona a lista <ul> onde as tarefas serão inseridas
    const listaDeTarefas = document.getElementById("listaDeTarefas");

    
    // --- Bloco 2: Definição da Função 'adicionarTarefa' ---
    // Criamos uma função separada para organizar o código.
    // Esta função será chamada quando o usuário clicar no botão ou apertar Enter.
    // Ela contém toda a lógica para CRIAR uma nova tarefa.
    function adicionarTarefa() {
        
        // 1. Pega o texto ATUAL que está dentro do campo de input.
        // '.value' é a propriedade que guarda o texto de um <input>.
        // '.trim()' é um método de string que remove espaços em branco
        // inúteis no começo e no fim (ex: "  Lavar louça  " vira "Lavar louça").
        const textoTarefa = campoNovaTarefa.value.trim(); 

        // 2. Validação: Verifica se o usuário realmente digitou algo.
        // Se 'textoTarefa' for uma string vazia ("")...
        if (textoTarefa === "") {
            // ...mostra um alerta simples.
            alert("Por favor, digite uma tarefa.");
            // ...e usa 'return' para parar a execução da função aqui.
            // O resto do código (de criar o <li>) não será executado.
            return; 
        }

        // --- Se a validação passou, começamos a criar o HTML dinamicamente ---

        // 3. Criar os novos elementos que não existem no HTML.
        
        // document.createElement() cria um novo nó/elemento em memória.
        // Ele ainda não está na página, está "flutuando".
        
        // Cria um elemento <li> (ex: <li></li>)
        const itemLista = document.createElement("li");
        
        // Cria um elemento <span> (ex: <span></span>)
        const textoSpan = document.createElement("span");
        
        // Define o conteúdo de texto do <span> para ser o que o usuário digitou.
        // Agora temos: <span>Lavar louça</span>
        textoSpan.textContent = textoTarefa;
        
        // Cria um elemento <button> (ex: <button></button>)
        const botaoDeletar = document.createElement("button");
        
        // Define o texto do botão.
        // Agora temos: <button>X</button>
        botaoDeletar.textContent = "X";
        
        // Adiciona uma classe CSS ao botão. Isso é MUITO importante.
        // É como o CSS vai estilizá-lo (com a classe .deletar) e
        // como o JavaScript (na delegação de evento) vai saber
        // que este é um botão de deletar.
        // Agora temos: <button class="deletar">X</button>
        botaoDeletar.className = "deletar"; 

        // 4. Montar a "árvore" de elementos.
        // O '.appendChild()' "adota" um elemento como filho.
        
        // Pega o <span> (com o texto) e coloca DENTRO do <li>.
        // Agora temos: <li><span>Lavar louça</span></li>
        itemLista.appendChild(textoSpan);
        
        // Pega o <button> (de deletar) e coloca DENTRO do <li>, depois do <span>.
        // Agora temos: <li><span>Lavar louça</span><button class="deletar">X</button></li>
        itemLista.appendChild(botaoDeletar);

        // 5. Adicionar o elemento <li> (já pronto e montado) na página.
        // Nós pegamos a <ul> (que selecionamos lá em cima na 'listaDeTarefas')
        // e "adotamos" o <li> como seu filho.
        // Neste momento, a tarefa aparece visualmente na tela para o usuário.
        listaDeTarefas.appendChild(itemLista);

        // 6. Limpa o campo de input para o usuário digitar a próxima tarefa.
        // Apenas definimos o valor dele de volta para uma string vazia.
        campoNovaTarefa.value = "";
    }

    
    // --- Bloco 3: Definição da Função 'lidarCliqueLista' (Delegação de Evento) ---
    // Esta é a parte mais "avançada" e importante.
    // Esta função será chamada quando QUALQUER lugar dentro da <ul> for clicado.
    
    // O parâmetro 'evento' (ou 'e', 'evt') é um objeto que o navegador nos dá,
    // contendo informações sobre o clique (ex: onde foi, qual tecla foi apertada, etc.).
    function lidarCliqueLista(evento) {
        
        // 'evento.target' é a propriedade mais importante:
        // É o "alvo" exato do clique.
        // Se o usuário clicar no <span>, evento.target será o <span>.
        // Se clicar no <button>, evento.target será o <button>.
        // Se clicar no espaço vazio do <li>, evento.target será o <li>.
        
        // 1. Checar se o clique foi em um botão DELETAR.
        // Usamos '.classList.contains()' para ver se o elemento clicado
        // (evento.target) possui a classe CSS "deletar".
        if (evento.target.classList.contains("deletar")) {
            
            // Se sim, precisamos remover a TAREFA INTEIRA (o <li>).
            // O 'evento.target' é o <button> que foi clicado.
            // '.parentElement' é a propriedade que "sobe" para o "pai" do elemento.
            // O "pai" do <button> é o <li>.
            const itemParaRemover = evento.target.parentElement;
            
            // Agora que temos o <li> (itemParaRemover),
            // dizemos para a <ul> (listaDeTarefas) "remover este seu filho".
            listaDeTarefas.removeChild(itemParaRemover);
        }

        // 2. Checar se o clique foi no TEXTO (o <span>)
        // Usamos '.tagName' para verificar que tipo de elemento foi clicado.
        // (É sempre em maiúsculas: "SPAN", "LI", "BUTTON").
        if (evento.target.tagName === "SPAN") {
            
            // '.classList.toggle()' é um "interruptor" de classe.
            // Se o <span> clicado (evento.target) NÃO tem a classe "concluida",
            // ele adiciona.
            // Se ele JÁ TEM a classe "concluida", ele remove.
            // É isso que faz o efeito de "riscar" e "des-riscar" a tarefa,
            // ativando e desativando aquela regra do CSS (li span.concluida).
            evento.target.classList.toggle("concluida");
        }
    }


    // --- Bloco 4: Adicionar os "Ouvintes de Eventos" (Listeners) ---
    // Este é o "start" da aplicação. Onde dizemos ao JS "o que fazer quando...".
    
    // 1. "JavaScript, ouça por 'cliques' no 'botaoAdicionar'."
    // "Quando um clique acontecer, execute a função 'adicionarTarefa'."
    // (Note: passamos o NOME da função, sem parênteses. Não estamos
    // executando ela agora, estamos dizendo QUAL função executar DEPOIS).
    botaoAdicionar.addEventListener("click", adicionarTarefa);

    // 2. "JavaScript, ouça por 'cliques' DENTRO da 'listaDeTarefas'."
    // "Quando um clique acontecer, execute a função 'lidarCliqueLista'."
    // Este é o "listener" da DELEGAÇÃO DE EVENTO. Em vez de adicionar
    // um listener em cada botão 'X' (o que seria ruim para a performance
    // e não funcionaria para botões criados no futuro), nós colocamos
    // UM listener no "pai" (a <ul>) e deixamos ele gerenciar
    // os cliques nos "filhos".
    listaDeTarefas.addEventListener("click", lidarCliqueLista);

    // 3. Bônus: "Ouvir" o evento 'keypress' (tecla pressionada) no campo de input.
    // O parâmetro 'evento' aqui conterá informação sobre a TECLA.
    campoNovaTarefa.addEventListener("keypress", function(evento) {
        
        // Verificamos se a tecla pressionada foi a tecla "Enter".
        // 'evento.key' é a propriedade moderna para isso.
        if (evento.key === "Enter") {
            // Se foi "Enter", simplesmente chamamos a mesma função
            // que o botão de clique chama.
            adicionarTarefa();
        }
    });

}); // Fim do 'DOMContentLoaded'