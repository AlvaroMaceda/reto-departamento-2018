var secuencia = [
      {item:'blue',salida:['red','blue','yellow']},
      {item:'blue',salida:coloresAleatorios},
      {item:'blue',salida:coloresAleatorios},
      {item:'blue',salida:coloresAleatorios},
      {item:'blue',salida:['red','blue','yellow']},
      {item:'blue',salida:['red','blue','yellow']},
      {item:'blue',salida:['green','green','green']},
];

// Niños no hagáis esto en proyectos de verdad
Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
};

var colores = ['red','blue','magenta','red','yellow'];
function coloresAleatorios() {
    return [colores.randomElement(),colores.randomElement(),colores.randomElement()];
}

var estadoPerdedor  = new EstadoPerdedor(3,7,coloresAleatorios)
    .alIterar(ponerEstadoPantalla)
    .alPerder(ponerPantallaEnEstadoPerdedor);

var estado = new EstadoCorrecto(secuencia,estadoPerdedor)
    .alIterar(ponerEstadoPantalla)
    .alGanar(ponerPantallaEnEstadoGanador)
    .alPerder(ponerPantallaEnEstadoPerdedor);

function instalarManejadores() {

    function instalarManejadoresColores(){
        document.querySelectorAll('.boton-color').forEach(function(boton){
            boton.addEventListener("click", function(event){
                estado = estado.next(event.target.dataset.color);
            });
        });
    }

    function instalarManejadorReintentar() {
        document.querySelector('#reintentar')
            .addEventListener("click",function() {
                location.reload();
            });
    }

    instalarManejadoresColores();
    instalarManejadorReintentar();
}

function ponerEstadoPantalla(estados) {
    if(estados instanceof Function) estados = estados();
    var i=0;
    document.querySelectorAll('[id^=estado-]').forEach(function(item){
        item.style['background-color'] = estados[i++];
    });
}
function ponerPantallaEnEstadoGanador() {
    document.querySelector('#ganar').style['display'] = 'block';
}
function ponerPantallaEnEstadoPerdedor() {
    document.querySelector('#perder').style['display'] = 'block';
}

window.onload = function() {
    const estadoInicial = ['black','black','black'];
    instalarManejadores();
    ponerEstadoPantalla(estadoInicial);
};