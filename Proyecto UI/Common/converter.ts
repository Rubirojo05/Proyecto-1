import { Result } from "../BuildingBlocks/result";
import type { ConverterType } from "./converterType";

export class Converter {
    convert(value: string, converterType: ConverterType ): Result<string> {
        return converterType.convert(value);
    }
}