
 


//set stock

function setStock(stock){ 
    function countProducts(){
        const products = document.querySelectorAll('.product-name');
        const allProducts = products.length;
        console.log(allProducts);
        return products;
    }    
    countProducts().forEach((value, i)=>{ 
        console.log(`stock-product${i+1}`)
        const setStock = document.getElementById(`stock-product${i+1}`);
        setStock.innerHTML = stock;
    });
}

setStock(5); //aquí se define el stock por defecto en este caso 5


//revisar a la hora de introducir las verificiciones

const initSession = document.getElementById('init-show');
initSession.addEventListener('click',function(){
    const form = document.getElementById('session');
    form.innerHTML= `<label >Nombre de Usuario</label>
                    
    <span id='error-user' ><p class=error-text ></p></span>
        <input id='user-name'  type="text">
        <label >Contraseña</label>
        <span id='error-password'><p class='error-text' >constraseña incorrecta</p></span>
        <input type="password" id='password'>

    <div class='btn-user'>
        <button id='session-button' class='btn'>Enviar</button>
    </div>`
});


