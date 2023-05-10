const { mdLinks } = require ('./index.js');
//const { mdLinks } = require ('./prueba/pruebacarpeta/prueba1.md');

mdLinks('./prueba/pruebacarpeta/')
.then((resultado)=>{
    console.log(resultado);
})
.catch((error) => {
    console.log(error)

});
