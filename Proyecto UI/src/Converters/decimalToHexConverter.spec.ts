import { describe, expect, it } from "@jest/globals";
import { DecimalToHexadecimalConverter, NumberHexable } from "./decimalToHexConverter";
import { HexadecimalNumber, HexadecimalToDecimalConverter } from "./hexToDecimalConverter";

describe("decimalToHexadecimalConverter", () => {
  it("should return 1 when 1 is passed", () => {
    const input = "1";
    const converter = new DecimalToHexadecimalConverter();
    expect(converter.convert(input).getValue()).toEqual("1");
  });
});

describe("Hexable", () => {
  it("should return error when -1 is passed", () => {
    const input = "-1";
    const romanizable = NumberHexable.fromString(input);
    expect(romanizable.getError().message).toEqual("Formato de número hexadecimal no válido - fuera de rango (0-65535)");
  });
});

describe("Hexable", () => {
  it("should return error when 65536 is passed", () => {
    const input = "65536";
    const romanizable = NumberHexable.fromString(input);
    expect(romanizable.getError().message).toEqual("Formato de número hexadecimal no válido - fuera de rango (0-65535)");
  });
});

describe("decimalToHexadecimalConverter", () => {
  it("should return 1C8 when 456 is passed", () => {
    const input = "456";
    const converter = new DecimalToHexadecimalConverter();
    expect(converter.convert(input).getValue()).toEqual("1C8");
  });
});

describe("romanizable", () => {
  it("should return error when nothing is passed", () => {
    const input = "";
    const romanizable = NumberHexable.fromString(input);
    expect(romanizable.getError().message).toEqual("Formato de número hexadecimal no válido - fuera de rango (0-65535)");
  });
});

// tests de numero menor que 1 [hecho]
// tests de numero mayor que 65535 [hecho]
// tests de numero 456 -> 1C8 [hecho]
// test de un numero hexadecimal vacio
// test de un numero hexadecimal invalido (caracteres en minuscula)
// test de un numero hexadecimal invalido (caracteres no permitidos)
// tests de numero CDLVI -> 456 