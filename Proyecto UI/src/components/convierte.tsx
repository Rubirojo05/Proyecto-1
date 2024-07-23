import React, { useState } from "react";
import { decimalToRoman, romanToDecimal } from "../utils/conversion";

const Converter = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [result, setResult] = useState<string>("");
    const [conversionType, setConversionType] = useState<"decimalToRoman" | "romanToDecimal">("decimalToRoman");

    const handleConvert = () => {
        if (conversionType === "decimalToRoman") {
            const num = parseInt(inputValue);
            if (!isNaN(num) && num > 0) {
                setResult(decimalToRoman(num));
            } else {
                setResult("Por favor, introduce un número decimal entero positivo.");
            }
        } else {
            const roman = inputValue.toUpperCase();
            setResult(romanToDecimal(roman).toString());
        }
    };

    return (
        <div className="w-auto mx-auto bg-cyan-700 p-10 rounded-2xl border-white border-[3px]">
            <h1 className="text-2xl font-bold mb-4">Conversor Decimal a Romano</h1>
            <div className="flex items-center justify-center mb-4 space-x-4">
                <span className="text-white">Decimal a Romano</span>
                <div
                    className={`relative w-16 h-8 bg-white rounded-full cursor-pointer transition-all duration-300 ${conversionType === "romanToDecimal" ? 'bg-green-500' : 'bg-blue-500'}`}
                    onClick={() => setConversionType(conversionType === "decimalToRoman" ? "romanToDecimal" : "decimalToRoman")}
                >
                    <div
                        className={`absolute top-0 w-8 h-8 bg-cyan-700 rounded-full border-[3px] border-white shadow-md transform transition-transform duration-300 ${conversionType === "romanToDecimal" ? 'translate-x-full' : ''}`}
                    />
                </div>
                <span className="text-white">Romano a Decimal</span>
            </div>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder={conversionType === "decimalToRoman" ? "Introduce un número decimal entero positivo." : "Introduce un número romano."}
            />
            <button
                onClick={handleConvert}
                className="w-full bg-white text-cyan-700 text-xl py-2 rounded-lg border border-white hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-110"
            >
                Convertir
            </button>
            {result && (
                <div className="mt-4 p-3 bg-cyan-500 rounded-2xl border-white border-[3px] text-center">
                    {result}
                </div>
            )}
        </div>
    );
};

export default Converter;