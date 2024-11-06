

// Verifica se o navegador suporta a Web Speech APi
if (!('webkitSpeechRecognition' in window)) {
    alert("Seu navegador não suporta a Web Speech API. Tente usar o Chrome.");
} else {
    // Inicializa o reconhecimento de voz
    const recognition = new webkitSpeechRecognition();
    recognition.interimResults = false;
    recognition.continuous = false;

    const startButton = document.getElementById("start-button");
    const output = document.getElementById("output");
    const languageSelect = document.getElementById("language");

    // Define o idioma com base na seleção do usuário
    languageSelect.addEventListener("change", () => {
        recognition.lang = languageSelect.value;
    });

    // Inicia o reconhecimento de voz quando o botão é clicado
    startButton.addEventListener("click", () => {
        recognition.lang = languageSelect.value; // Atualiza o idioma antes de iniciar
        recognition.start();
        startButton.textContent = "Escutando...";
    });

    // Função chamada ao obter resultado
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        output.textContent = transcript;
        startButton.textContent = "Clique para falar";
    };

    // Lida com erros
    recognition.onerror = (event) => {
        console.error("Erro no reconhecimento:", event.error);
        startButton.textContent = "Clique para falar";
    };

    // Volta o botão ao estado inicial ao terminar
    recognition.onend = () => {
        startButton.textContent = "Clique para falar";
    };
}
