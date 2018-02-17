var testName;
function xit() {}
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
        e.next('blue').next('red').next('yellow');

        assert(llamadas===3)
    });

    it("Devuelve el estado de salida",function(){
        var e = new EstadoNormal(secuencia);

        e.alIterar(function(estado){
            assert(estado === secuencia[0].salida);
        });
        e = e.next('blue');
        e.alIterar(function(estado){
            assert(estado === secuencia[1].salida);
        });
        e.next('red');
    });

    it("Marca ganador al llegar al final de la secuencia",function(){
        var llamadasGanar = 0;
        var llamadasIterar = 0;
        var e = new EstadoNormal(secuencia);

        e.alIterar(function(){llamadasIterar++}).alGanar(function(){llamadasGanar++});
        e.next('blue').next('red').next('yellow');

        assert(llamadasIterar===3);
        assert(llamadasGanar===1);
    });

    it("Marca perdedor si se introduce un código erróneo",function(){
        var llamadas = 0;
        var e = new EstadoNormal(secuencia);
        e.alPerder(function(){llamadas++});
        e.next('red');//.next('red').next('yellow');
        assert(llamadas===1)
    });

    it("",function(){
    });
};


