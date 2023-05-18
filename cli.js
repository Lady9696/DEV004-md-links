
const { mdLinks } = require ('./index.js');
//const { mdLinks } = require ('./test/README.md');
//aqui anido la promesa anterior
// false con archivos
mdLinks('./test/README.md')
.then(( result )=>{
  [{ href, text, file }]
//     // 
//     // 
  console.log('resultadoooooooooooooooooooooooooooooooooooooooooooooooooo',href);
})
.catch((error) => {
   console.log(error)

 });

const [,, ... args] = process.argv
//console.log(process.argv, 'lalalalallllllllllllll');

//if(process.argv.includes('--validate')|| process.argv.includes('-v')){
// llmar a mdLinks para que devuelva {´hrf, statu...}
console.log(`hello world${args}`);




