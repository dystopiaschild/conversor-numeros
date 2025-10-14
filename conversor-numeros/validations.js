//@ts-nocheck
class ValidateInput{
    static validate_Number(input){
        if(input==='' || isNaN(Number(input))) throw new Error('Por favor ingresa un numero valido.');

        if (input.includes('e') || input.includes('E')) throw new Error('Notacion cientifica no permitida. Ingresa un numero decimal.');

        const number=Number(input);

        if(!Number.isInteger(number)) throw new Error('Por favor ingresa un numero entero.');

        if(number<0) throw new Error('Por favor ingresa un numero positivo.');

        if(number<Number.MIN_SAFE_INTEGER) throw new Error('Numero demasiado pequeño. El minimo es '+Number.MIN_SAFE_INTEGER);

        if(number>Number.MAX_SAFE_INTEGER) throw new Error('Numero demasiado grande. El maximo es '+Number.MAX_SAFE_INTEGER);

        return number;
    }

    static validate_MenuChoice(choice){
        const valid_choices=['1', '2', '3', '4', '5'];
        if(!valid_choices.includes(choice)) throw new Error('Por favor elige una opcion valida.');
        return choice;
    }

    static validate_BaseInput(baseInput){
        const valid_bases=['binary','bin','b','hexadecimal','hex','octal','oct','all'];
        if(!valid_bases.includes(baseInput.toLowerCase())) throw new Error('Base no reconocida: '+baseInput+'. Usa: binary, bin, b, hexadecimal, hex, octal, oct');
        return baseInput.toLowerCase();
    }
}

module.exports={ ValidateInput }; //la advertencia chequea para typescript, funciona perfecto con node.js