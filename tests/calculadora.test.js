const calculadora = require("../models/calculadora.js");

test("Deve somar 100 + 600 e retornar 700", () => {
    const result = calculadora.somar(100, 600);
    console.log(result);
    expect(result).toBe(700); 

});

test("O programa não deve retornar String, mas sim erro.", () => {
    const result = calculadora.somar('jefferson', 17);
    console.log(result);
    expect(result).toBe("Erro: Argumentos inválidos"); 

});