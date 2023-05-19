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
const isValidate = argv;
if (isValidate.includes('--validate')||isValidate.includes('-v')){
  console.log('validate es true', isValidate);
  mdLinks(pathInput)
.then(( resultado ) => {
 // console.log(Object.values(resultado));
 
 

  //console.log('resultadoooooooooooooooooooooooooooooooooooooooooooooooooo',result);
})
.catch((error) => {
   console.log(error)

 });
} else{
  console.log('Comando invàlido');
}

console.log({pathInput});

  //console.log({isValidate});
 
//console.log(process);

// llmar a mdLinks para que devuelva {´hrf, statu...}
//console.log(`hello world${args}`);
/*
mdLinks('./test/README.md')
.then(( result )=>{
  [{ href, text, file }]

  console.log('resultadoooooooooooooooooooooooooooooooooooooooooooooooooo',href);
})
.catch((error) => {
   console.log(error)

 });
*/