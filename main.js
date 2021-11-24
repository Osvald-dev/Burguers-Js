let totalPedido = 0;
let carrito = [];
let productos=[];



class Hamburguesa 
{
    constructor (nombre, precio, img, id)
    {
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.id = id;
    }
}

productos.push(new Hamburguesa("LadyBurger", 300, "./img/hamb-card-1.webp", 1));
productos.push(new Hamburguesa("GreenBurger", 350, "./img/hamb-card-2.webp", 2));
productos.push(new Hamburguesa("VeggyVeg", 360, "./img/hamb-card-3.webp", 3));
productos.push(new Hamburguesa("BlackPan", 380, "./img/hamb-card-4.webp", 4));


$(() => 
{
    console.log('El DOM esta listo');
});


mostrarProductos();
$("#botonComprar").click(()=>{verCarrito()});
$("#botonBorrar").click(()=>{borrarCarrito()});
formularioCliente();

function mostrarProductos()
{
    for (const item of productos)
        {
            $(".div-cards").append(`
                <div class="card-productos"> 
                    <h3 class="card-nombre" > ${item.nombre}</h3>
                    <p class="card-precio"> $ ${item.precio}</p>
                    <img class="img-burger" src="${item.img}">
                    <input type="number" class="card-cantidad" id="producto${item.id}" value="1"  min="1"  max="100" required>
                    <label id="font-cantidad"> Cantidad </label>
                    <input type="button" class="btn-agregar" id="btn${item.id}" value="Agregar al pedido">
                    <h5 id="aviso${item.id}" class="aviso"></h5> 
                </div>`);
                
            $(`#btn${item.id}`).click(()=>
            {
                if(carrito.some(hamburguesa => hamburguesa.id == item.id))
                {
                    if(window.confirm("Ya habías agregado esta hamburguesa. ¿Queres volver a agregarla?"))
                    {
                        for(const burger of carrito)
                        {
                            if(burger.id == item.id)
                            {
                                burger.cantidad = burger.cantidad + parseInt($(`#producto${item.id}`).val());
                            }
                        }
                    }
                } 
                else{
                    carrito.push({nombre: item.nombre, precio: item.precio, id: item.id, cantidad:parseInt($(`#producto${item.id}`).val())});
                    $(`#aviso${item.id}`).html("Producto Agregado");
                    }
            }) 
        }
        
}

function cargandoCompra(){
    totalPedido = 0;
    $("#resultado").empty();
    for(const burger of carrito)
    {
        totalPedido = totalPedido + burger.precio * burger.cantidad;
        $("#resultado").append (`
            <div class="verCarro">    
                <div class="seleccionUsuario"> 
                    <h2 id="lista-seleccion">Seleccionaste: <br> ${burger.nombre}</h2>
                </div>
                <div class="cantidadSeleccionada">
                    <h3 id ="cantidad-seleccion"> Cantidad pedida: <br> ${burger.cantidad}</h3>
                </div>
            </div>
                            `);
    }
    
    $("#total").html(`<div class="total">
                            <h4 id="total-seleccion">Total del pedido $ ${totalPedido}</h3>
                    </div>`);
                    
                    
}

//Mostrar carrito solo si hay productos dentro.
function verCarrito()
{
    if(carrito.length <= 0)
    {
        alert("Debes elegir algúna de nuestras hamburguesas para ver el carrito")
    }
    else
    {
        cargandoCompra();
        
    }
}

function borrarCarrito(){
        carrito=[];
        borrarSeleccionDom();
}

//Borra del DOM la información del contenido del Carrito
function borrarSeleccionDom(){
    $("#resultado").empty();
    totalPedido=0;
    $("#total").empty();
}

// Se ejecuta siempre si hay productos dentro del carrito


function formularioCliente(){
    
    $('#btnEnviar').click((e) =>{
        e.preventDefault();
            let nombreIngresado = document.getElementById('nombre').value;
            let direccionIngresado = document.getElementById('direccion').value;
            let telefonoIngresado = document.getElementById('telefono').value;
            let contacto = {nombre: nombreIngresado, direccion: direccionIngresado, telefono: telefonoIngresado}
            localStorage.setItem(1,JSON.stringify(contacto));
            localStorage.setItem(2,JSON.stringify(carrito));
            localStorage.setItem(3,JSON.stringify(totalPedido));
            window.location.href="ticket.html";
});
}

