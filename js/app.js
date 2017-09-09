var Calculadora = (function() {

    var suma = function(param1, param2) {
        return param1 + param2;
    }

    var resta = function(param1, param2) {
        return param1 - param2;
    }

    var multiplicar = function(param1, param2) {
        return param1 * param2;
    }
    var dividir = function(param1, param2) {
        return param1 / param2;
    }

    return {
        suma: suma,
        resta: resta,
        multiplicar: multiplicar,
        dividir: dividir

    }
})();


var tecla = document.getElementsByClassName("tecla");
sessionStorage.clear();
for (var i = tecla.length - 1; i >= 0; i--) {
    tecla[i].addEventListener("mousedown", pressKey);
    tecla[i].addEventListener("mouseup", releaseKey);
}

function pressKey() {
    console.log('pressKey: ' + this.id)
    document.getElementById(this.id).style = "  padding: 1px 1px 1px 1px;";

    var clickSound = new Audio('sonido/SonidoMouse.mp3');
    clickSound.loop = false;
    clickSound.play();

    if (this.id == "on") {
        sessionStorage.clear();
        document.getElementById('display').innerHTML = 0;
    } else if (this.id == "raiz") {
        // Not function assigned
    } else if (this.id == "igual") {

        sessionStorage.setItem("scondValue", sessionStorage.getItem('lastkey'))

        var fristValue = parseFloat(sessionStorage.getItem('fristValue'))
        var secondValue = parseFloat(sessionStorage.getItem('scondValue'))

        switch (sessionStorage.getItem("operation")) {
            case "+":
                console.log("suma: ", fristValue, " + ", secondValue)
                sessionStorage.setItem("lastkey", Calculadora.suma(fristValue, secondValue));
                var str = sessionStorage.getItem("lastkey");
                if (str.length > 9) str = str.substring(0, 9);
                document.getElementById('display').innerHTML = str;
                console.log(Calculadora.suma(fristValue, secondValue))
                break;
            case "-":
                console.log("resta: ", fristValue, " - ", secondValue)
                sessionStorage.setItem("lastkey", Calculadora.resta(fristValue, secondValue));
                var str = sessionStorage.getItem("lastkey");
                if (str.length > 9) str = str.substring(0, 9);
                document.getElementById('display').innerHTML = str;
                console.log(Calculadora.resta(fristValue, secondValue))
                var lastResult = Calculadora.resta(fristValue, secondValue)
                if (lastResult == 0) {
                    sessionStorage.clear();
                    document.getElementById('display').innerHTML = 0;
                }
                break;
            case "*":
                console.log("multiplicar: ", fristValue, " * ", secondValue)
                sessionStorage.setItem("lastkey", Calculadora.multiplicar(fristValue, secondValue));
                var str = sessionStorage.getItem("lastkey");
                if (str.length > 9) str = str.substring(0, 9);
                document.getElementById('display').innerHTML = str;
                console.log(Calculadora.multiplicar(fristValue, secondValue))
                break;
            case "/":
                console.log("dividir: ", fristValue, " / ", secondValue)
                sessionStorage.setItem("lastkey", Calculadora.dividir(fristValue, secondValue));
                var str = sessionStorage.getItem("lastkey");
                if (str.length > 9) str = str.substring(0, 9);
                document.getElementById('display').innerHTML = str;
                console.log(Calculadora.dividir(fristValue, secondValue))
                break;
            default:
                break;
        }


    } else if (this.id == "0") {
        var value = document.getElementById('display').innerHTML;

        if (value == 0) {

        } else {
            if (sessionStorage['lastkey'] == null) {
                sessionStorage.setItem("lastkey", this.id);
                document.getElementById('display').innerHTML = sessionStorage.getItem('lastkey');
            } else {
                if (document.getElementById('display').innerHTML.length + 1 <= 8) {
                    console.log(document.getElementById('display').innerHTML.length + 1)
                    sessionStorage.setItem("lastkey", sessionStorage.getItem('lastkey') + this.id);
                    document.getElementById('display').innerHTML = sessionStorage.getItem('lastkey');
                }
            }
        }
    } else if (this.id == ".") {
        console.log('Pide .');
        var str = document.getElementById('display').innerHTML;
        var n = str.indexOf(".");
        if (n > 0) {
            console.log('Si tiene punto');
        } else {
            console.log('No tiene punto');

            if (sessionStorage['lastkey'] == null) {
                sessionStorage.setItem("lastkey", 0 + this.id);
                document.getElementById('display').innerHTML = sessionStorage.getItem('lastkey');
            } else {
                if (document.getElementById('display').innerHTML.length + 1 <= 8) {
                    console.log(document.getElementById('display').innerHTML.length + 1)
                    sessionStorage.setItem("lastkey", sessionStorage.getItem('lastkey') + this.id);
                    document.getElementById('display').innerHTML = sessionStorage.getItem('lastkey');
                }
            }
        }
    } else if (this.id == "mas") {
        sessionStorage.setItem("fristValue", sessionStorage.getItem('lastkey'));
        sessionStorage.setItem("operation", '+')

        sessionStorage.removeItem("lastkey");
        document.getElementById('display').innerHTML = ""

    } else if (this.id == "menos") {
        sessionStorage.setItem("fristValue", sessionStorage.getItem('lastkey'));
        sessionStorage.setItem("operation", '-')

        sessionStorage.removeItem("lastkey");
        document.getElementById('display').innerHTML = ""

    } else if (this.id == "por") {
        sessionStorage.setItem("fristValue", sessionStorage.getItem('lastkey'));
        sessionStorage.setItem("operation", '*')

        sessionStorage.removeItem("lastkey");
        document.getElementById('display').innerHTML = ""

    } else if (this.id == "dividido") {
        sessionStorage.setItem("fristValue", sessionStorage.getItem('lastkey'));
        sessionStorage.setItem("operation", '/')

        sessionStorage.removeItem("lastkey");
        document.getElementById('display').innerHTML = ""

    } else if (this.id == "sign") {
        var value = document.getElementById('display').innerHTML;
        if (value != 0) {
            console.log('press sign');
            var invertNumber = negativeNumber(sessionStorage.getItem('lastkey'));
            document.getElementById('display').innerHTML = invertNumber
            sessionStorage.setItem("lastkey", invertNumber);
        }
    } else {
        if (sessionStorage['lastkey'] == null) {
            sessionStorage.setItem("lastkey", this.id);
            document.getElementById('display').innerHTML = sessionStorage.getItem('lastkey');
        } else {
            if (document.getElementById('display').innerHTML.length + 1 <= 8) {
                console.log(document.getElementById('display').innerHTML.length + 1)
                sessionStorage.setItem("lastkey", sessionStorage.getItem('lastkey') + this.id);
                document.getElementById('display').innerHTML = sessionStorage.getItem('lastkey');
            }
        }
    }
}

function releaseKey() {
    document.getElementById(this.id).style = "  padding: 0px 0px 0px 0px;";
}


function negativeNumber(num) {
    if (num > 0) {
        return -Math.abs(num);
    } else if (num < 0) {
        return Math.abs(num);
    }
}