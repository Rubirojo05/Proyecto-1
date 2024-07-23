export const decimalToRoman = (num: number): string => {
    const romanNumeralMap: { [key: number]: string } = {
        1000: "M",
        900: "CM",
        500: "D",
        400: "CD",
        100: "C",
        90: "XC",
        50: "L",
        40: "XL",
        10: "X",
        9: "IX",
        5: "V",
        4: "IV",
        1: "I",
    };

    let result = "";
    for (let key of Object.keys(romanNumeralMap).reverse()) {
        const value = parseInt(key);
        while (num >= value) {
            result += romanNumeralMap[value];
            num -= value;
        }
    }
    return result;
};

export const romanToDecimal = (roman: string): number | string => {
    const romanNumeralMap: { [key: string]: number } = {
        "M": 1000,
        "CM": 900,
        "D": 500,
        "CD": 400,
        "C": 100,
        "XC": 90,
        "L": 50,
        "XL": 40,
        "X": 10,
        "IX": 9,
        "V": 5,
        "IV": 4,
        "I": 1,
    };
    let result = 0;
    for (let i = 0; i < roman.length; i++) {
        const current = romanNumeralMap[roman[i]];
        const next = romanNumeralMap[roman[i + 1]];

        if (current < next) {
            result += next - current;
            i++;
        } else {
            result += current;
        }
    }

    if (isNaN(result) || result === 0) {
        return "Por favor, introduce un número romano válido.";
    }

    return result;
}