const calculadora = require("../../models/calculadora.js");

test("Deve somar 100 + 600 e retornar 700", () => {
  const result = calculadora.somar(100, 600);
  // console.log(result);
  expect(result).toBe(700);
});

test("O programa não deve retornar String, mas sim erro.", () => {
  const result = calculadora.somar("jefferson", 17);
  // console.log(result);
  expect(result).toBe("Erro: Argumentos inválidos");
});

test(" O programa não deve retornar String, mas sim um erro.", () => {
  const result = calculadora.somar(17, "jefferson");
  expect(result).toBe("Erro: Argumentos inválidos");
});

test("Deve subtrair 10 - 5 e retornar 5", () => {
  const result = calculadora.subtrair(10, 5);
  expect(result).toBe(5);
});

test("O programa não deve retornar String, mas sim erro.", () => {
  const result = calculadora.subtrair("jefferson", 5);
  expect(result).toBe("Erro: Argumentos inválidos");
});

test("O programa não deve retornar String, mas sim erro.", () => {
  const result = calculadora.subtrair(10, "jefferson");
  expect(result).toBe("Erro: Argumentos inválidos");
});

test("O programa não deve retornar String, mas sim erro.", () => {
  const result = calculadora.multiplicar(10, "jefferson");
  expect(result).toBe("Erro: Argumentos inválidos");
});

test("O programa não deve retornar String, mas sim erro.", () => {
  const result = calculadora.multiplicar(10, 100);
  expect(result).toBe(1000);
});

test("O programa não deve retornar String, mas sim erro.", () => {
  const result = calculadora.multiplicar(10, 0);
  // console.log(result);
  expect(result).toBe(0);
});

test("O programa não deve retornar String, mas sim erro.", () => {
  const result = calculadora.multiplicar(10, -1);
  // console.log(result);
  expect(result).toBe(-10);
});
