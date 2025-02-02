import {
  calculaEnderecoDeRede,
  calculaEnderecoDeBroadcast,
  calculaSubredes,
  converteIPParaBinario,
  descobreClasse,
  calculaHostPorSubrede,
  encontraFaixaHost,
} from "./ip.js";

const input = document.getElementById("ip-address");
const button = document.getElementById("button");
const endRedeP = document.getElementById("end-rede");
const endBroadcastP = document.getElementById("end-broadcast");
const classeP = document.getElementById("classe");
const numeroSubredesP = document.getElementById("numero-subredes");
const numeroHostPorSubredeP = document.getElementById("host-por-subrede");
const faixaHostP = document.getElementById("faixa-host");
const erroSpan = document.getElementById("erro");

button.addEventListener("click", () => {
  erroSpan.innerText = "";
  const inputValue = input.value;
  const primeiroOcteto = parseInt(inputValue.split(".")[0]);
  const mascara = parseInt(inputValue.split("/")[1]);

  let erro = false;
  inputValue.split(".").forEach((octeto) => {
    if (parseInt(octeto) > 255 || parseInt(octeto) < 0) {
      erroSpan.innerText = "Digite os octetos entre 0 e 255";
      erro = true;
    }
  });

  
  if (
    isNaN(primeiroOcteto) ||
    isNaN(parseInt(inputValue.split(".")[1])) ||
    isNaN(parseInt(inputValue.split(".")[2])) ||
    isNaN(mascara)
  ) {
    erroSpan.innerText = "Digite os valores corretamente";
    erro = true
  }
  
  if (erro) return;

  const { mascaraBin, ipBin } = converteIPParaBinario(inputValue);

  const endRede = calculaEnderecoDeRede(ipBin, mascaraBin);
  endRedeP.innerText = `Endereço de rede: ${endRede}.`;

  const endBroadcast = calculaEnderecoDeBroadcast(ipBin, mascaraBin);
  endBroadcastP.innerText = `Endereço de broadcast: ${endBroadcast}.`;

  const classe = descobreClasse(primeiroOcteto);
  classeP.innerText = `Classe: ${classe}.`;

  const numeroSubredes = calculaSubredes(mascara);
  numeroSubredesP.innerText = `Número de subredes: ${numeroSubredes}.`;

  const hostPorSubrede = calculaHostPorSubrede(mascara);
  numeroHostPorSubredeP.innerText = `Número de host/subrede: ${hostPorSubrede}.`;

  const faixa = encontraFaixaHost(endBroadcast, endRede);
  faixaHostP.innerText = `Faixa de endereço que o host pertence: ${faixa}.`;

  //listaSubredes();
});
