const calculadora = require("../models/calculadora.js");

test("Deve somar 100 + 600 e retornar 700", () => {
    const result = calculadora.somar(100, 600);
    console.log(result);
    expect(result).toBe(700); 

});