// Conectando os botões e campos do HTML com o JavaScript                                     
const minutoGolInput = document.getElementById('minutoGol');
const addGolBtn = document.getElementById('addGolBtn');
const resultadoTexto = document.getElementById('resultadoTexto');
const canvas = document.getElementById('graficoSismico');
const minutoChuteGolInput = document.getElementById('minutoChuteGol');
const addChuteGolBtn = document.getElementById('addChuteGolBtn');
const minutoChuteForaInput = document.getElementById('minutoChuteFora');
const addChuteForaBtn = document.getElementById('addChuteForaBtn');
const resetBtn = document.getElementById('resetBtn');

// Lista para armazenar os gols
let gols = [];
let chutesGol = [];
let chutesFora = [];

const grafico = new Chart(canvas, {
    type: 'line',
    data: {
        labels: [], // Minutos do jogo
        datasets: [{
            label: 'Atividade de Gols',
            data: [], // Os picos do gráfico
            borderColor: '#3498db',
            borderWidth: 2,
            pointBackgroundColor: '#fff',
            tension: 0.1
        }]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Minuto do Jogo',
                    color: '#f5f5f5'
                },
                ticks: { color: '#ccc' },
                grid: { color: '#444' }
            },
            y: {
                title: {
                    display: true,
                    text: 'Impacto do Evento',
                    color: '#f5f5f5'
                },
                ticks: { color: '#ccc' },
                grid: { color: '#444' },
                min: 0,
                max: 10
            }
        }
    }
});

// Lógica para adicionar um gol quando o botão for clicado
addGolBtn.addEventListener('click', () => {
    const minuto = parseInt(minutoGolInput.value);

    // Validação básica para garantir que o minuto é um número válido entre 1 e 90
    if (minuto >= 1 && minuto <= 90) {
        gols.push(minuto);
        atualizarGrafico();
        minutoGolInput.value = ''; // Limpa o campo de texto
    } else {
        alert('Por favor, insira um minuto válido (1 a 90).');
    }
});

addChuteGolBtn.addEventListener('click', () => {
    const minuto = parseInt(minutoChuteGolInput.value);
    if (minuto >= 1 && minuto <= 90) {
        chutesGol.push(minuto);
        atualizarGrafico();
        minutoChuteGolInput.value = '';
    } else {
        alert('Por favor, insira um minuto válido (1 a 90).');
    }
});

addChuteForaBtn.addEventListener('click', () => {
    const minuto = parseInt(minutoChuteForaInput.value);
    if (minuto >= 1 && minuto <= 90) {
        chutesFora.push(minuto);
        atualizarGrafico();
        minutoChuteForaInput.value = '';
    } else {
        alert('Por favor, insira um minuto válido (1 a 90).');
    }
});

function atualizarGrafico() {
    // Limpar os dados antigos para recriar o gráfico
    grafico.data.labels = [];
    grafico.data.datasets[0].data = [];

    // Adicionar um pico no gráfico para cada gol
    gols.forEach(minuto => {
        grafico.data.labels.push(minuto);
        grafico.data.datasets[0].data.push(10); // Um pico de 10 para cada gol
    });

    // Ordenar os dados para garantir que a linha do gráfico faça sentido
    const sortedGols = [...gols].sort((a, b) => a - b);
    
    // Agora, vamos adicionar os pontos para mostrar a "linha" de base do gráfico
    let minutosComPicos = {};
    sortedGols.forEach(minuto => minutosComPicos[minuto] = true);
    
    let labelsOrdenadas = [];
    let dadosOrdenados = [];

    for (let i = 1; i <= 90; i++) {
        labelsOrdenadas.push(i);
        if (minutosComPicos[i]) {
            dadosOrdenados.push(10); // Pico
        } else {
            dadosOrdenados.push(0); // Ponto zero
        }
    }
    
    // Atualiza o gráfico com os dados organizados
    grafico.data.labels = labelsOrdenadas;
    grafico.data.datasets[0].data = dadosOrdenados;
    grafico.update();
    
    // A partir daqui, vamos fazer a lógica de cálculo
    calcularChanceDoQuartoGol();
}

// Em seguida, criaremos esta função
function calcularChanceDoQuartoGol() {
    // Lógica para calcular a probabilidade e exibir o alerta
    // Esta parte será o nosso próximo passo
    // ...
}function calcularChanceDoQuartoGol() {
    let golsPrimeiroTempo = 0;
    let terceiroGolNoTempoCerto = false;

    // 1. Contar os gols do primeiro tempo
    // O .filter() percorre a lista 'gols' e pega apenas os que satisfazem a condição
    const golsAte45 = gols.filter(minuto => minuto <= 45);
    golsPrimeiroTempo = golsAte45.length;

    // 2. Verificar o terceiro gol
    // O .sort() ordena os gols em ordem crescente para encontrar o terceiro
    const golsOrdenados = gols.sort((a, b) => a - b);
    
    // Verificamos se há pelo menos 3 gols antes de checar o minuto
    if (golsOrdenados.length >= 3) {
        const terceiroGolMinuto = golsOrdenados[2]; // O índice 2 é o terceiro item
        if (terceiroGolMinuto >= 45 && terceiroGolMinuto <= 61) {
            terceiroGolNoTempoCerto = true;
        }
    }

    // 3. Exibir o resultado com base nas condições
    const resultadoElemento = document.getElementById('resultadoTexto');
    
    // As duas condições devem ser verdadeiras
    if (golsPrimeiroTempo >= 2 && terceiroGolNoTempoCerto) {
        resultadoElemento.textContent = "ALERTA: Possível valor para o quarto gol! ODD (1.80, 2.00)";
        resultadoElemento.style.color = '#2ecc71'; // Cor verde para sucesso
    } else {
        resultadoElemento.textContent = "Condições não atendidas. Aguardando...";
        resultadoElemento.style.color = '#e74c3c'; // Cor vermelha para não atendido
    }
}

function atualizarGrafico() {
    let eventos = [];

    // Adiciona todos os eventos em uma única lista
    gols.forEach(minuto => eventos.push({ minuto, impacto: 10, tipo: 'gol' }));
    chutesGol.forEach(minuto => eventos.push({ minuto, impacto: 5, tipo: 'chute ao gol' }));
    chutesFora.forEach(minuto => eventos.push({ minuto, impacto: 2, tipo: 'chute para fora' }));

    // Limpar os dados antigos para recriar o gráfico
    grafico.data.labels = [];
    grafico.data.datasets[0].data = [];

    // Criar um mapa para armazenar o impacto em cada minuto
    const impactoPorMinuto = {};
    for (let i = 1; i <= 90; i++) {
        impactoPorMinuto[i] = 0;
    }

    // Preencher o mapa com os impactos
    eventos.forEach(evento => {
        if (impactoPorMinuto[evento.minuto] < evento.impacto) {
            impactoPorMinuto[evento.minuto] = evento.impacto;
        }
    });

    // Preparar os dados para o gráfico
    const labelsOrdenadas = Object.keys(impactoPorMinuto).map(Number);
    const dadosOrdenados = Object.values(impactoPorMinuto);

    // Atualiza o gráfico com os dados organizados
    grafico.data.labels = labelsOrdenadas;
    grafico.data.datasets[0].data = dadosOrdenados;
    grafico.update();

    calcularChanceDoQuartoGol();
}
function resetarJogo() {
    // 1. Limpar as listas de eventos
    gols = [];
    chutesGol = [];
    chutesFora = [];

    // 2. Limpar os nomes dos times
    document.getElementById('timeCasa').value = '';
    document.getElementById('timeFora').value = '';

    // 3. Atualizar o gráfico (ele ficará vazio)
    atualizarGrafico(); 

    // 4. Resetar o texto de resultado
    resultadoTexto.textContent = "Aguardando dados...";
    resultadoTexto.style.color = '#f5f5f5'; // Cor padrão

    alert('Análise do jogo limpa. Pronto para um novo jogo!');
}

// Conectando a função ao botão
resetBtn.addEventListener('click', resetarJogo);