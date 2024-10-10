import { ErrorOwn } from "../../BuildingBlocks/errorOwn";
import { Result } from "../../BuildingBlocks/result";
import type { ConverterType } from "../../Common/converterType";

// Definir la interfaz de ConverterType para especificar los métodos esperados
export interface IConverter {
    convert(value: string): Result<string>;
}

export class ConverterManager {
    private converters: Map<string, IConverter>;

    constructor() {
        this.converters = new Map<string, IConverter>();
    }

    // Registro de un convertidor con una clave específica que combina los tipos de origen y destino
    public registerConverter(fromType: string, toType: string, converterInstance: IConverter): void {
        const key = this.getConversionKey(fromType, toType);
        this.converters.set(key, converterInstance);
    }

    // Convertir valor entre dos tipos
    public convert(fromType: string, toType: string, value: string): Result<string> {
        const key = this.getConversionKey(fromType, toType);
        const directConverter = this.converters.get(key);

        if (directConverter) {
            return directConverter.convert(value);
        }

        // Si no hay convertidor directo, intentamos una conversión intermedia a decimal y luego al tipo destino
        const toDecimalConverter = this.getConverter(fromType, "decimal");
        const fromDecimalConverter = this.getConverter("decimal", toType);

        if (toDecimalConverter && fromDecimalConverter) {
            const decimalResult = toDecimalConverter.convert(value);
            if (!decimalResult.isSuccess()) {
                return Result.error(new ErrorOwn("Formato de número no válido para la conversión a decimal."));
            }
            return fromDecimalConverter.convert(decimalResult.getValue());
        }

        return Result.error(new ErrorOwn(`Conversión de ${fromType} a ${toType} no soportada.`));
    }

    // Obtiene el convertidor de un tipo a otro si existe
    private getConverter(fromType: string, toType: string): IConverter | undefined {
        const key = this.getConversionKey(fromType, toType);
        return this.converters.get(key);
    }

    // Genera la clave de conversión basada en los tipos de origen y destino
    private getConversionKey(fromType: string, toType: string): string {
        return `${fromType.toLowerCase()}To${toType.toLowerCase()}`;
    }
}