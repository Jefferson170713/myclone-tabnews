function somar(numero1, numero2) {
  if (typeof numero1 !== "number" || typeof numero2 !== "number") {
    return "Erro: Argumentos inválidos";
  }
  return numero1 + numero2;
}

function subtrair(numero1, numero2) {
  if (typeof numero1 !== "number" || typeof numero2 !== "number") {
    return "Erro: Argumentos inválidos";
  }
  return numero1 - numero2;
}

function dividir(numero1, numero2) {
  if (typeof numero1 !== "number" || typeof numero2 !== "number") {
    return "Erro: Argumentos inválidos";
  }
  if (numero2 === 0) {
    return "Erro: Não é possível dividir por zero";
  }
  return numero1 / numero2;
}

function multiplicar(numero1, numero2) {
  if (typeof numero1 !== "number" || typeof numero2 !== "number") {
    return "Erro: Argumentos inválidos";
  }
  return numero1 * numero2;
};
// exports.somar = somar;
// exports.subtrair = subtrair;
// exports.dividir = dividir;

module.exports = { 
  somar, 
  subtrair, 
  dividir, 
  multiplicar
};
// export { somar, subtrair, dividir };
// export default { somar, subtrair, dividir };

