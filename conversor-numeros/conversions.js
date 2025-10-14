//@ts-nocheck
const { Stack }=require('./stack.js'); //la advertencia chequea para typescript, funciona perfecto con node.js

class ConversionService {

    static Convert(decimal, base){
        const conversionStack=new Stack();
        let aux=decimal;
        
        if(aux===0) conversionStack.push_Item(0);

        while(aux>0){
            let remainder=aux%base;
            conversionStack.push_Item(remainder);
            aux=Math.floor(aux/base);
        }

        let result='';
        while(!conversionStack.is_Empty()){
            const digit=conversionStack.pop_Item();
            result+=this.digitToChar(digit);
        }

        return result;
    }

    static to_Binary(decimal){
        return this.Convert(decimal, 2);
    }

    static to_Octal(decimal){
        return this.Convert(decimal, 8);
    }

    static to_Hex(decimal){
        return this.Convert(decimal, 16);
    }

    static get_BaseName(base){
        const baseNames={
            2: 'binaria',
            8: 'octal',
            16: 'hexadecimal'
        };
        return baseNames[base] || 'Base'+base;
    }

    static digitToChar(digit){
        return digit<10 ? digit.toString() : String.fromCharCode(55+digit);
    }
}

module.exports={ ConversionService }; //la advertencia chequea para typescript, funciona perfecto con node.js