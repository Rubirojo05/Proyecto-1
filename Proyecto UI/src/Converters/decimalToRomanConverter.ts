import { ErrorOwn } from "../../BuildingBlocks/errorOwn";
import { Result } from "../../BuildingBlocks/result";
import type { ConverterType } from "../../Common/converterType";

export class DecimalToRomanConverter implements ConverterType {
  convert(integerInput: string): Result<string> {
    const romanNumber = NumberRomanable.fromString(integerInput);

    if (romanNumber.isFailure()) {
      return Result.error(romanNumber.getError());
    }

    return this.convertToRoman(romanNumber.getValue());
  }

  private convertToRoman(value: NumberRomanable): Result<string> {
    let result = "";

    result = result.concat(
      this.convertThousands(value.getThousands()),
      this.convertHundreds(value.getHundreds()),
      this.convertTens(value.getTens()),
      this.convertUnits(value.getUnits())
    );

    return Result.success(result);
  }


  private convertUnits(value: number): string {
    switch (value) {
      case 1:
        return "I";
      case 2:
        return "II";
      case 3:
        return "III";
      case 4:
        return "IV";
      case 5:
        return "V";
      case 6:
        return "VI";
      case 7:
        return "VII";
      case 8:
        return "VIII";
      case 9:
        return "IX";
      default:
        return "";
    }
  }
  private convertTens(value: number): string {
    switch (value) {
      case 10:
        return "X";
      case 20:
        return "XX";
      case 30:
        return "XXX";
      case 40:
        return "XL";
      case 50:
        return "L";
      case 60:
        return "LX";
      case 70:
        return "LXX";
      case 80:
        return "LXXX";
      case 90:
        return "XC";
      default:
        return "";
    }
  }
  private convertHundreds(value: number): string {
    switch (value) {
      case 100:
        return "C";
      case 200:
        return "CC";
      case 300:
        return "CCC";
      case 400:
        return "CD";
      case 500:
        return "D";
      case 600:
        return "DC";
      case 700:
        return "DCC";
      case 800:
        return "DCCC";
      case 900:
        return "CM";
      default:
        return "";
    }
  }

  private convertThousands(value: number): string {
    switch (value) {
      case 1000:
        return "M";
      case 2000:
        return "MM";
      case 3000:
        return "MMM";
      default:
        return "";
    }
  }
}

export class NumberRomanable {
  private value: number;

  private constructor(input: number) {
    this.value = input;
  }

  public static fromString(input: string): Result<NumberRomanable> {
    if (!Number.isInteger(Number(input))) {
      return Result.error(
        new ErrorOwn("Formato de número romano no válido - no es un número")
      );
    }
    const number = Number(input);

    if (number < 1 || number > 3999) {
      return Result.error(
        new ErrorOwn("Formato de número romano no válido - fuera de rango (1-3999)")
      );
    }

    return Result.success(new NumberRomanable(number));
  }

  public getUnits(): number {
    return this.value % 10;
  }

  public getTens(): number {
    return Math.floor((this.value % 100) / 10) * 10;
  }

  public getHundreds(): number {
    return Math.floor((this.value % 1000) / 100) * 100;
  }
  public getThousands(): number {
    return Math.floor(this.value / 1000) * 1000;
  }
}
