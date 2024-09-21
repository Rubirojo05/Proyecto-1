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
      const currentChar = value.getPosition(i);
      const currentValue = HexadecimalValue[currentChar];

      if (currentValue === undefined) {
        return Result.error(new ErrorOwn("Valor hexadecimal no válido"));
      }

      result = result * 16 + currentValue;
    }

    return Result.success(result.toString());
  }
}

export class HexadecimalNumber {
  private value: string;
  private static regex = new RegExp("^[0-9A-Fa-f]+$");

  private constructor(input: string) {
    this.value = input.toUpperCase();
  }

  public static fromString(input: string): Result<HexadecimalNumber> {
    if (!this.regex.test(input)) {
      return Result.error(new ErrorOwn("Formato de número hexadecimal no válido"));
    }

    return Result.success(new HexadecimalNumber(input));
  }

  public getLength(): number {
    return this.value.length;
  }

  public getPosition(index: number): string {
    return this.value.charAt(index);
  }
}

const HexadecimalValue: { [key: string]: number } = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  'A': 10,
  'B': 11,
  'C': 12,
  'D': 13,
  'E': 14,
  'F': 15
};
