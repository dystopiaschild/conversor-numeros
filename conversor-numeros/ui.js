//@ts-nocheck
const { ConversionService } = require('./conversions.js'); //la advertencia chequea para typescript, funciona perfecto con node.js

const readline=require('readline').createInterface({
    input:process.stdin,
    output:process.stdout
});

function userinput(prompt){
    return new Promise((resolve) => {
        readline.question(prompt, resolve);
    });
}

class UserInterface{
    
    static async get_UserInput(){
        while(true){
            try {
                const number=await userinput('Ingrese el numero que desea convertir ');
                return number; //validacion y conversion se manejan en el modulo main
            } catch(error){
                console.log('Algo salio mal. '+error.message);
            }
        }
    }
    
    static async get_MenuChoice(){
        const choice=await userinput('Seleccione una opcion (1-4): ');
        return choice;
    }

    static display_Menu(){ //uso de menu para modo interactivo
        console.log(`
            Bienvenido al conversor de numeros!
            
            Menu de Opciones:
            
            1. Convertir decimal a Binario
            2. Convertir decimal a Hexadecimal
            3. Convertir decimal a Octal
            4. Limpiar pantalla
            5. Salir`
        );
    }

    static ShowHelp(){ //uso de comandos con --help o -h para modo rapido
        console.log(`
            Coversor de numeros:
            
            Modo de Uso:
                conversor <numero> <base>
                numconvert <numero> <base>
            
            Bases disponibles:
                binary, bin, b      -Binario
                hexadecimal, hex    -Hexadecimal
                octal, oct          -Octal
                all                 -Muestra todas las bases
                
            Ejemplo:
                coversor 255 hex    ->FF
                conversor 42 binary ->101010
                numconvert 8 all    ->Muestra todas las conversiones
            
            Sin argumentos: Modo con menú interactivo.`
        );
    }

    static display_Result(ogNumber, base, result){
        const baseName=ConversionService.get_BaseName(base);
        console.log('El numero '+ogNumber+' en base '+baseName+' es '+result);
    }

    //usamos codigos de escape ANSI para limpiar la pantalla de la terminal porque funciona en varios os
    static ClearScreen(){
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('Conversor de numeros: Pantalla limpia!');
    }
}

module.exports={ UserInterface, userinput, readline }