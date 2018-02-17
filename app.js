var secuencia = [
      {item:'blue',salida:['red','blue','yellow']},
      {item:'blue',salida:'red'},
      {item:'blue',salida:'red'},
      {item:'blue',salida:'red'},
      {item:'blue',salida:'red'},
      {item:'blue',salida:'red'},
      {item:'blue',salida:'red'},
];

var estado = new EstadoNormal(secuencia)
    .alIterar(ponerEstadoPantalla)
    .alGanar(ponerPantallaEnEstadoGanador)
    .alPerder(ponerPantallaEnEstadoPerdedor);

function instalarManejadores() {
    document.querySelectorAll('.boton').forEach(function(boton){
        boton.addEventListener("click", function(event){ clickBoton(event)});
    });
}

function ponerEstadoPantalla(estado) {
    console.log('iterar:'+estado);
}
function ponerPantallaEnEstadoGanador() {
    console.log('ganar');
}
function ponerPantallaEnEstadoPerdedor() {
    console.log('perder');
}

function clickBoton(event) {
    console.log(event.target.dataset.color);
    estado = estado.next(event.target.dataset.color) ;
}

window.onload = function() {
    instalarManejadores();
};