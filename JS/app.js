//sesion almacena el valor true o false dependiendo si ya s inció sesión
const session = [false];
let alreadySetted;
let stringStock;
let stockSetted = localStorage.getItem('alreadySetted') ?? false; // me dice si ya se seteó el arreglo con el stock
let stockProducts = localStorage.getItem('stringStock') ?? false; //revisa si ya se seteo el stock y trae el arreglo con los productos,este es para actualizar
let stringCart = localStorage.getItem('stringCart') ?? false; // revisamos si existe un carrito ya que este se guarda  




//creamos la clase de productos la cual contendrá la info de estos con tal de mostrarla en el carro 
class Product {
  constructor(id, name, price, btn, quantity){
    this.id = id;
    this.name = name;
    this.price = price;
    this.btn = btn;
    this.quantity = 1;

    // function productData(){
    //   console.log(id, name, price, btn, quantity);
      
    // }
  }
    
}
 
//la clase de stockProduct nos sirve para definir el stock de los productos dependiendo solo de su id
class StockProduct{
  constructor(id, stock){
    this.id = id;
    this.stock= stock;
  }
}

// en products 


let products = [];

//la funcion count products cuenta los productos que existen en el html, los productos nuevos se deben añadir en el html usando la plantilla detallada
//nota: pensé en hacerlo en vez de usar un ciclo for y usar id's, en usar una sola clase para todos y hacer un for each y dependiendo del indice proceder desde ahí, pero 
//ya no alcanzaba a implementarlo, de todas maneras en una de las funcionalidades hice algo así.
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

//muestra el stock disponible desde el arreglo en el local storage, esta funcion se ejecuta de inmediato dentro de setdefault stock en caso de que ya exista un stock definido
async function showStock(){
    
  try{let stock = await JSON.parse(localStorage.getItem('stringStock'));  
    stock.forEach((value, i)=>{
    console.log(i+1, value.id);
    let stockTag = document.getElementById(`stock-product${i+1}`);
    stockTag.innerHTML =`${value.stock}`; 
  });
    }catch(error){}
  
}

//revisa si ya existe un stock, si ya existe lo muestra con showStock y si no existe lo crea y lo muestra con showStock
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

//funciona perfecto
//le ingresamos stringCart definido al proncipio si nos da false crea el carro y si ya existe no hace nada
function createCart(isThereACart){
  if(!isThereACart){
    let initCart= [];
    localStorage.setItem('stringCart', JSON.stringify(initCart));
    //await shoCart(cart);
    //console.log(23);

    }
  
  }


setDefaultStock(stockProducts, 5); //aquí se setea el stock por default de manera manual o se muestra el stock ya disponible
createCart(stringCart); //se revisa si existe un carro y si no es así se crea uno


//shoQuantity busca las etiquetas en donde colocaremos la cantidad en el carro de cada producto y coloca desde products las catidades correspondientes en cada etiqueta
async function showQuantity(cart){
    
  try{

    let pTags = document.querySelectorAll('.in-cart');
    products.forEach((value, i) =>{
      let totalProducts = cart.filter(products=> products.id == i+1 ); // me devuelve los productos en el carro del id ==save[0]
      let totalQuantity =  totalProducts.reduce( (total, product) => total + product.quantity, 0 ); //cuanto es el total de la suma de las cantidades que hay en el carro
      let pTag = pTags[i];
      pTag.innerHTML=`${totalQuantity}`;
    });
  }catch(error){
}
}
//addToCart recibe session y save, session es un arreglo cuyo unico valor será true o false dependiendo de si se inicio sesión, save es un arreglo entrega
//[id del producto del bton que se seleccionó, cantidad de productos que se quieren añadir]
//
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
        console.log('added');
        
        
        if(totalQuantity > stockProducts[save[0] - 1].stock  ){ //si la suma de las cantidades es mayor al stock se elimina el producto de stringCart y muestra un error
       
        cart.pop();
        localStorage.setItem('stringCart', JSON.stringify(cart));
        
        const errors = document.querySelectorAll('.error-init-stock');
        const pTag = errors[save[0]-1];
        pTag.innerHTML = 'No Hay Suficiente Stock Disponible';
        pTag.removeAttribute('hidden');
        setTimeout(() => {
          pTag.innerHTML='';
          pTag.setAttribute('hidden', true);

        }, 2000);
        

        console.log('too much');
        
        
      }
      
    }catch(err){

      }finally{ //nos devuelve showcart array que es el arreglo que contiene a los elementos que se muestran en la lista 
          let newCart = await JSON.parse(localStorage.getItem('stringCart'));
          await showQuantity(newCart); //llamamos a showquantity para refrescar la cantidad en el carro 
          let showCartArray = await showCart();
          return showCartArray;
       }
    }

}



let results = [];


//esta funcion llama al string cart y crea el arreglo para visualizar el carro en la interfaz, es decir, crea stringShowCart
//nota: stringCart recibe todos los productos y stringShowCart recibe los productos y agrupa los del mismo tipo .
async function showCart(){
  try{
  let showCartArray = [];
  for(let i = 1; i <= countProducts().length; i++){
    let name = document.getElementById(`product${i}`).innerHTML;
    let price = parseInt(document.getElementById(`product-price${i}`).innerHTML);
    let stock = parseInt(document.getElementById(`stock-product${i}`).innerHTML);
    //let quantity = document.getElementById(`add-n-products${i}`).innerHTML;
    let btn = document.getElementById(`btnproduct${i}`);
    
    const product = new Product(i, name, price, stock, btn, 1);
    //console.log(product);
    products.push(product);
    
    let getCart = await JSON.parse(localStorage.getItem('stringCart')); 
    let productsInCart = getCart.filter( products => products.id == i); //bucamos en el cart cada uno de los productos 
  
    let productCount = products[i-1];
    let totalQuantity = productsInCart.reduce((total, product) => total+product.quantity, 0);
    console.log(productsInCart, totalQuantity, productCount);
    productCount.quantity = totalQuantity;
    if(productsInCart.length!= 0){
    showCartArray.push(productCount);
    }

    localStorage.setItem('stringShowCart', JSON.stringify(showCartArray));
    console.log(showCartArray);
  }
  return showCartArray;
}catch(err){console.log(err);}




}

//recibe showCartArray y lo procesa par mostrarlo dentro del html, el carro se muestra solo si se ha iniciado sesión, también calcula los costos y los muestra.
async function getShowCart(showCartArray){
  try{
  console.log(showCartArray);
  let shippingPerProduct = showCartArray.reduce( (total, quantity) => total + quantity.quantity , 0);
  let totalProducts =  showCartArray.reduce((total, product)=> total + product.price*product.quantity , 0); 

  let shippingCost = 1500;
  let totalPrice = shippingPerProduct*350 + totalProducts + shippingCost;
  console.log(totalProducts, shippingPerProduct, shippingCost);
  
  let ulProducts = document.getElementById('ul-cart');
  let ask = document.getElementsByTagName('li');
  if(ask != undefined ){
    removeElementsByClass('product-in-cart');
    
  showCartArray.forEach(value => {
    
    let showProduct = document.createElement('LI');
    showProduct.classList.add('product-in-cart');
    showProduct.innerHTML = `${value.name}<span class='product-checkout'> ${value.price} CLP + 350 CLP c/u  x ${value.quantity} = ${(value.price + 350)*value.quantity} </span>`;
    ulProducts.appendChild(showProduct);
    let shipping = document.getElementById('shipping');
    shipping.innerHTML = `Envío: ${shippingCost} CLP + 350 CLP por cada producto`;
    let getShowTotal = document.getElementById('total-value');
    getShowTotal.innerHTML = `${totalPrice} CLP `;
  
  });
  }
  }catch(err){console.log(err);}  
}


//isThereCart resvisa si se inició sesion obtiene los datos de los productos para mostrarlos en el carro aqúi y setea el StringShowCart después lo manda a getShowCart().
async function isthereCart(){
    try{
      let isthereCart = await JSON.parse(localStorage.getItem('stringCart'));
      if(session[0] && isthereCart.length != 0 ){
          let showCartArray = [];
    for(let i = 1; i <= countProducts().length; i++){
      let name = document.getElementById(`product${i}`).innerHTML;
      let price = parseInt(document.getElementById(`product-price${i}`).innerHTML);
      let stock = parseInt(document.getElementById(`stock-product${i}`).innerHTML);
      //let quantity = document.getElementById(`add-n-products${i}`).innerHTML;
      let btn = document.getElementById(`btnproduct${i}`);
      
      const product = new Product(i, name, price, stock, btn, 1);
      //console.log(product);
      products.push(product);
      
      let getCart = await JSON.parse(localStorage.getItem('stringCart')); //cambiar esto es el problema
      let productsInCart = getCart.filter( products => products.id == i); //bucamos en el cart cada uno de los productos 
    
      let productCount = products[i-1];
      let totalQuantity = productsInCart.reduce((total, product) => total+product.quantity, 0);
      console.log(productsInCart, totalQuantity, productCount);
      productCount.quantity = totalQuantity;
      if(productsInCart.length!= 0){
      showCartArray.push(productCount);
      }

      localStorage.setItem('stringShowCart', JSON.stringify(showCartArray));
      console.log(showCartArray);
  }
      
  getShowCart(showCartArray);


    }
  }catch(error){console.log(error);
  }
  }















  let btns = [];

/////////creamos lo botones de añadir al carro y su funcion que devuelve la cantidad y 
for(let i = 1; i<= countProducts().length; i++){
  let btn = document.getElementById(`btnproduct${i}`);
  btns.push(btn);
  btn.addEventListener('click',async e =>{
    e.preventDefault();
    let {save} = returnBtn(i);
    reviewSession(save[0]);
    let showCartArray = await addToCart(session[0], save);
    getShowCart(showCartArray);

      //let showCartArray = 
    //getShowCart(showCartArray);
    //addToCart(session[0], save, cart);
      
    //let {stockProducts} = show(initiated, productsStock, 5 ); //aquí se determina el stock por defecto de manera manual en el tercer parámetro
  });

}



//funcion que revisa si se inició sesion a la hora de añadir los productos al carro

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

//esta funcion me entrega el valor del id y de la cantidad que se está seleccionando con el boton de añadir al carro
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

//con esto desplegamos el inicio de sesión al clickear el texto de inicio de sesion //y sellama a callbtn que a su vez llama a onSubmit

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


//con esta funcion revisamos las validaciones que se reciben de in submit, aqquí se muestran los posibles errores a 
function inputValueValidation(input, validations = []) { //cada cosa que se queira validar cae en un case dependiendo de cual sea el caso
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


//aquí emitimos el mensaje o activamos distintas funciones dependiendo de que se nos entregó en input value Validation, es decir, si es que se inició sesión o no.
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

        if(session[0]){
          //inicializamos todas estas funciones
          let newCart = JSON.parse(localStorage.getItem('stringCart'));
          showQuantity(newCart); //el carro solo es visible si se inicia sesión          
          showCart();
          isthereCart();
          emptyBttn.addEventListener('click', emptyCart);
          paymentBttn.addEventListener('click',payment);
          
          
          
          
}}}else if(session[0]){
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

//funcion que nos ayuda a eliminar mensajes de error o de compra
function removeElementsByClass(className){
  const elements = document.getElementsByClassName(className);
  while(elements.length > 0){
    elements[0].parentNode.removeChild(elements[0]);
}}




//llamamos al boton de avaciar carro y al de comprar
const emptyBttn = document.getElementById('empty-cart');
const paymentBttn= document.getElementById('payment-btn');

//esta funcion se llama al iniciar sesion, y vacia el carro tanto del localstorage como de la parte visible
async function emptyCart(){
  try{
    let stringCart = await JSON.parse(localStorage.getItem('stringCart'));
    let newArray = [];
    localStorage.setItem('stringCart', JSON.stringify(newArray));
    let stringShowCart = await JSON.parse(localStorage.getItem('stringShowCart'));
    localStorage.setItem('stringShowCart', JSON.stringify([]));
    let pTags = document.querySelectorAll('.in-cart');
    for(let i = 0; i< countProducts().length; i++){
      
      let pTag = pTags[i];
      pTag.innerHTML='0';
    }

    if(session[0]){
      removeElementsByClass('product-in-cart');
    let shipping = document.getElementById('shipping');
    shipping.innerHTML = '';
    let getShowTotal = document.getElementById('total-value');
    getShowTotal.innerHTML = '';
     
    }
  
  }catch(err){console.log(err);

    
}}

//funcion que se encarga de mostrar un error
function errorInit(){
  if(!session[0]){
    const getDivError = document.getElementById('execute');
    getDivError.innerHTML = '<h2 class="message error-init-stock">Debes Iniciar Sesión Para Comprar o Vaciar el Carro </h2>';
    setTimeout(function(){
      removeElementsByClass('message');
    }, 3000);
  }
}

//le añadimos los mensajes de error al hacer click
emptyBttn.addEventListener('click', errorInit);
paymentBttn.addEventListener('click', errorInit);

//funcion que se encarga de ejecutar el pago
async function payment(){
  try{
    const getDivpayment = document.getElementById('execute'); 
    getDivpayment.innerHTML ='<h2 class="message">Ejecutando el Pago...</h2>';
  
  
  let stringShowCart = await JSON.parse(localStorage.getItem('stringShowCart'));
  let stringStock = await JSON.parse(localStorage.getItem('stringStock'));
  let newStringStock = [];
  let newCart = await JSON.parse(localStorage.getItem('stringCart'));
  
  stringStock.forEach((value, i) =>{

    let object = stringShowCart.filter( stockProduct => stockProduct.id === value.id );
    if(object.length === 0 ){
      newStringStock.push(value);
    }else{
      
      console.log(value.stock, object);
      
      value.stock = value.stock - object[0].quantity;
      newStringStock.push(value);
    }
    
  });
  localStorage.removeItem('stringStock');
  localStorage.removeItem('stringShowCart');

  console.log(newStringStock);
  localStorage.setItem('stringShowCart', JSON.stringify([]));
  localStorage.setItem('stringStock', JSON.stringify(newStringStock));
  showStock();
  
  
  

  
  }catch(err){

  }finally{
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.disabled = true);
    
    setTimeout(function(){
      removeElementsByClass('product-in-cart');
      removeElementsByClass('message');
      let shipping = document.getElementById('shipping');
      shipping.innerHTML = '';
      let getShowTotal = document.getElementById('total-value');
      getShowTotal.innerHTML = '';
      buttons.forEach(button => button.disabled = false);
      
      const getDivpayment = document.getElementById('execute'); 
      getDivpayment.innerHTML ='<h2 class="message">Compra Exitosa</h2>';

      
    emptyCart();
    let pTags = document.querySelectorAll('.in-cart');
    for(let i = 0; i< countProducts().length; i++){
      
      let pTag = pTags[i];
      pTag.innerHTML='0';
    }

    }, 3000);
  
    setTimeout(function(){
      removeElementsByClass('message');
    }, 5000);
  }

}

// funcion que se encarga de resetar a los valores por defecto
const reset = document.getElementById('reset');

reset.addEventListener('click', function(e){
  localStorage.removeItem('stringStock');
  localStorage.removeItem('stringShowCart');

  localStorage.setItem('stringShowCart', JSON.stringify([]));
  localStorage.setItem('stringStock', JSON.stringify([]));
  setDefaultStock(false, 5);
  location.reload(e);
});