const { mdLinks } = require ('./index.js');
//const { mdLinks } = require ('./test/README.md');
//aqui anido la promesa anterior
// false con archivos
mdLinks('./prueba')
.then(( arrObjFalse)=>{
    [{ href, text, file }]
    // 
    // 
    console.log('resultadoooooooooooooooooooooooooooooooooooooooooooooooooo',href);
})
.catch((error) => {
    console.log(error)

});

