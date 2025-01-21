const input = document.getElementById("ip-address");
const button = document.getElementById("button");

button.addEventListener("click", () => {
  console.log(input.value);

  // TODO fazer verificação se é um IP válido


  converteIPParaBinario(input.value);
});

function converteIPParaBinario (ip) {
  const mascaraEip = ip.split('/');
  const numeros = mascaraEip[0].split('.').map((numero) => parseInt(numero));
  
  // Extração do IP
  const converteNumeroParaBinario = (numero) => {
    let pilha = [];

    while (numero != 0) {
      if (numero % 2 == 0)  {
        pilha.push(0);
      } else pilha.push(1);

      numero = Math.floor(numero / 2);
    }

    return pilha.reverse().join('');
  }

  const binariosIP = numeros.map((numero) => converteNumeroParaBinario(numero));
  
  // Extração da máscara
  let numeroMascara = parseInt(mascaraEip[1]);
  let mascara = Array(4).map((l) => {
    l = new Array(8).fill(1, 0, numeroMascara % 9); // FIXME Não é módulo
    numeroMascara = numeroMascara - 8;
  });
  
  console.log(mascaraEip, numeros, binariosIP, mascara);
}