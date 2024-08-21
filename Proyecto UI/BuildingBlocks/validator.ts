export class Validator {
    public static isNumeric(str: unknown): boolean {
      if (typeof str != "string") return false;
      return !Number.isNaN(str) && !isNaN(parseFloat(str));
    }
  }
  