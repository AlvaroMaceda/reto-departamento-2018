var testName;
function it(name,test) {
    testName = name;
    test();
}
function assert(expresion){
    if(!expresion) {
        logError('error en funcion:'+testName);
    } else {
        logOK(testName + ': OK');
    }
}
function logError(error){
    console.log(error);
}
function logOK(texto) {
    console.log(texto);
}
window.onload = function() {
    var secuencia = [
        {item:'blue',salida:['red','blue','yellow']},
        {item:'red',salida:'red'},
        {item:'yellow',salida:'red'}
    ];

    it("Itera en entradas correctas",function(){
        var llamadas = 0;
        var e = new EstadoNormal(secuencia);
        e.alIterar(function(){llamadas++});
        e.next('blue');e.next('red');e.next('yellow');
        assert(llamadas===3)
    });

    it("Devuelve el estado de salida",function(){
    });

    it("Marca ganador al llegar al final de la secuencia",function(){
        var llamadas = 0;
        var e = new EstadoNormal(secuencia);
        e.alGanar(function(){llamadas++});
        e.next('blue');e.next('red');e.next('yellow');
        assert(llamadas===1)
    });

    it("",function(){
    });
};


