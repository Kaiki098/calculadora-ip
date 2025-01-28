import {
  calculaEnderecoDeRede,
  calculaEnderecoDeBroadcast,
  calculaSubredes,
  converteIPParaBinario,
  descobreClasse,
  calculaHostPorSubrede,
  encontraFaixaHost
} from "./ip.js";

const input = document.getElementById("ip-address");
const button = document.getElementById("button");
const endRedeP = document.getElementById("end-rede");
const endBroadcastP = document.getElementById("end-broadcast");
const classeP = document.getElementById("classe");
const numeroSubredesP = document.getElementById("numero-subredes");
const numeroHostPorSubredeP = document.getElementById("host-por-subrede");
const faixaHostP = document.getElementById("faixa-host");

button.addEventListener("click", () => {
  // TODO fazer verificação se é um IP válido
  const inputValue = input.value;
  const primeiroOcteto = parseInt(inputValue.split(".")[0]);
  const mascara = parseInt(inputValue.split('/')[1]);
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
