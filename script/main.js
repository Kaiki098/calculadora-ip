import {calculaEnderecoDeRede, calculaSubredes, converteIPParaBinario} from "./ip.js";

const input = document.getElementById("ip-address");
const button = document.getElementById("button");

button.addEventListener("click", () => {
  // TODO fazer verificação se é um IP válido
  const inputValue = "192.168.1.1/26";

  const { mascaraBin, ipBin } = converteIPParaBinario(inputValue);

  console.log("Binarios:\n-IP:", ipBin, "-Máscara:", mascaraBin);
  const endRede = calculaEnderecoDeRede(ipBin, mascaraBin);
  console.log(endRede);
  //calculaSubredes();
  //calculaHosts();
  //listaHosts();
  //listaSubredes();
});
