#!/usr/bin/env node
const { mdLinks } = require("./index.js");
const { argv } = require('node:process');
//const mdLinks = require("./test/README.md");
//import { argv } from 'node:process';


// Aquì capturo la ruta del usuario
pathInput = process.argv[2];


//const arguments = process.argv;
//console.log( arguments );
//ShowObject = {
  

//}
const isValidate = argv.includes('--validate')||argv.includes('-v')
if (isValidate){
  //console.log('validate es true', isValidate);
  mdLinks(pathInput, { validate: true })
.then(( resultado ) => {
 
  console.log(resultado);
 

  
})
.catch((error) => {
   console.log(error)

 });
} else{
  console.log('Comando invàlido');
}

console.log({pathInput});

  