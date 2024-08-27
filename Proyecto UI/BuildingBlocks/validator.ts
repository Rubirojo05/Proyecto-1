export class Validator {
  static isNumeric(input: string): boolean {
    return !isNaN(Number(input)) && Number.isInteger(Number(input));
  }

  static isRoman(input: string): boolean {
    const romanRegex = /^(?=[MDCLXVI])M*(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$/i;
    return romanRegex.test(input);
  }

  static isHex(input: string): boolean {
    const hexRegex = /^[0-9A-Fa-f]+$/;
    return hexRegex.test(input);
  }
}
