const input = document.getElementById("ip-address");
const button = document.getElementById("button");

button.addEventListener("click", () => {
  // TODO fazer verificação se é um IP válido

  converteIPParaBinario(input.value);

  //calculaSubredes();
  //calculaHosts();
  //calculaEnderecoDeRede();
  //listaHosts();
  //listaSubredes();
});

function converteIPParaBinario (ip) {
  const mascaraEip = ip.split('/');
  const numeros = mascaraEip[0].split('.').map((numero) => parseInt(numero));
  
  // Extração do IP
  const converteNumeroParaBinario = (numero) => {
    let pilha = [];

    while (numero != 0 || pilha.length < 8) {
      if (numero % 2 == 0)  {
        pilha.push(0);
      } else pilha.push(1);

      numero = Math.floor(numero / 2);
    }

    return pilha.reverse();
  }

  const binariosIP = numeros.map((numero) => converteNumeroParaBinario(numero));
  
  // Extração da máscara
  let numeroMascara = parseInt(mascaraEip[1]);
  const mascara = Array(4)
    .fill(0)
    .map(() => {
      const bits = new Array(8).fill(
        1,
        0,
        numeroMascara > 8 ? 8 : numeroMascara,
      ).fill(0, numeroMascara, 8);
      numeroMascara = numeroMascara - 8;

      if (numeroMascara < 0) numero = 0;
      return bits;
    });
  
  return { mascara, binariosIP };
}

