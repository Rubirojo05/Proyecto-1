import { ErrorOwn } from "../../BuildingBlocks/errorOwn";
import { Result } from "../../BuildingBlocks/result";
import type { ConverterType } from "../../Common/converterType";

export class RomanToDecimalConverter implements ConverterType {
  convert(romanNumberInput: string): Result<string> {
    const romanNumber = RomanNumber.fromString(romanNumberInput);

    if (romanNumber.isFailure()) {
      return Result.error(romanNumber.getError());
    }

    return this.convertToDecimal(romanNumber.getValue());
  }

  private convertToDecimal(value: RomanNumber): Result<string> {
    let previous = RomanValue.Infinity;
    let result = 0;

    for (let i = 0; i < value.getLength(); i++) {
      const current = value.getPosition(i);
      if (current <= previous) {
        result += Number(current);
      }

      if (current > previous) {
        result -= Number(previous) * 2;
        result += Number(current);
      }

      previous = current;
    }

    return Result.success(result.toString());
  }
}

export class RomanNumber {
  private value: string;
  private static regex = new RegExp(
    "^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$"
  );

  private constructor(input: string) {
    this.value = input;
  }

  public static fromString(input: string): Result<RomanNumber> {
    if (!this.regex.test(input)) {
      return Result.error(new ErrorOwn("Se proporcionó un formato de número romano no válido"));
    }

    return Result.success(new RomanNumber(input));
  }
  public getLength(): number {
    return this.value.length;
  }

  public getPosition(index: number): RomanValue {
    return RomanValue[this.value.charAt(index) as keyof typeof RomanValue];
  }
}

export enum RomanValue {
  I = 1,
  V = 5,
  X = 10,
  L = 50,
  C = 100,
  D = 500,
  M = 1000,
  Infinity = Number.MAX_SAFE_INTEGER,
}
