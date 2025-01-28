import {
  calculaEnderecoDeRede,
  calculaEnderecoDeBroadcast,
  calculaSubredes,
  converteIPParaBinario,
  descobreClasse
} from "./ip.js";

const input = document.getElementById("ip-address");
const button = document.getElementById("button");
const endRedeP = document.getElementById("end-rede");
const endBroadcastP = document.getElementById("end-broadcast");
const classeP = document.getElementById("classe");
const numeroSubredesP = document.getElementById("numero-subredes");

button.addEventListener("click", () => {
  // TODO fazer verificação se é um IP válido
  const inputValue = "192.168.1.1/26";
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

  //calculaHosts();
  //listaHosts();
  //listaSubredes();
});
