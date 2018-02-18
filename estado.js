function Estado(){
    this._alIterar = null;
    this._alGanar = null;
    this._alPerder = null;
}

Estado.prototype.next = function() {
    this._alIterar && this._alIterar();
    return this;
};

// Hints para el IDE
Estado.prototype.alIterar = null;
Estado.prototype.alPerder = null;
Estado.prototype.alGanar = null;

// Esto debe estar después de los hints para el IDE
(function generateChainProperties() {
    ['alIterar', 'alPerder', 'alGanar'].forEach(function (propertyName) {
        Estado.prototype[propertyName] = function (callback) {
            this['_'+propertyName] = callback;
            return this;
        };
    })
})();

//-----------------------------------------------------------------------
// Esto debería estar en otro fichero
//-----------------------------------------------------------------------

function EstadoCorrecto(secuencia, estadoErroneoAPasarCuandoSePierde) {
    this._indice = 0;
    this._secuencia = secuencia;
    this._estadoAlPerder = estadoErroneoAPasarCuandoSePierde;
}
EstadoCorrecto.prototype = Object.create(Estado.prototype);
EstadoCorrecto.prototype.constructor = EstadoCorrecto;

EstadoCorrecto.prototype.next = function (codigo) {
    var me = this;

    function elCodigoEsCorrecto(codigo) {
        return codigo === me._secuencia[me._indice].item;
    }
    function haGanado() {
        return me._indice >= me._secuencia.length
    }

    function llamarCallbackIterar(){
        me._alIterar && me._alIterar(me._secuencia[me._indice].salida);
    }

    function llamarCallbackhaGanadoSiProcede(){
        if(haGanado()) me._alGanar && me._alGanar();
    }

    function pasarAlEstadoPerdedor() {
        me._estadoAlPerder && me._estadoAlPerder.next();
        return me._estadoAlPerder;
    }

    function gestionaCodigoIncorrecto() {
        function hayEstadoPerdedor() {
            return me._estadoAlPerder;
        }
        function llamaCallbackLocal() {
            me._alPerder();
            return me;
        }

        if(hayEstadoPerdedor()) {
            return pasarAlEstadoPerdedor();
        } else {
            return llamaCallbackLocal();
        }
    }

    if(elCodigoEsCorrecto(codigo)) {
        llamarCallbackIterar();
        this._indice++;
        llamarCallbackhaGanadoSiProcede();
        return this;
    } else {
        gestionaCodigoIncorrecto();
    }
};

//-----------------------------------------------------------------------
// Esto debería estar en otro fichero
//-----------------------------------------------------------------------

function EstadoPerdedor(min, max, generadorEstados){
    this._clicksHastaPerder = Math.floor(Math.random() * max) + min;
    this._clicks = 0;
    this._generadorEstados = generadorEstados;
}
EstadoPerdedor.prototype = Object.create(Estado.prototype);
EstadoPerdedor.prototype.constructor = EstadoPerdedor;

EstadoPerdedor.prototype.next = function(){
    var me = this;

    function llamarCallbackIterar(){
        var estado = me._generadorEstados && me._generadorEstados() || undefined;
        me._alIterar && me._alIterar(estado);
    }

    function hayQueLanzarPerder() {
        return me._clicks >= me._clicksHastaPerder;
    }

    llamarCallbackIterar();
    this._clicks++;
    if(hayQueLanzarPerder()) this._alPerder && this._alPerder();
    return this;
};

