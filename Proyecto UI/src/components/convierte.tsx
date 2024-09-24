import React, { useState, useEffect } from "react";
import { ConverterManager } from "../Converters/converterManager";
import { DecimalToHexadecimalConverter } from "../Converters/decimalToHexConverter";
import { HexadecimalToDecimalConverter } from "../Converters/hexToDecimalConverter";
import { DecimalToRomanConverter } from "../Converters/decimalToRomanConverter";
import { RomanToDecimalConverter } from "../Converters/romanToDecimalConverter";

const ConverterComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [fromType, setFromType] = useState("decimal");
  const [toType, setToType] = useState("roman");

  const manager = new ConverterManager();

  useEffect(() => {
    manager.registerConverter("decimal", "hexadecimal", new DecimalToHexadecimalConverter());
    manager.registerConverter("hexadecimal", "decimal", new HexadecimalToDecimalConverter());
    manager.registerConverter("decimal", "roman", new DecimalToRomanConverter());
    manager.registerConverter("roman", "decimal", new RomanToDecimalConverter());
  }, [manager]);

  const handleConvert = () => {
    const conversionResult = manager.convert(fromType, toType, inputValue);

    if (conversionResult.isSuccess()) {
      setResult(conversionResult.getValue());
      setError("");
    } else {
      setError(conversionResult.getError().toString());
      setResult("");
    }
  };

  return (
    <div className="w-auto mx-auto bg-cyan-700 p-10 rounded-2xl border-white border-[3px]">
      <h1 className="text-2xl font-bold mb-4">Conversor Numérico</h1>

      <div className="flex space-x-4">
        <select
          value={fromType}
          onChange={(e) => setFromType(e.target.value)}
          className="w-1/2 p-2 mb-4 border border-gray-300 rounded"
        >
          <option value="decimal">Decimal</option>
          <option value="roman">Romano</option>
          <option value="hexadecimal">Hexadecimal</option>
        </select>

        <select
          value={toType}
          onChange={(e) => setToType(e.target.value)}
          className="w-1/2 p-2 mb-4 border border-gray-300 rounded"
        >
          <option value="decimal">Decimal</option>
          <option value="roman">Romano</option>
          <option value="hexadecimal">Hexadecimal</option>
        </select>
      </div>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Introduce un valor."
      />

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
