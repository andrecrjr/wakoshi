import { TokenSet } from "next-auth";
import { IHeartBeatData } from "./types/wakatimeTypes";

export const tokenConverter = (tokenString:string):TokenSet =>{

    let tokenArray = tokenString.split("&");
    let tokenObject:TokenSet = {}
    // Itera sobre o array de substrings
    for (let tokenParam of tokenArray) {
    // Divide cada substring em um array de duas partes, usando o caractere = como separador
        let [key, value] = tokenParam.split("=");
        // Atribui o valor ao objeto do tipo TokenSetParameters, usando a chave correspondente
        tokenObject[key] = value;
    }
    return tokenObject
}

export function calcularProdutividade(dadosHeartbeat:IHeartBeatData[]) {
  let totalLinhasEscritas = 0;
  let tempoTotal = 0;

  dadosHeartbeat.forEach(heartbeat => {
    if (heartbeat.is_write) {
      totalLinhasEscritas += heartbeat.line_additions;
      tempoTotal += heartbeat.time;
    }
  });

  const produtividade = totalLinhasEscritas / (tempoTotal / 3600); // Linhas por hora
  return produtividade;
}
