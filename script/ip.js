function converteNumeroParaBinario(numero) {
  let pilha = [];

  while (numero != 0 || pilha.length < 8) {
    if (numero % 2 == 0) {
      pilha.push(0);
    } else pilha.push(1);

    numero = Math.floor(numero / 2);
  }

  return pilha.reverse();
}

export function converteIPParaBinario(ipValue) {
  const mascaraEip = ipValue.split("/");
  const numeros = mascaraEip[0].split(".").map((numero) => parseInt(numero));

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

export function calculaHostPorSubrede(mascara) {
  // Tem -2?
  return 2 ** (32 - mascara) - 2;
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
  if (primeiroOcteto < 128) return "A";
  else if (primeiroOcteto < 192) return "B";
  else if (primeiroOcteto < 223) return "C";
  else return "D";
}

export function encontraFaixaHost(endBroadcast, endRede) {
  const ultimoOctetoBroad = parseInt(endBroadcast.split(".")[3]) - 1;
  const primeirosOctetosBroad = endBroadcast.split(".").slice(0, -1).join(".");
  const fimFaixa = `${primeirosOctetosBroad}.${ultimoOctetoBroad}`;

  const ultimoOctetoRede = parseInt(endRede.split(".")[3]) + 1;
  const primeirosOctetosRede = endRede.split(".").slice(0, -1).join(".");
  const inicioFaixa = `${primeirosOctetosRede}.${ultimoOctetoRede}`;

  return `${inicioFaixa} - ${fimFaixa}`;
}

// export function somaBinario(bin1, bin2) {
//   let maior = bin1.length > bin2.length ? bin1 : bin2;
//   let menor = bin1.length > bin2.length ? bin2 : bin1;

//   console.log("MAIOR:", maior, "MENOR:", menor);
//   maior.reverse();
//   menor.reverse();

//   while (menor.length < maior.length) {
//     menor.push("0");
//   }

//   let novoBin = [];
//   for (let i = 0; i < maior.length; i++) {
//     if (maior[i] === "1") {
//       if (menor[i] === "1") {
//         i++;
//         novoBin.push("0");
//         while (true) {
//           if (maior[i] === "1") {
//             if (menor[i] === "1") {
//               novoBin.push("1");
//             } else {
//               novoBin.push("0");
//             }
//           } else if (menor[i] === "1") {
//             novoBin.push("0");
//           } else {
//             novoBin.push("1");
//             break;
//           }
//           i++;
//         }
//       } else {
//         novoBin.push("1");
//       }
//     } else if (menor[i] === "1") {
//       novoBin.push("1");
//     } else {
//       novoBin.push("0");
//     }
//   }

//   return novoBin.reverse().join("");
// }

// export function listaSubredes(mascaraBin, hostPorSubrede) {
//   const hostPorSubredeBin = converteNumeroParaBinario(hostPorSubrede);

//   let lista = [];
//   end broad

//   while()
// }
