import { describe, expect, it } from "@jest/globals";
import { DecimalToRomanConverter, NumberRomanable } from "./decimalToRomanConverter";

describe("decimalToRomanConverter", () => {
  it("should return I when 1 is passed", () => {
    const input = "1";
    const converter = new DecimalToRomanConverter();
    expect(converter.convert(input).getValue()).toEqual("I");
  });
});


describe("romanizable", () => {
    it("should return error when 0 is passed", () => {
      const input = "0";
      const romanizable = NumberRomanable.fromString(input);
      expect(romanizable.getError().message).toEqual("Formato de número romano no válido - fuera de rango (1-3999)");
    });
  });

// component -> Converter/Service -> Algortimo -> Resultado
// tests de numero menor que 1
// tests de numero mayor que 3999
// tests de numero 456 -> CDLVI
// test de un numero romano vacio
// test de un numero romano invalido (caracteres en minuscula)
// test de un numero romano invalido (caracteres no permitidos)
// tests de numero CDLVI -> 456


// convertidor hexadecimal a decimal 
// convertidor Romano a hexadecimal





