import { ErrorOwn } from "../../BuildingBlocks/errorOwn";
import { Result } from "../../BuildingBlocks/result";

export class ConverterManager {
  private converters: Map<string, any>;

  constructor() {
    this.converters = new Map<string, any>();
  }

  registerConverter(fromType: string, toType: string, converterInstance: any): void {
    const key = this.getConversionKey(fromType, toType);
    this.converters.set(key, converterInstance);
  }

  convert(fromType: string, toType: string, value: string): Result<string> {
    const key = this.getConversionKey(fromType, toType);
    const directConverter = this.converters.get(key);

    if (directConverter) {
      return directConverter.convert(value);
    }

    const toDecimalConverter = this.converters.get(this.getConversionKey(fromType, "decimal"));
    const fromDecimalConverter = this.converters.get(this.getConversionKey("decimal", toType));

    if (toDecimalConverter && fromDecimalConverter) {
      const decimalResult = toDecimalConverter.convert(value);
      if (!decimalResult.isSuccess()) {
        return Result.error(new ErrorOwn("Se proporcionó un formato de número no válido."));
      }

      return fromDecimalConverter.convert(decimalResult.getValue());
    }

    return Result.error(new ErrorOwn("Conversión no soportada."));
  }

  private getConversionKey(fromType: string, toType: string): string {
    return `${fromType.toLowerCase()}To${toType.toLowerCase()}`;
  }
}
