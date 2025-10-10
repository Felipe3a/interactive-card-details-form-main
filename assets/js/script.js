// --- 1. Seleção dos Elementos ---
// Inputs do formulário
const cardholderNameInput = document.getElementById("nome-input");
const cardNumberInput = document.getElementById("num-input");
const expMonthInput = document.getElementById("mes-input");
const expYearInput = document.getElementById("ano-input");
const cvcInput = document.getElementById("cvc-input");

// Elementos de exibição no cartão
const displayName = document.getElementById("nome");
const displayNumber = document.getElementById("num");
const displayDate = document.getElementById("date");
const displayCvc = document.getElementById("cvc");

// NOVO: Seleciona o ícone do "olho" que deve estar no seu HTML
const toggleVisibilityButton = document.getElementById("toggle-visibility");



const areaFormulario = document.getElementById('area-formulario'); 
const completeDiv = document.getElementById('complete'); 

// --- 2. Funções Auxiliares ---

/**
 * Formata uma string de números com espaços a cada 4 dígitos.
 * Ex: "1234567890123456" => "1234 5678 9012 3456"
 */
function formatCardNumber(numberString) {
  if (!numberString) {
    return "0000 0000 0000 0000";
  }
  const chunks = numberString.match(/.{1,4}/g) || [];
  return chunks.join(' ');
}

/**
 * Mascara um número de cartão, exibindo apenas os últimos 3 dígitos.
 * Ex: "1234567890123456" => "*************456"
 */
function maskCardNumber(numberString) {
  if (!numberString || numberString.length <= 3) {
    return numberString;
  }
  const lastThreeDigits = numberString.slice(-3);
  const maskedPart = "*".repeat(numberString.length - 3);
  return maskedPart + lastThreeDigits;
}


// --- 3. Lógica em Tempo Real ---

// MUDANÇA: Agora este listener APENAS filtra as letras do input.
cardNumberInput.addEventListener('input', () => {
  // Remove qualquer caractere que não seja um número
  let cleanedValue = cardNumberInput.value.replace(/\D/g, '');
  cardNumberInput.value = cleanedValue;
  
  // A linha que atualizava o cartão em tempo real foi REMOVIDA, como você pediu.
});

// NOVO: Lógica para o botão do "olho" revelar/esconder o número
toggleVisibilityButton.addEventListener('click', () => {
  if (cardNumberInput.type === 'password') {
    cardNumberInput.type = 'text';
    toggleVisibilityButton.textContent = '🙈'; // Muda o ícone (opcional)
  } else {
    cardNumberInput.type = 'password';
    toggleVisibilityButton.textContent = '👁️'; // Volta o ícone original (opcional)
  }
});


// --- 4. Função Principal de Confirmação ---

function confirmar() {
  const nameValue = cardholderNameInput.value;
  const cardValue = cardNumberInput.value;
  const monthValue = expMonthInput.value;
  const yearValue = expYearInput.value;
  const cvcValue = cvcInput.value;

  // --- ÁREA DE VALIDAÇÃO ---
  if (cardValue.length !== 16) {
    alert("O número do cartão deve ter exatamente 16 dígitos.");
    return; // Para a execução da função aqui
  }
  if (cvcValue.length !== 3) {
    alert("O CVC deve ter exatamente 3 dígitos.");
    return;
  }
  if (!nameValue || !monthValue || !yearValue) {
    alert("Por favor, preencha todos os campos.");
    return;
  }
  
  // --- SE PASSOU NA VALIDAÇÃO, RENDERIZA E MASCARE OS DADOS ---

  alert("Cartão adicionado com sucesso!");

  displayName.textContent = nameValue || "Jane Appleseed";
  
  // MUDANÇA: Renderiza o CVC com asteriscos
  displayCvc.textContent = "*".repeat(cvcValue.length || 3);
  
  displayDate.textContent = `${monthValue || "00"}/${yearValue || "00"}`;

  // Exibe o número MASCARADO no cartão após o sucesso
  displayNumber.textContent = maskCardNumber(cardValue);
  areaFormulario.style.display = 'none';
  completeDiv.style.display = 'flex'; 
}






// --- 2. FUNÇÃO PARA VOLTAR AO ESTADO INICIAL ---
function resetarFormulario() {
    // Oculta a div de sucesso
    completeDiv.style.display = 'none'; 
    
    // Exibe novamente o formulário
    areaFormulario.style.display = 'flex'; // ou 'block', dependendo de como você estilizou 'area-formulario'

    // Opcional: Limpa os campos do formulário
    form.reset(); 
    
    // Opcional: Resetar os números exibidos no cartão para "0000 0000..."
    // (Isso depende de como você lida com os valores padrão no seu JS de interatividade)
}


function recarregarPagina() {
    window.location.reload();
}

// Opcional: Adicionar um ouvinte para o botão de confirmação, se ele for um botão normal e não um submit.
// document.getElementById('button-confirm').addEventListener('click', validarFormulario);
