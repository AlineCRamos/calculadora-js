
const { createApp } = Vue;


createApp({
    // Define os dados iniciais da aplicação
    data() {
        return {
            display: '0', // Valor exibido no visor da calculadora
            numeroAtual: null, // Número atualmente sendo digitado
            numeroAnterior: null, // Número anterior digitado
            operador: null, // Operador selecionado (+, -, *, /)
        }
    },
    // Define os métodos para lidar com as operações da calculadora
    methods: {
        // Função para lidar com o pressionamento de botões
        lidarBotao(botao) {
            switch (botao) {
                case "+":
                case "-":
                case "*":
                case "/":
                    this.lidarOperador(botao); // Lidar com operadores
                    break;
                case ".":
                    this.lidarDecimal(); // Lidar com ponto decimal
                    break;
                case "=":
                    this.lidarIgual(); // Lidar com o sinal de igual
                    break;
                case "AC":
                    this.lidarClear(); // Lidar com o botão de limpar (AC)
                    break;
                default:
                    this.lidarNumero(botao); // Lidar com números
            }
        },
        // Função para realizar cálculos
        calcular() {
            const num1 = parseFloat(this.numeroAnterior);
            const num2 = parseFloat(this.numeroAtual);
            let result;
            switch (this.operador) {
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
                case '*':
                    result = num1 * num2;
                    break;
                case '/':
                    result = num1 / num2;
                    break;
            }
            this.display = result.toString(); // Atualiza o visor com o resultado do cálculo
        },
        // Função para lidar com a seleção de operadores
        lidarOperador(operador) {
            if (this.numeroAtual !== null && this.numeroAnterior !== null && this.operador !== null) {
                this.calcular(); // Se houver números e um operador anteriores, calcular
            }
            // Atualiza o operador e os números para o próximo cálculo
            this.operador = operador;
            this.numeroAnterior = this.numeroAtual;
            this.numeroAtual = null;
        },
        // Função para lidar com a adição de ponto decimal
        lidarDecimal() {
            if (!this.display.includes(".")) {
                this.display += "."; // Adiciona o ponto decimal ao visor
            }
        },
        // Função para lidar com a operação de igual
        lidarIgual() {
            if (this.operador && this.numeroAnterior && this.numeroAtual !== null) {
                this.calcular(); // Se houver operador e números anteriores, calcular
                // Reseta as variáveis para a próxima operação
                this.operador = null;
                this.numeroAnterior = null;
                this.numeroAtual = parseFloat(this.display);
            }
        },
        // Função para lidar com o botão de limpar
        lidarClear() {
            // Reseta todos os valores para o estado inicial
            this.display = '0';
            this.numeroAnterior = null;
            this.numeroAtual = null;
            this.operador = null;
        },
        // Função para lidar com a entrada de números
        lidarNumero(numero) {
            if (this.display === '0' || this.numeroAtual === null) {
                this.display = numero; // Se o visor estiver vazio ou não houver número atual, exibir o número pressionado
            } else {
                this.display += numero; // Caso contrário, anexar o número pressionado ao visor
            }
            this.numeroAtual = parseFloat(this.display); // Atualiza o número atual
        },
    }
}).mount("#app"); // Monta a aplicação Vue no elemento com id "app" no HTML