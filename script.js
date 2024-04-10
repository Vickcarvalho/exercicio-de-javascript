/* questão 1 */

function calcularFatorial(numero) {
  if (numero === 0 || numero === 1) {
    return 1;
  } else {
    return numero * calcularFatorial(numero - 1);
  }
}

function combinacao(n, k) {
  if (n < k) {
    return "n deve ser maior ou igual a k";
}

  const numerador = calcularFatorial(n);
  const denominador = calcularFatorial(n - k) * calcularFatorial(k);
  const resultado = numerador / denominador;

  return resultado;
}

function calcularCombinação() {
  const n = parseInt(document.getElementById("nInput").value);
  const k = parseInt(document.getElementById("kInput").value);

  const resultado = combinacao(n, k);
    document.getElementById("resultado").innerText = `C(${n}, ${k}) = ${resultado}`;
}

/* questão 2 */

let intervalId;

function scrollMessage() {
  let messageField = document.getElementById("messageField");
  let message = messageField.value;
  message = message.substring(1) + message[0]; 
  messageField.value = message;
}

function startScroll() {
  intervalId = setInterval(scrollMessage, 200);
}

function stopScroll() {
  clearInterval(intervalId);
}

/* questão 3 */

function inverterTexto() {
  let originalText = document.getElementById("originalTextarea").value;
  let words = originalText.split(" ");
  let invertedWords = words.map(word => word.split("").reverse().join(""));

  let invertedText = invertedWords.join(" ");
            document.getElementById("invertedTextarea").value = invertedText;
}

/*questão 4 */

const display = document.getElementById('display')
const displayText = document.getElementById('display').textContent
const igual = document.getElementById('igual')
const apagar = document.getElementById('apagar')
const maismenos = document.getElementById('maismenos')
const limparCalculo = document.getElementById('limparCalculo')
const limparTudo = document.getElementById('limparTudo')
const porc = document.getElementById('porc')
const virg = document.getElementById('virg')
const divisaoUm = document.getElementById('divisaoUm')
const potencia = document.getElementById('potencia')
const raiz = document.getElementById('raiz')

const nums = document.querySelectorAll("[id*=num]")
const operadores = document.querySelectorAll("[id*=sinal]")

let primeiro = true
let operador
let numeroAnterior
let numeroAtual
let apagarIgual

const ajustaPontoVirgula = () => display.textContent = display.textContent.replace('.', ',')

const inserirDisplay = text => {

  if (primeiro) {
    display.textContent = text
    primeiro = false
  } 
  else {
    display.textContent += text
  }

  display.textContent = display.textContent.substring(0, 17)
  numeroAtual = display.textContent
  apagarIgual = true
}

const inserir = e => inserirDisplay(e.target.textContent)

nums.forEach(e => e.addEventListener('click', inserir))


const inserirOperador = e => {
  primeiro = true
  operador = e.target.textContent
  if (operador == 'x') {
    operador = '*'
  } 
  else if (operador == '÷') {
    operador = '/'
  }
  numeroAnterior = display.textContent
}

operadores.forEach(e => e.addEventListener('click', inserirOperador))

const calcular = () => {

  if (numeroAnterior && operador) {
    let result = numeroAnterior + operador

    if(numeroAtual) {
      result += numeroAtual
    } 
    else {
      result += numeroAnterior
    }

    display.textContent = eval(result.replace(',', '.'))
    ajustaPontoVirgula()

    if (display.textContent == 'NaN') {
      display.textContent = '0'
    }

    numeroAnterior = display.textContent
    primeiro = true
    apagarIgual = false
  }
}

igual.addEventListener('click', calcular)

const apagarUltimo = () => {
  if (apagarIgual) {
    if (display.textContent.length > 1) {
      display.textContent = display.textContent.slice(0, -1)
    } 
    else {
      display.textContent = 0
    }

    primeiro = true
  }
}

apagar.addEventListener('click', apagarUltimo)

const inverteSinal = () => {
  display.textContent = parseFloat(display.textContent.replace(',', '.')) * -1
  ajustaPontoVirgula()
}

maismenos.addEventListener('click', inverteSinal)

const limpaCalculo = () => {
  display.textContent = '0'
  primeiro = true
}

limparCalculo.addEventListener('click', limpaCalculo)

const limpaTudo = () => {
  display.textContent = '0'
  numeroAnterior = '0'
  numeroAtual = '0'
  primeiro = true
}

limparTudo.addEventListener('click', limpaTudo)

const calcPorc = () => {
  display.textContent = parseFloat(display.textContent.replace(',', '.')) / 100
  ajustaPontoVirgula()
  numeroAtual = display.textContent
  primeiro = true
}

porc.addEventListener('click', calcPorc)

const calcDivisaoUm = () => {
  display.textContent = 1 / parseFloat(display.textContent.replace(',', '.')) 
  ajustaPontoVirgula()
  numeroAtual = display.textContent
  numeroAnterior = '0'
  primeiro = true
}

divisaoUm.addEventListener('click', calcDivisaoUm)

const calcPotencia = () => {
  display.textContent = Math.pow(parseFloat(display.textContent.replace(',', '.')), 2)
  ajustaPontoVirgula()
  numeroAtual = display.textContent
  numeroAnterior = '0'
  primeiro = true
}

potencia.addEventListener('click', calcPotencia)

const calcRaiz = () => {
  display.textContent = Math.sqrt(parseFloat(display.textContent.replace(',', '.')))
  ajustaPontoVirgula()
  numeroAtual = display.textContent
  numeroAnterior = '0'
  primeiro = true
}

raiz.addEventListener('click', calcRaiz)

/* questão 5 a) */

function countDays() {
  const inputDate = document.getElementById("dateInput").value;
  const regex = /^(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/]\d{4}$/;

  if (!inputDate.match(regex)) {
    alert("Porfavor inseri o formato correto, dd/mm/aaaa.");
    return;
  }

  const [day, month, year] = inputDate.split("/").map(Number);
  const today = new Date();
  const targetDate = new Date(year, month - 1, day);

  if (year < today.getFullYear() || (year === today.getFullYear() && month < today.getMonth() + 1) || (year === today.getFullYear() && month === today.getMonth() + 1 && day < today.getDate())) {
    targetDate.setFullYear(targetDate.getFullYear() + 1);
  }

  const oneDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.ceil((targetDate - today) / oneDay);
  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);
  const days = diffDays % 30;

  document.getElementById("result").innerHTML = `
    <p>Anos: ${years}</p>
    <p>Meses: ${months}</p>
    <p>Dias: ${days}</p>
    `;
}


const timeDisplay = document.getElementById("time");
const bgColorDisplay = document.getElementById("bgColor");


/* questão 5 b) */

function updateTime() {
  const now = new Date();
  const hours = now.getHours();
  let timeOfDay;

if (hours >= 6 && hours < 12) {
   timeOfDay = "morning";
  document.body.style.backgroundColor = "white";
  document.body.style.color = "black";
} else if (hours >= 12 && hours < 18) {
   timeOfDay = "morning";
  document.body.style.backgroundColor = "yellow";
  document.body.style.color = "black";
} else if (hours >= 18 && hours < 24) {
   timeOfDay = "morning";
  document.body.style.backgroundColor = "darkgray";
  document.body.style.color = "white";
} else if (hours >= 0 && hours < 6) {
   timeOfDay = "morning";
  document.body.style.backgroundColor = "blue";
  document.body.style.color = "white";
}
  bgColorDisplay.textContent = document.body.style.backgroundColor;

  document.title = `${timeOfDay} Time of Day Page`;
}

updateTime();
setInterval(updateTime, 60000);
