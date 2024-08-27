import { ErrorOwn } from "../../BuildingBlocks/errorOwn";
import { Result } from "../../BuildingBlocks/result";
import type { ConverterType } from "../../Common/converterType";

export class HexadecimalToDecimalConverter implements ConverterType {
  convert(hexNumberInput: string): Result<string> {
    const hexNumber = HexadecimalNumber.fromString(hexNumberInput);

    if (hexNumber.isFailure()) {
      return Result.error(hexNumber.getError());
    }

    return this.convertToDecimal(hexNumber.getValue());
  }

  private convertToDecimal(value: HexadecimalNumber): Result<string> {
    let result = 0;

    for (let i = 0; i < value.getLength(); i++) {
      const current = value.getPosition(i);
      result = result * 16 + Number(current);
    }

    return Result.success(result.toString());
  }
}

export class HexadecimalNumber {
  private value: string;
  private static regex = new RegExp("^[0-9A-Fa-f]+$");

  private constructor(input: string) {
    this.value = input.toUpperCase(); // Normalizamos a mayúsculas para facilitar la conversión
  }

  public static fromString(input: string): Result<HexadecimalNumber> {
    if (!this.regex.test(input)) {
      return Result.error(new ErrorOwn("Se proporcionó un formato de número hexadecimal no válido"));
    }

    return Result.success(new HexadecimalNumber(input));
  }

  public getLength(): number {
    return this.value.length;
  }

  public getPosition(index: number): HexadecimalValue {
    return HexadecimalValue[this.value.charAt(index) as keyof typeof HexadecimalValue];
  }
}

export enum HexadecimalValue {
    Zero = 0,
    One = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7,
    Eight = 8,
    Nine = 9,
    A = 10,
    B = 11,
    C = 12,
    D = 13,
    E = 14,
    F = 15,
  }
