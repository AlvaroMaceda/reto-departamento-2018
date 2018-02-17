function Estado(){
    this._alIterar = null;
    this._alGanar = null;
    this._alPerder = null;
}

// Hints for static code analysis
Estado.prototype.alIterar = null;
Estado.prototype.alPerder = null;
Estado.prototype.alGanar = null;

Estado.prototype.next = function() {
    this._alIterar && this._alIterar();
    return this;
};

(function generateChainProperties() {
    ['alIterar', 'alPerder', 'alGanar'].forEach(function (propertyName) {
        Estado.prototype[propertyName] = function (callback) {
            this['_'+propertyName] = callback;
            return this;
        };
    })
})();




function EstadoNormal(secuencia) {
    this.indice = 0;
    this.secuencia = secuencia;
}
EstadoNormal.prototype = Object.create(Estado.prototype);
EstadoNormal.prototype.constructor = EstadoNormal;

EstadoNormal.prototype.next = function (codigo) {
    var me = this;

    function elCodigoEsCorrecto(codigo) {
        return codigo === me.secuencia[me.indice].item;
    }
    function haGanado() {
        return me.indice >= me.secuencia.length
    }

    if(elCodigoEsCorrecto(codigo)) {
        this._alIterar && this._alIterar(this.secuencia[this.indice].salida);
        this.indice++;
        if(haGanado()) this._alGanar && this._alGanar();
        return this;
    } else {
        var estadoErroneo = new EstadoErroneo().alPerder(this._alPerder);
        estadoErroneo.next();
        return estadoErroneo;
    }
};



// var randomNumberBetween0and19 = Math.floor(Math.random() * 20);
function EstadoErroneo(){
}
EstadoErroneo.prototype = Object.create(Estado.prototype);
EstadoErroneo.prototype.constructor = EstadoErroneo;

EstadoErroneo.prototype.next = function(){
    this._alPerder && this._alPerder();
    return this;
};

