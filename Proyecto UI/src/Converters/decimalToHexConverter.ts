import { ErrorOwn } from "../../BuildingBlocks/errorOwn";
import { Result } from "../../BuildingBlocks/result";
import type { ConverterType } from "../../Common/converterType";

export class DecimalToHexadecimalConverter implements ConverterType {
  convert(integerInput: string): Result<string> {
    const hexNumber = NumberHexable.fromString(integerInput);

    if (hexNumber.isFailure()) {
      return Result.error(hexNumber.getError());
    }

    return this.convertToHexadecimal(hexNumber.getValue());
  }

  private convertToHexadecimal(value: NumberHexable): Result<string> {
    let result = "";

    result = result.concat(
      this.convertThousands(value.getThousands()),
      this.convertHundreds(value.getHundreds()),
      this.convertTens(value.getTens()),
      this.convertUnits(value.getUnits())
    );

    result = result.replace(/^0+/, '');

    return Result.success(result);
  }

  private convertUnits(value: number): string {
    switch (value) {
      case 1: return "1";
      case 2: return "2";
      case 3: return "3";
      case 4: return "4";
      case 5: return "5";
      case 6: return "6";
      case 7: return "7";
      case 8: return "8";
      case 9: return "9";
      case 10: return "A";
      case 11: return "B";
      case 12: return "C";
      case 13: return "D";
      case 14: return "E";
      case 15: return "F";
      default: return "0";
    }
  }

  private convertTens(value: number): string {
    return this.convertUnits(value / 16);
  }

  private convertHundreds(value: number): string {
    return this.convertUnits(value / (16 * 16));
  }

  private convertThousands(value: number): string {
    return this.convertUnits(value / (16 * 16 * 16));
  }
}

export class NumberHexable {
  private value: number;

  private constructor(input: number) {
    this.value = input;
  }

  public static fromString(input: string): Result<NumberHexable> {
    if (!Number.isInteger(Number(input))) {
      return Result.error(
        new ErrorOwn("Formato de número hexadecimal no válido - no es un número")
      );
    }
    const number = Number(input);

    if (number < 0 || number > 65535) { 
      return Result.error(
        new ErrorOwn("Formato de número hexadecimal no válido - fuera de rango (0-65535)")
      );
    }

    return Result.success(new NumberHexable(number));
  }

  public getUnits(): number {
    return this.value % 16;
  }

  public getTens(): number {
    return Math.floor((this.value % 256) / 16) * 16;
  }

  public getHundreds(): number {
    return Math.floor((this.value % 4096) / 256) * 256;
  }

  public getThousands(): number {
    return Math.floor(this.value / 4096) * 4096;
  }
}
