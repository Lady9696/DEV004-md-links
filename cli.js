#!/usr/bin/env node

const { mdLinks } = require("./index.js");
const { argv } = require('node:process');

//const mdLinks = require("./test/README.md");
//const mdLinks = require("./prueba");
//import { argv } from 'node:process';

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
       console.log('Los resultados son:', result, '******************************');
        // Llama a otra función y pasa el resultado como argumento
        
      })
      .catch((error) => {
        // Maneja los errores
        console.error('Ocurrió un error:', error, '++++++++++++++++');
      });
    

    }else if( isValidate.includes('--stats') || argv.includes('-s')){
      mdLinks(pathInput)
      .then((result) => {
        // Realiza acciones con el resultado
       console.log('Total links:', result.length,);
        // Llama a otra función y pasa el resultado como argumento
        
      })
      .catch((error) => {
        // Maneja los errores
        console.error('Ocurrió un error:', error.length, '++++++++++++++++');
      });

    }else if( isValidate.includes('--stats--validate') || argv.includes('-s-v')) {
      mdLinks(pathInput)
      .then((result) => {
        // Realiza acciones con el resultado
       const totalLinks = result.length;
      //console.log(totalLinks)

       const uniqueLinks = new Set(result.map(link => link.href)).size;// midiendo el tamaño de cuantos links unicos hay 
       console.log(`Total: ${totalLinks}`);
       console.log(`Unique: ${uniqueLinks}`);
       //aqui puedo filtrar los links que tengan status fail
       // 
       const brokenLinks = (result.filter(link => link.ok==='fail').length);
       console.log(`Broken: ${brokenLinks}`)
       //brokenlinks = uniqueLinks.filter( => miembro.posicion !== "developer")
      }) 
      .catch((error) => {
        console.error('Error:', error);
      });


      
    }
    else {
      console.log('comando ivalido');
    }
   
  
  
  
  
 
/*
    mdLinks('./prueba')
    .then((result) => {
      // Maneja los resultados
      console.log (result)
    })
    .catch((error) => {
      // Maneja los errores
      console.error(error);
    });
   
 */
 
  
 
  
  