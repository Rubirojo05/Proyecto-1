import { describe, expect, it } from "@jest/globals";
import { DecimalToRomanConverter, NumberRomanable } from "./decimalToRomanConverter";
import { RomanNumber, RomanToDecimalConverter } from "./romanToDecimalConverter";

describe("decimalToRomanConverter", () => {
  it("should return CDLVI when 456 is passed", () => {
    const input = "456";
    const converter = new DecimalToRomanConverter();
    expect(converter.convert(input).getValue()).toEqual("CDLVI");
  });
});

describe("decimalToRomanConverter", () => {
  it("should return I when 1 is passed", () => {
    const input = "1";
    const converter = new DecimalToRomanConverter();
    expect(converter.convert(input).getValue()).toEqual("I");
  });
});

describe("romanToDecimalConverter", () => {
  it("should return 456 when CDLVI is passed", () => {
    const input = "CDLVI";
    const converter = new RomanToDecimalConverter();
    expect(converter.convert(input).getValue()).toEqual("456");
  });
});

describe("romanizable", () => {
  it("should return error when 0 is passed", () => {
    const input = "0";
    const romanizable = NumberRomanable.fromString(input);
    expect(romanizable.getError().message).toEqual("Formato de número romano no válido - fuera de rango (1-3999)");
  });
});

describe("romanizable", () => {
  it("should return error when -1 is passed", () => {
    const input = "-1";
    const romanizable = NumberRomanable.fromString(input);
    expect(romanizable.getError().message).toEqual("Formato de número romano no válido - fuera de rango (1-3999)");
  });
});

describe("romanizable", () => {
  it("should return error when 4000 is passed", () => {
    const input = "4000";
    const romanizable = NumberRomanable.fromString(input);
    expect(romanizable.getError().message).toEqual("Formato de número romano no válido - fuera de rango (1-3999)");
  });
});

describe("romanizable", () => {
  it("should return error when nothing is passed", () => {
    const input = "";
    const romanizable = NumberRomanable.fromString(input);
    expect(romanizable.getError().message).toEqual("Formato de número romano no válido - fuera de rango (1-3999)");
  });
});

describe("decimable", () =>{
  it("should return error when lowcase is passed", () =>{
    const input = "v";
    const decimable = RomanNumber.fromString(input);
    expect(decimable.getError().message).toEqual("Se proporcionó un formato de número romano no válido");
  });
});

describe("decimable", () =>{
  it("should return error when special character is passed", () =>{
    const input = "*";
    const decimable = RomanNumber.fromString(input);
    expect(decimable.getError().message).toEqual("Se proporcionó un formato de número romano no válido");
  });
});


// component -> Converter/Service -> Algortimo -> Resultado
// tests de numero menor que 1 [hecho]
// tests de numero mayor que 3999 [hecho]
// tests de numero 456 -> CDLVI [hecho]
// test de un numero romano vacio [hecho]
// test de un numero romano invalido (caracteres en minuscula) [hecho]
// test de un numero romano invalido (caracteres no permitidos) [hecho]
// tests de numero CDLVI -> 456 [hecho]


// convertidor hexadecimal a decimal [hecho]
// convertidor Romano a hexadecimal





