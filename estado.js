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
};

(function generateChainProperties() {
    ['alIterar', 'alPerder', 'alGanar'].map(function (propertyName) {
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

EstadoNormal.prototype.codigoEsperado = function() {
    return this.secuencia[this.indice].item;
};

EstadoNormal.prototype.next = function (codigo) {
    if(codigo === this.codigoEsperado()) {
        this._alIterar && this._alIterar(this.secuencia[this.indice].salida);
        this.indice++;
        if(this.indice >= this.secuencia.length) this._alGanar && this._alGanar();
        return this;
    } else {
        console.log('fail');
        return new EstadoErroneo();
    }
};




function EstadoErroneo(){
}
EstadoErroneo.prototype = Object.create(Estado.prototype);
EstadoErroneo.prototype.constructor = EstadoErroneo;