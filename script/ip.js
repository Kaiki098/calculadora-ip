export function converteIPParaBinario(ipValue) {
  const mascaraEip = ipValue.split("/");
  const numeros = mascaraEip[0].split(".").map((numero) => parseInt(numero));

  // Extração do IP
  const converteNumeroParaBinario = (numero) => {
    let pilha = [];

    while (numero != 0 || pilha.length < 8) {
      if (numero % 2 == 0) {
        pilha.push(0);
      } else pilha.push(1);

      numero = Math.floor(numero / 2);
    }

    return pilha.reverse();
  };

  const ipBin = numeros.map((numero) => converteNumeroParaBinario(numero));

  // Extração da máscara
  let numeroMascara = parseInt(mascaraEip[1]);
  const mascaraBin = Array(4)
    .fill(0) // precisa desse fill 0?
    .map(() => {
      const bits = new Array(8)
        .fill(1, 0, numeroMascara > 8 ? 8 : numeroMascara)
        .fill(0, numeroMascara, 8);
      numeroMascara = numeroMascara - 8;

      if (numeroMascara < 0) numeroMascara = 0;
      return bits;
    });

  return { mascaraBin, ipBin };
}

export function converteParaIpDecimal(ipBin) {
  let ipDecimal = new Array(4).fill(0);
  const ipBinInvertido = ipBin.map((bin) => [...bin].reverse());
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 8; j++) {
      if (ipBinInvertido[i][j] === 1) ipDecimal[i] += 2 ** j;
    }
  }

  return ipDecimal.join(".");
}

export function calculaSubredes(mascara) {
  if (mascara < 16) return 2 ** (mascara - 8);
  else if (mascara < 24) return 2 ** (mascara - 16);
  else return 2 ** (mascara - 24);
}

export function calculaEnderecoDeRede(ipBin, mascaraBin) {
  let enderecoDeRede = Array(4)
    .fill()
    .map(() => Array(8).fill(0));

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 8; j++) {
      if (ipBin[i][j] + mascaraBin[i][j] === 2) {
        enderecoDeRede[i][j] = 1;
      }
    }
  }

  return converteParaIpDecimal(enderecoDeRede);
}

export function calculaEnderecoDeBroadcast(ipBin, mascaraBin) {
  let endBroadcast = Array(4)
    .fill()
    .map(() => Array(8).fill(0));

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 8; j++) {
      if (ipBin[i][j] === 1 || mascaraBin[i][j] === 0) {
        endBroadcast[i][j] = 1;
      }
    }
  }

  return converteParaIpDecimal(endBroadcast);
}

export function descobreClasse(primeiroOcteto) {
  if (primeiroOcteto < 128) return 'A';
  else if (primeiroOcteto < 192) return 'B';
  else if (primeiroOcteto < 223) return 'C';
  else return 'D'
}

