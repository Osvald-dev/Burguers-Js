//Creo Variables con datos de LocalStorage para imprimir Ticket
let arrayCarrito= JSON.parse(localStorage[2]); 
let usuario = JSON.parse(localStorage.getItem(1));
let total = localStorage.getItem(3);

//recorro el array del carrito de compras e imprimo en DOM
for(const item of arrayCarrito){
    $("#lista-productos").append(`
        <li>${item.nombre}: $ ${item.precio} x (${item.cantidad}) </li>
    `)
}

//Nombre y direccion del Usuario en DOM
$("#destinatario").html(`
    <h2>Pedido realizado por ${usuario.nombre}</h2>
    <h3>Con direccion ${usuario.direccion}</h3>
`)


//total de la Compra y cotización a Dolar en Ticket
$("#total").html("$" + total);

let precioDolar = 0; //variable que almacena la cotización del dolar.
const URLGET = "https://www.dolarsi.com/api/api.php?type=valoresprincipales" //URL de la API que brinda el precio del dolar.
//Comienza la función que obtiene el precio del dólar de DolarSI.
$.get( URLGET, function( precio, estado ) {
    if (estado =="success") {//verifico si la respuesta fue exitosa.
        precioDolar = precio[0].casa.compra; //saco el precio de compra que es lo que necesito
        precioDolar = parseFloat(precioDolar.replace(',', '.'))
        let precioUsd = total / precioDolar;
        $("#totalDolar").html("USD" + precioUsd.toFixed(2));    }
});




