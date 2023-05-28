#!/usr/bin/env node
//<script src="https://gist.github.com/MiguelFOlivar/b300fcf8546745bcd49429aa1c47cad4.js"></script>


const { clear } = require("node:console");
const { mdLinks } = require("./index.js");
const { argv } = require('node:process');

//const mdLinks = require("./test/README.md");
//const mdLinks = require("./prueba");
//import { argv } from 'node:process';
//md-links ./prueba -v

// Aquì capturo la ruta del usuario
pathInput = process.argv[2];


//const arguments = process.argv;
//console.log( arguments );
//ShowObject = {
  //const pathInput = process.argv[2];

  // Verifica si se proporcionó la opción de validación (--validate o -v)
  const isValidate = argv[2];
  //const isValidate = argv.includes('--validate') || argv.includes('-v');
   
  // Llama a la función mdLinks y maneja los resultados y errores
  if(isValidate.includes('--validate') || argv.includes('-v')){
   
    mdLinks(pathInput)
      .then((result) => {
        
        // Realiza acciones con el resultado
       console.log("\x1b[35m"+'Los resultados son:', result, 'si!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        // Llama a otra función y pasa el resultado como argumento
        
      })
      .catch((error) => {
        // Maneja los errores
        console.error("\x1B[41m"+'Ocurrió un error:', error);
      });
    

    }else if( isValidate.includes('--stats') || argv.includes('-s')){
      mdLinks(pathInput)
      .then((result) => {
        // Realiza acciones con el resultado
       console.log("\x1b[35m"+'Total links:',"\x1B[38;2;255;151;203m"+ result.length,);
        // Llama a otra función y pasa el resultado como argumento
        
      })
      .catch((error) => {
        // Maneja los errores
        console.error("\x1B[41m"+'Ocurrió un error:', error.length);
      });

    }else if( isValidate.includes('--stats--validate') || argv.includes('-s-v')) {
      mdLinks(pathInput)
      .then((result) => {
        // Realiza acciones con el resultado
       const totalLinks = result.length;
      //console.log(totalLinks)

       const uniqueLinks = new Set(result.map(link => link.href)).size;// midiendo el tamaño de cuantos links unicos hay 
       console.log(`\x1b[35m Total: \x1B[38;2;255;151;203m${totalLinks}`);
       console.log(`\x1b[35m Unique: \x1B[38;2;255;151;203m${uniqueLinks}`);
       //aqui puedo filtrar los links que tengan status fail
       // 
       const brokenLinks = (result.filter(link => link.ok==='fail').length);
       console.log(`\x1b[35m Broken: \x1B[38;2;255;151;203m${brokenLinks}`)
       //brokenlinks = uniqueLinks.filter( => miembro.posicion !== "developer")
      }) 
      .catch((error) => {
        console.error("\x1B[41m"+'Error:', error);
      });


      
    }
    else {
      console.log('comando ivalido');
    }
   
  
  
  
  
 /*

    mdLinks("./test/README.md")
    .then((result) => {
      // Maneja los resultados
      checkLink(result, result.href, result.text, result.file);
    })
    .catch((error) => {
      // Maneja los errores
      console.error(error);
    });
   
 */
 
  
 
  
  