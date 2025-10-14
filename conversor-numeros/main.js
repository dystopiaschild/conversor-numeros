#!/usr/bin/env node

//@ts-nocheck
const { ValidateInput }=require('./validations.js');
const { Stack }=require('./stack.js');
const { ConversionService }=require('./conversions.js');
const { UserInterface, userinput, readline }=require('./ui.js');

//MODO CON COMANDOS
function convert_BasedOnInput(number, validBase){
    const baseMap={
        'binary':2, 'bin':2, 'b':2,
        'hexadecimal':16, 'hex':16,
        'octal':8, 'oct':8,
        'all':'all'
    };
    const base=baseMap[validBase];
    if(base==='all'){
        const bin=ConversionService.to_Binary(number);
        const hex=ConversionService.to_Hex(number);
        const oct=ConversionService.to_Octal(number);
        return `Binario: ${bin} | Hexadecimal: ${hex} | Octal: ${oct}`;
    }
    switch(base){
        case 2:
            const bin=ConversionService.to_Binary(number);
            return `Binario: ${bin} | Digitos binarios: ${bin.length}`;
        case 8:
            const oct=ConversionService.to_Octal(number);
            return `Octal: ${oct}`;
        case 16:
            const hex=ConversionService.to_Hex(number);
            return `Hexadecimal: ${hex}`;
    }
}

function mode_CommandLine(args){
    const [numberInput, baseInput]=args;
    try {
        const number=ValidateInput.validate_Number(numberInput);
        const validBase=ValidateInput.validate_BaseInput(baseInput);
        const result=convert_BasedOnInput(number,validBase);
        console.log('Convertido! '+number+' -> '+result);
        process.exit(0); //exit con codigo de success
    } catch(error){
        console.log('Ups! '+error.message);
        process.exit(1); //exit con codigo de error
    }
}

//MODO CON MENU INTERACTIVO
async function convert_Binary(){
    const input=await UserInterface.get_UserInput();
    const number=ValidateInput.validate_Number(input);
    const result=ConversionService.to_Binary(number);
    const baseName=ConversionService.get_BaseName(2);
    console.log('El numero '+number+' en base '+baseName+' es: '+result);
    console.log('Digitos binarios: '+result.length);
}

async function convert_Octal(){
    const input=await UserInterface.get_UserInput();
    const number=ValidateInput.validate_Number(input);
    const result=ConversionService.to_Octal(number);
    const baseName=ConversionService.get_BaseName(8);
    console.log('El numero '+number+' en base '+baseName+' es: '+result);
}

async function convert_Hex(){
    const input=await UserInterface.get_UserInput();
    const number=ValidateInput.validate_Number(input);
    const result=ConversionService.to_Hex(number);
    const baseName=ConversionService.get_BaseName(16);
    console.log('El numero '+number+' en base '+baseName+' es: '+result);
}

async function mode_Interactive(){
    while(true){
        UserInterface.display_Menu();
        const choice=await UserInterface.get_MenuChoice();
        try {
            ValidateInput.validate_MenuChoice(choice);

            switch(choice){
                case '1':
                    await convert_Binary();
                    break;
                case '2':
                    await convert_Hex();
                    break;
                case '3':
                    await convert_Octal();
                    break;
                case '4':
                    UserInterface.ClearScreen();
                    break;
                case '5':
                    console.log('Adios!');
                    readline.close();
                    return;
            }
        } catch(error){
            console.log('Ups! '+error.message);
        }
    }
}

//SELECCION DE MODO
function StartProgram(){
    const args=process.argv.slice(2);

    //maneja el modo ayuda
    if(args.includes('--help') || args.includes('-h')){
        UserInterface.ShowHelp();
        process.exit(0); //exit con codigo de success!
    }

    //si tiene argumentos usa automaticamente modo con comandos
    if(args.length>=2){
        console.log();
        if(args.length>2){
            console.log('Advertencia: El uso es numconvert <numero> <base>. Argumentos adicionales seran ignorados');
            console.log('Si quieres conevertir a multiples bases, usa "numconvert <numero> all"');
        }
        console.log();
        mode_CommandLine(args);

    } else if(args.length===1){ //si tiene argumentos pero no suficientes
        console.log();
        console.log('Faltan argumentos! Uso: <numero> <base>');
        console.log('Usa "conversor --help" o "numconvert --help" para ver opciones');
        process.exit(1); //exit con codigo de error
        
    } else {
        //si no tiene argumentos entra solo al modo con menu interactivo
        console.log();
        mode_Interactive().catch(error => {
            console.error('Algo salio mal.',error);
            readline.close();
            process.exit(1); //exit con codigo de error
        });
    }
}

StartProgram();