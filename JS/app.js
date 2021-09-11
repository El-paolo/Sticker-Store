const session = [false];

//const stockSetted = localStorage.getItem(alreadySetted) ?? false ;

let intact;

let alreadySetted;
let stringStock;
const stockIntact = localStorage.getItem('intact') ?? false; //me dice si ya se compró algún producto
let stockSetted = localStorage.getItem('alreadySetted') ?? false; // me dice si ya se seteó el arreglo con el stock
let stockProducts = localStorage.getItem('stringStock') ?? false; //revisa si ya se seteo el stock y trae el arreglo con los productos,este es para actualizar
let stringCart = localStorage.getItem('stringCart') ?? false;
//falta crear funcion que coloque los elementos del carro
class Product {
  constructor(id, name, price, btn, quantity){
    this.id = id;
    this.name = name;
    this.price = price;
    this.btn = btn;
    this.quantity = 1;

    function productData(){
      console.log(id, name, price, btn, quantity);
      
    }
  }
    
}

class StockProduct{
  constructor(id, stock){
    this.id = id;
    this.stock= stock;
  }
}



function countProducts(){
  const getProducts = document.getElementsByClassName('sticker-container'); //funciona
  //console.trace(getProducts.length);
  const products = [];
  for(let i = 1; i <=getProducts.length; i++  ){
    products.push(i);
  }
  //console.log(products);
  //console.trace(products.length);
  return  products; 
}
countProducts(); //cuenta los productos

async function showStock(){
    
  try{let stock = await JSON.parse(localStorage.getItem('stringStock'));  
    stock.forEach((value, i)=>{
    console.log(i+1, value.id);
    let stockTag = document.getElementById(`stock-product${i+1}`);
    stockTag.innerHTML =`${value.stock}`; 
  });
    }catch(error){

    }finally{
        
    }
  
    }

//hace carro de la misma manera
async function setDefaultStock(isThereStock, stockToSet){
  if(!isThereStock){
    let stockProducts= [];
    for(let i = 1; i <=countProducts().length; i++){
      const product = new StockProduct(i, stockToSet);
      stockProducts.push(product);


    }
    localStorage.setItem('stringStock', JSON.stringify(stockProducts));
    await showStock();
    //console.log(2);
    
    
  }else{
    
    await showStock();
    //console.log(1);
  
    }
    
  
}
// function createCart(){
//   let stringCart = localStorage.getItem('stringCart') ?? false;
  
//   if(stringCart == false){
//     let stringCart = [];
//     localStorage.setItem('stringCart', JSON.stringify(stringCart));
//     console.log(1);
//   }else{
//     console.log(2);

//funciona perfecto
function createCart(isThereACart){
  if(!isThereACart){
    let initCart= [];
    localStorage.setItem('stringCart', JSON.stringify(initCart));
    //await shoCart(cart);
    //console.log(23);
    }
  }



setDefaultStock(stockProducts, 5); //aquí se setea el stock por default de manera manual o se muestra el stock ya disponible
createCart(stringCart);



async function addToCart(session, save){
    if(session){
      try{
        
        let cart = await JSON.parse(localStorage.getItem('stringCart'));
        
        let product = products.filter(products => products.id == save[0] ); //buscamos en products el producto seleccionado por id
        product[0].quantity = save[1]; //agregamos el valor de la cantidad al producto
        cart.push(product[0]); //lo metemos al carro
        console.log(cart);
        
        let totalProducts = cart.filter(products=> products.id == save[0] ); // me devuelve los productos en el carro del id ==save[0]
        let totalQuantity =  totalProducts.reduce( (total, product) => total + product.quantity, 0 ); //cuanto es el total de la suma de las cantidades que hay en el carro
        let stockProducts =  JSON.parse(localStorage.getItem('stringStock'));
        
        localStorage.setItem('stringCart', JSON.stringify(cart));
        console.trace(JSON.parse(localStorage.getItem('stringCart')));
        console.log('added');
        
        
        if(totalQuantity > stockProducts[save[0] - 1].stock  ){
        //scar el objeto del arreglo de string cart, está en el local storage
        console.log(cart);
        
        console.log('too much');
        
      }}catch(err){

      }
    }

}


 

















// function initStock(setted = false, stock){
//   console.log(setted)
//   if(!setted){
//     const {products} = countProducts();
//     products.forEach((value, i) =>{
//       setStock(stock, i+1)
      
//     });
    
//     stockSetted.push(true);
//     const stockset = localStorage.setItem(stockSetted[0]);
    
//   }

//   return stockSetted[0];
  
// }






// const name = document.getElementById(`product${i}`);
//     const price = document.getElementById(`product-price${i}`);
//     const stock = document.getElementById(`stock-product${i}`);
//     const quantity = document.getElementById(`add-n-products${i}`);
//     console.log(name.value, quantity.value, price.value);
    
//     const product = new Product(i, name.value, price.value, stock.value, `btn${i}`, quantity.value ?? 1);
//     console.log(e, product)



//Creamos la funcion de seleccionar el btn para agregar al carro 
// for(let i = 1; i <= countProducts().length; i++){
//   //let price = document.getElementById(`product-price${i}`);
//   //let stock = 
//   //= new Product(i, `product${i}`, price.value,   ){
//   let btn = document.getElementById(`btnproduct${i}`);
//   btn.addEventListener('click', e =>{
//     e.preventDefault();
//     console.log(e);
    
    
//   } )
//   btns.push(btn);
// }

let btns = [];
let products = [];

// function addToCart(initiated, save, cart){ //aqui va sesssion[0]
  
//   if(initiated){
    
     
//     console.log(session);
//     let product = products.filter(products => products.id == save[0] );
//     product.quantity = save[1];
//     let addTocart =  cart.push(product);
//     let totalProducts =  cart.filter(products=> products.id == save[0] ); // me devuelve los productos en el carro del id ==save[0]
//     let totalQuantity = totalProducts.reduce( (total, product) => total + product.quantity, 0 ); 
//     let stockProducts =  JSON.parse(localStorage.getItem('stringStock'));
//     localStorage.setItem('stringCart', cart);
//     console.log(cart);
    
//     if(totalQuantity > stockProducts[save[0] - 1].stock  ){
//       console.log('to much');
//     }
    
// }
// }









/////////creamos lo botones y su funcion que devuelve la cantidad y 
for(let i = 1; i<= countProducts().length; i++){
  let btn = document.getElementById(`btnproduct${i}`);
  btns.push(btn);
  btn.addEventListener('click',async e =>{
    e.preventDefault();
    let {save} =returnBtn(i);
    reviewSession(save[0]);
    addToCart(session[0], save);
    //addToCart(session[0], save, cart);
      
    //let {stockProducts} = show(initiated, productsStock, 5 ); //aquí se determina el stock por defecto de manera manual en el tercer parámetro
  });

}



//funcion que revisa si se inició sesion

function reviewSession(product){
  if(!session[0]){
    const errors = document.querySelectorAll('.error-init-stock');
    const pTag = errors[product-1];
    pTag.innerHTML = 'Debes Iniciar Sesion';
    pTag.removeAttribute('hidden');
    setTimeout(() => {
      pTag.innerHTML='';
      pTag.setAttribute('hidden', true);

    }, 2000);
  }

  
}

///////////////////////////////////////////


function returnBtn(i){
  let save = [];
  const numBtn = i;
  save.push(numBtn); //save[0] = numBtn, save[1]= quantity
  
  if(document.getElementById(`add-n-products${i}`).value == ''){
    save.push(1);
  }else{
    save.push(parseInt(document.getElementById(`add-n-products${i}`).value));
  }
  return {save};
}
/////////////////////////////////////////////////////
window.addEventListener('DOMContentLoaded', e =>{
  for(let i = 1; i <= countProducts().length; i++){
  
    let name = document.getElementById(`product${i}`).innerHTML;
    let price = parseInt(document.getElementById(`product-price${i}`).innerHTML);
    let stock = parseInt(document.getElementById(`stock-product${i}`).innerHTML);
    //let quantity = document.getElementById(`add-n-products${i}`).innerHTML;
    let btn = document.getElementById(`btnproduct${i}`);
    
    const product = new Product(i, name, price, stock, btn);
    //console.log(product);
    
    
    products.push(product);
  }
});
//console.log(products);


const initSession = document.getElementById('init-show');
initSession.addEventListener('click', function(){
    const form = document.getElementById('session');
    form.innerHTML= `<label >Nombre de Usuario</label>
                    
    <span id='error-user' ><p class=error-text ></p></span>
        <input id='user-name'  type="text">
        <label >Contraseña</label>
        <span id='error-password'></span>
        <input type="password" id='password'>

    <div class='btn-user'>
        <button id='session-button' class='special-btn'>Enviar</button>
    </div>`;
    function callBtn(){
        const sessionBtn = document.getElementById('session-button');
        
        console.log(sessionBtn);
        sessionBtn.addEventListener('click', onSubmit);
    }
    callBtn();

});



function inputValueValidation(input, validations = []) { //cada cosa que se queira validar cae en un case dependiendo de cual sea
    const { value } = input;
    let isValid = true;
    let showError = document.getElementById('error-user');
    validations.forEach(validation => {
      switch (validation) {
        case 'required':
          if (!value){
            isValid = false;
            error = 'Todos los campos requeridos';
            console.log(input);
            let showError = document.getElementById('error-user');
            showError.innerHTML =  `<p class='error-text' >${error}</p>`;
            setTimeout(() => {
              removeElementsByClass('error-text');
            }, 5000);
          }
          break;
        
        case 'user':
          if( value !== 'Escalab'){
              isValid = false;
              console.log(input);
              let showError = document.getElementById('error-user');
              error = `El Usuario no existe`;
              showError.innerHTML =  `<p class='error-text' >${error}</p>`;
              setTimeout(() => {
                removeElementsByClass('error-text');
              }, 5000);
            }

          break;
        
        case 'password':
        if ( value!='' && value !== 'Escalab123') {
            isValid = false;
            error = `Contraseña incorrecta`;
            console.log(input);
            let showError = document.getElementById('error-password');
            showError.innerHTML = `<p class='error-text' >${error}</p>`;
            setTimeout(() => {
              removeElementsByClass('error-text');
            }, 5000);
        }
        break;
      }
    });
    
    return { isValid, showError};
  }


     function onSubmit(e) { 
        e.preventDefault();
        const user = document.getElementById('user-name');
        const password = document.getElementById('password');
        const formData =  [
        [user, ['required', 'user']],
        [password, ['required', 'password']]
        ];
        
      console.log(!session[0]);  
      if(!session[0]){
        const areValids =[];
        formData.forEach(el => {
            
          const {isValid} = inputValueValidation(el[0], el[1]);
          areValids.push(isValid);

        });
        
        console.log(areValids[0], areValids[1]);
        if(areValids[1] && areValids[0]){
            const welcome = document.getElementById('welcome');
            const form = document.getElementById('session');
            welcome.innerHTML = `Bienvenido ${user.value}`;
            session.shift();
            session.push(true);
            console.trace(session);
            removeElementsByClass('btn-user');
            form.innerHTML =` <div class='btn-user'> <button id='close-session' class='btn'>Cerrar Sesión</button> </div>`;
            const btn = document.getElementById('close-session');
            btn.addEventListener('click',function(e){location.reload(e);});

            
            
     }
     }else if(session[0]){
      const initiated = document.getElementById('initiated');
      const form = document.getElementById('session');
      initiated.innerHTML = `<h2  class='slogan welcome red'>La sesión ya esta iniciada</h2>`;
      removeElementsByClass('btn-user');
      form.innerHTML =` <div class='btn-user'> <button id='close-session' class='btn'>Cerrar Sesión</button> </div>`;
      const btn = document.getElementById('close-session');
      btn.addEventListener('click',e => location.reload(e));



      setTimeout(() => {
        removeElementsByClass('red');},5000);
      

    }
     }

function removeElementsByClass(className){
  const elements = document.getElementsByClassName(className);
  while(elements.length > 0){
    elements[0].parentNode.removeChild(elements[0]);
}}



//funcion que consulta el stock si se inició sesión




