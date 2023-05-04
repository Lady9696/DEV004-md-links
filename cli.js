const { mdLinks } = require ('./index.js');
//const { mdLinks } = require ('./index.js');

mdLinks('./prueba/prueba1.md')
.then((resultado)=>{
    console.log(resultado);
})

.catch((error) => {
    console.log(error)

});
