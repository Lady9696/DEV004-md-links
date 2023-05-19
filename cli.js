#!/usr/bin/env node
const { mdLinks } = require("./index.js");
const { argv } = require('node:process');
//const mdLinks = require("./test/README.md");
//import { argv } from 'node:process';


// Aquì capturo la ruta del usuario
//pathInput = process.argv[2];


//const arguments = process.argv;
//console.log( arguments );
//ShowObject = {
  const pathInput = process.argv[2];

  // Verifica si se proporcionó la opción de validación (--validate o -v)
  const isValidate = argv.includes('--validate') || argv.includes('-v');
  
  // Llama a la función mdLinks y maneja los resultados y errores
  mdLinks()
    .then((result) => {
      // Maneja los resultados
      console.log(result);
    })
    .catch((error) => {
      // Maneja los errores
      console.error(error);
    });
  */
 /*
 const isValidate = argv[2];
 if(isValidate.includes('--validate') || argv.includes('-v')){
  
  mdLinks(pathInput, { validate: isValidate })
    .then((result) => {
      // Realiza acciones con el resultado
      console.log('Los resultados son:', result);
      // Llama a otra función y pasa el resultado como argumento
      
    })
    .catch((error) => {
      // Maneja los errores
      console.error('Ocurrió un error:', error);
    });
  } else {
    console.log('comando ivalido');
  }
  
  
  
  
  */
  
  