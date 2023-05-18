
const mdLinks = require("./index.js");




const ensayo = process.argv[2]
console.log(ensayo);
//console.log(process.argv, 'lalalalallllllllllllll');

if(process.argv.includes('--validate')|| process.argv.includes('-v')){
  mdLinks(result)
 
}
// llmar a mdLinks para que devuelva {´hrf, statu...}
//console.log(`hello world${args}`);
/*mdLinks('./test/README.md')
.then(( result )=>{
  [{ href, text, file }]

  console.log('resultadoooooooooooooooooooooooooooooooooooooooooooooooooo',href);
})
.catch((error) => {
   console.log(error)

 });
*/