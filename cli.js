const { mdLinks } = require ('./index.js');
//const { mdLinks } = require ('./test/README.md');
//aqui anido la promesa anterior
// false con archivos
mdLinks('./prueba')
.then(( arrObjFalse)=>{
  [{ href, text, file }]
//     // 
//     // 
  console.log('resultadoooooooooooooooooooooooooooooooooooooooooooooooooo',href);
})
.catch((error) => {
   console.log(error)

 });

//console.log(process.argv);
/*
if(process.argv.includes('-validate')|| process.argv.includes('-v')){
// llmar a mdLinks para que devuelva {´hrf, statu...}
console.log('Aqui validate true');
}


*/
