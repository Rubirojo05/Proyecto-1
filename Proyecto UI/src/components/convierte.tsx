import React, { useState } from "react";
import { Converter } from "../../Common/converter";
import { RomanToDecimalConverter } from "../Converters/romanToDecimalConverter";
import { DecimalToRomanConverter } from "../Converters/decimalToRomanConverter";
import { DecimalToHexadecimalConverter } from "../Converters/decimalToHexConverter"; // Importar el nuevo conversor
import { Validator } from "../../BuildingBlocks/validator";
import { HexadecimalToDecimalConverter } from "../Converters/hexToDecimalConverter";

const ConverterComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [conversionType, setConversionType] = useState("decimalToRoman"); // Agregar estado para el tipo de conversión

  const service = new Converter();

  const handleConvert = () => {
    let conversionResult;

    if (conversionType === "decimalToRoman") {
      conversionResult = Validator.isNumeric(inputValue)
        ? service.convert(inputValue, new DecimalToRomanConverter())
        : service.convert(inputValue, new RomanToDecimalConverter());
    } else if (conversionType === "decimalToHex") {
      conversionResult = Validator.isNumeric(inputValue)
        ? service.convert(inputValue, new DecimalToHexadecimalConverter())
        : service.convert(inputValue, new HexadecimalToDecimalConverter());
    }

    if (conversionResult && conversionResult.isSuccess()) {
      setResult(conversionResult.getValue());
      setError("");
    } else {
      setError(conversionResult?.getError().toString() || "Error en la conversión");
      setResult("");
    }
  };

  const getPlaceholder = () => {
    if (conversionType === "decimalToHex") {
      return "Introduce un número decimal o hexadecimal.";
    }
    return "Introduce un número decimal o romano.";
  };

  return (
    <div className="w-auto mx-auto bg-cyan-700 p-10 rounded-2xl border-white border-[3px]">
      <h1 className="text-2xl font-bold mb-4">Conversor Numérico</h1>


      <select
        value={conversionType}
        onChange={(e) => setConversionType(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      >
        <option value="decimalToRoman">Decimal a Romano</option>
        <option value="decimalToHex">Decimal a Hexadecimal</option>
      </select>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder={getPlaceholder()} />

      <button
        onClick={handleConvert}
        className="w-full bg-white text-cyan-700 text-xl py-2 rounded-lg border border-white hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-110"
      >
        Convertir
      </button>

      {result && (
        <div className="mt-4 p-3 bg-cyan-500 rounded-2xl border-white border-[3px] text-center">
          {`El resultado es: ${result}`}
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-400 rounded-2xl border-white border-[3px] text-center text-white">
          {`Error: ${error}`}
        </div>
      )}
    </div>
  );
};

export default ConverterComponent;
