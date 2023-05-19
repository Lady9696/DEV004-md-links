#!/usr/bin/env node
const mdLinks = require("./index.js");
//import { argv } from 'node:process';


// Aquì capturo la ruta del usuario
pathInput = process.argv[2];


//const arguments = process.argv;
//console.log( arguments );
const isValidate = process.argv;
/*if(isValidate.includes('--validate')||isValidate.includes('-v')){
  //console.log({isValidate});
  mdLinks(pathInput);
.then(( result ) => {
  [{ href, text, file }]

  console.log('resultadoooooooooooooooooooooooooooooooooooooooooooooooooo',href);
})
.catch((error) => {
   console.log(error)

 });
 
}
//console.log(process);

// llmar a mdLinks para que devuelva {´hrf, statu...}
//console.log(`hello world${args}`);

mdLinks('./test/README.md')
.then(( result )=>{
  [{ href, text, file }]

  console.log('resultadoooooooooooooooooooooooooooooooooooooooooooooooooo',href);
})
.catch((error) => {
   console.log(error)

 });
*/