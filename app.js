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
        boton.addEventListener("click", function(event){
            estado = estado.next(event.target.dataset.color)
        });
    });
}

function ponerEstadoPantalla(estado) {
    console.log('iterar:'+estado);
    var i=0;
    document.querySelectorAll('[id^=estado-]').forEach(function(item){
        console.log(item);
        console.log(estado[i]);
        item.style['background-color'] = estado[i++];
    });
}
function ponerPantallaEnEstadoGanador() {
    console.log('ganar');
}
function ponerPantallaEnEstadoPerdedor() {
    console.log('perder');
}


window.onload = function() {
    instalarManejadores();
};