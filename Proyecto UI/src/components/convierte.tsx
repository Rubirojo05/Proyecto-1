import readline from "node:readline";
import { Converter } from "../../Common/converter";
import { RomanToDecimalConverter } from "../Roman/romanToDecimalConverter";
import { DecimalToRomanConverter } from "../Roman/decimalToRomanConverter";
import { Validator } from "../../BuildingBlocks/validator";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const greeting = "Introduce el numero romano para pasar a decimal:";

const service = new Converter();

rl.question(greeting + "  ", (input) => {
  const result = Validator.isNumeric(input)
    ? service.convert(input, new DecimalToRomanConverter())
    : service.convert(input, new RomanToDecimalConverter());

  if (result.isSuccess()) {
    console.log(`El resultado es: ${result.getValue()}`);
  } else {
    console.error(`Error: ${result.getError().toString()}`);
  }
  rl.close();
});
