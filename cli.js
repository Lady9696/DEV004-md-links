const { mdLinks } = require ('./index.js');
mdLinks('./prueba')
.then((resultado)=>{
    console.log(resultado);
})

.catch((error) => {
    console.log(error)

});
