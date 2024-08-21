import { Result } from "../BuildingBlocks/result";

export interface ConverterType{
    convert(value: string): Result<string>;
}