var testSuite;
var testName;
function xdescribe() {};
function describe(name,test) {
    testSuite = name;
    test();
}
function xit() {}
function it(name,test) {
    testName = name;
    test();
}
function assert(expresion){
    if(!expresion) {
        logError();
    } else {
        logOK();
    }
}
function pending(){
    console.log(testSuite + "/" + testName + ": TEST PENDIENTE");
}
function logError(){
    console.log('***ERROR EN FUNCION***:'+ testSuite + "/" + testName);
}
function logOK() {
    console.log(testSuite + "/" + testName + ": OK");
}
window.onload = function() {

    describe('EstadoCorrecto', function () {
        var secuencia = [
            {item:'blue',salida:['red','blue','yellow']},
            {item:'red',salida:'red'},
            {item:'yellow',salida:'red'}
        ];

        it("Itera en entradas correctas",function(){
            var llamadas = 0;
            var e = new EstadoCorrecto(secuencia);

            e.alIterar(function(){llamadas++});
            e.next('blue').next('red').next('yellow');

            assert(llamadas === 3)
        });

        it("Devuelve el estado de salida",function(){
            var e = new EstadoCorrecto(secuencia);

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
            var e = new EstadoCorrecto(secuencia);

            e.alIterar(function(){llamadasIterar++}).alGanar(function(){llamadasGanar++});
            e.next('blue').next('red').next('yellow');

            assert(llamadasIterar === 3);
            assert(llamadasGanar === 1);
        });

        it("Si no se pasa estado perdedor, llama al callback alPerder()",function(){
            var llamadas = 0;
            var e = new EstadoCorrecto(secuencia);
            e.alPerder(function(){llamadas++});
            e.next('blue').next('albondiga');
            assert(llamadas === 1);
        });

        it("Pasa al estado perdedor si se introduce un código erróneo",function(){
            var llamadas = 0;
            var estadoPerdedor = {
                next: function() {llamadas++}
            };
            var e = new EstadoCorrecto(secuencia, estadoPerdedor);
            e = e.next('albondiga');
            assert(llamadas === 1);
            assert(e === estadoPerdedor);
        });


    });

    describe('EstadoPerdedor', function () {

        var antiguaFuncionRandom;

        function installMathRandomMock(min,max,expected){
            antiguaFuncionRandom = Math.random;
            Math.random = function() {return (expected-min)/max}; // Inverso de (Math.random()*max + min)
        }
        function uninstallMathRandomMock(){
            Math.random = antiguaFuncionRandom;
        }

        it("Llama a la función alIterar()",function(){
            var min=2,max=7, expected=5;
            var llamadas = 0;
            installMathRandomMock(min,max,expected);

            var e = new EstadoPerdedor(1,5).alIterar(function(){llamadas++});
            e.next().next();

            assert(llamadas === 2);
            uninstallMathRandomMock();
        });

        it("Falla tras un numero aleatorio de veces",function(){
            var min=1,max=5, expected=3;
            var llamadas = 0;
            installMathRandomMock(min,max,expected);

            var e = new EstadoPerdedor(1,5).alPerder(function(){llamadas++});
            e.next().next().next();

            assert(llamadas === 1);
            uninstallMathRandomMock();
        });

        it("Genera los estados según la función generadora",function(){
            var min=1,max=5, expected=4;
            var llamadas = 0;
            installMathRandomMock(min,max,expected);

            var estados = ['patata',5,'chorizo',{un:'bacalao',de:2}];
            var indice = 0;
            var generadorEstados = function() {
                return estados[indice];
            };

            var e = new EstadoPerdedor(1,5,generadorEstados)
                .alIterar(function(estado) {
                    llamadas++;
                    assert(estado === estados[indice++]);
                });

            e.next().next().next().next();

            assert(llamadas === 4);
        });

    });

};


