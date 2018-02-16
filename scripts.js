var secuencia = [
  {item:'blue',salida='red'},
  {item:'blue',salida='red'},
  {item:'blue',salida='red'},
  {item:'blue',salida='red'},
  {item:'blue',salida='red'},
  {item:'blue',salida='red'},
  {item:'blue',salida='red'},
]

var estado = new Estado(secuencia)
  .alIterar(ponerEstadoPantalla)
  .alGanar(ponerPantallaEnEstadoGanador)
  .alPerder(ponerPantallaEnEstadoPerdedor);

function ponerEstadoPantalla() {
}
function ponerPantallaEnEstadoGanador() {
}
function ponerPantallaEnEstadoPerdedor() {
}

function manejadorEvento(item) {
  estado = estado.next(item)  ;
}
