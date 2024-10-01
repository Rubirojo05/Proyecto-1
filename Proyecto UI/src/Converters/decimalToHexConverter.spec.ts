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

describe("Hexable", () => {
  it("should return error when nothing is passed", () => {
    const input = "";
    const romanizable = NumberHexable.fromString(input);
    expect(romanizable.getError().message).toEqual("Formato de número hexadecimal no válido - fuera de rango (0-65535)");
  });
});

describe("Hexable", () => {
  it("should return error when lowcase is passed", () => {
    const input = "a";
    const romanizable = NumberHexable.fromString(input);
    expect(romanizable.getError().message).toEqual("Formato de número hexadecimal no válido - no es un número");
  });
});

describe("Hexable", () => {
  it("should return error when special character is passed", () => {
    const input = "/";
    const romanizable = NumberHexable.fromString(input);
    expect(romanizable.getError().message).toEqual("Formato de número hexadecimal no válido - no es un número");
  });
});

describe("decimalToHexadecimalConverter", () => {
  it("should return 1C8 when 456 is passed", () => {
    const input = "456";
    const converter = new DecimalToHexadecimalConverter();
    expect(converter.convert(input).getValue()).toEqual("1C8");
  });
});

describe("HexadecimaltoDecimalConverter", () => {
  it("should return 456 when 1C8 is passed", () => {
    const input = "1C8";
    const converter = new HexadecimalToDecimalConverter();
    expect(converter.convert(input).getValue()).toEqual("456");
  });
});



// tests de numero menor que 1 [hecho]
// tests de numero mayor que 65535 [hecho]
// tests de numero 456 -> 1C8 [hecho]
// test de un numero hexadecimal vacio [hecho]
// test de un numero hexadecimal invalido (caracteres en minuscula) [hecho]
// test de un numero hexadecimal invalido (caracteres no permitidos) [hecho]
// tests de numero 1C8 -> 456 [hecho]