const seletorOrigem = document.getElementById("moedaOrigem");
const seletorDestino = document.getElementById("moedaDestino");
const botaoConverter = document.getElementById("botaoConverter");
const campoValor = document.getElementById("valor");
const elementoResultado = document.getElementById("resultado");

async function carregarMoedas() {
  try {
    const resposta = await fetch("https://api.frankfurter.app/currencies");
    const dados = await resposta.json();
    const listaMoedas = Object.keys(dados).sort();

    listaMoedas.forEach(moeda => {
      const opcaoOrigem = new Option(moeda, moeda);
      const opcaoDestino = new Option(moeda, moeda);
      seletorOrigem.add(opcaoOrigem);
      seletorDestino.add(opcaoDestino);
    });

    seletorOrigem.value = "USD";
    seletorDestino.value = "BRL";
  } catch (erro) {
    elementoResultado.textContent = "Erro ao carregar moedas.";
  }
}

async function converterMoeda() {
  const valor = parseFloat(campoValor.value);
  const moedaDe = seletorOrigem.value;
  const moedaPara = seletorDestino.value;

  if (isNaN(valor) || valor <= 0 || moedaDe === moedaPara) {
    elementoResultado.textContent = "Insira um valor válido e moedas diferentes.";
    return;
  }

  try {
    const url = `https://api.frankfurter.app/latest?amount=${valor}&from=${moedaDe}&to=${moedaPara}`;
    const resposta = await fetch(url);
    const dados = await resposta.json();
    const valorConvertido = dados.rates[moedaPara];

    elementoResultado.textContent = `${valor} ${moedaDe} = ${valorConvertido.toFixed(2)} ${moedaPara}`;
  } catch (erro) {
    elementoResultado.textContent = "Erro na conversão.";
  }
}

botaoConverter.addEventListener("click", converterMoeda);
carregarMoedas();
