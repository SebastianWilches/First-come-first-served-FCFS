

//Elementos
const tableProcesos = document.getElementById("tableProcesos");


//Object Array
let procesos = [{
    proceso: 'A',
    tLlegada: 0,
    rafaga: 8,
    tComienzo: "00",
    tFinal: "08",
    tRetorno: 8,
    tEspera: 0
},
{
    proceso: 'B',
    tLlegada: 1,
    rafaga: 4,
    tComienzo: "08",
    tFinal: "12",
    tRetorno: 11,
    tEspera: 7
}
];

// let procesosBloqueados = [];


//Events
const clickUpdateTable = () => {
    showProcesos();
}
const clickCreateProceso = () => {
    createObject();
    showProcesos(); //Actualizar tabla
}


//Clases
class Proceso {
    constructor(proceso, tLlegada, rafaga, tComienzo = "0", tFinal = "0", tRetorno = 0, tEspera = 0, interrupcion = false) {
        this.proceso = proceso;
        this.tLlegada = tLlegada;
        this.rafaga = rafaga;
        this.tComienzo = tComienzo;
        this.tFinal = tFinal;
        this.tRetorno = tRetorno;
        this.tEspera = tEspera;
        this.interrupcion = interrupcion;
    }
    calculateTComienzo(arrayProcesos) {
        this.tComienzo = arrayProcesos[arrayProcesos.length - 1].tFinal;
    }
    calculateTFinal() {
        this.tFinal = String(this.rafaga + parseInt(this.tComienzo));
    }
    calculateTRetorno() {
        this.tRetorno = this.tFinal - this.tLlegada;
    }
    calculateTEspera() {
        this.tEspera = this.tRetorno - this.rafaga;
    }



    calculateInterrupcion() {
        if ((Math.random() * 10) < 3) {
            this.interrupcion = true;
            this.rafaga = this.rafaga / 2;
            console.log("PRoceso bloqueado");
        }
    }
    getInterrupcion() {
        return this.interrupcion;
    }
}

//Funciones
function showProcesos() {
    let tableProcesosHTML = `
    <tr>
        <th>Proceso</th>
        <th>Tiempo Llegada</th>
        <th>Rafaga (seg)</th>
        <th>Tiempo Comienzo (HH:SS)</th>
        <th>Tiempo Final (HH:SS)</th>
        <th>Tiempo Retorno (HH:SS)</th>
        <th>Tiempo Espera (HH:SS)</th>
    </tr>
    `;
    for (const item of procesos) {
        tableProcesosHTML += `
    <tr>
      <td>${item.proceso}</td>      
      <td>${item.tLlegada}</td>      
      <td>${item.rafaga}</td>      
      <td>${item.tComienzo}</td>      
      <td>${item.tFinal}</td>      
      <td>${item.tRetorno}</td>      
      <td>${item.tEspera}</td>      
    </tr>`
    }
    // console.log(tableProcesosHTML);
    tableProcesos.innerHTML = tableProcesosHTML;
}

//Capturar y añadir procesos al object array
function getData() {
    const nameProceso = document.getElementById("nameProceso").value;
    const tLLegada = parseInt(document.getElementById("tLlegada").value);
    const rafaga = parseInt(document.getElementById("rafaga").value);

    return [nameProceso, tLLegada, rafaga];
}

function createObject() {
    const arrayData = getData(); //name, llegada, rafaga
    let ProcesoObject = new Proceso(arrayData[0], arrayData[1], arrayData[2]);
    ProcesoObject.calculateTComienzo(procesos); //Actualiza atributos del objeto creado
    ProcesoObject.calculateTFinal();
    ProcesoObject.calculateTRetorno();
    ProcesoObject.calculateTEspera();

    //ProcesoObject.calculateInterrupcion();


    procesos.push(ProcesoObject); //Lo introduce en el array de objetos


    // if (ProcesoObject.getInterrupcion) {
    //     let ProcesoBloqueado = new Proceso(procesos[procesos.length - 1].proceso, procesos[procesos.length - 1].tLlegada, procesos[procesos.length - 1].rafaga);
    //     ProcesoBloqueado.calculateTComienzo(procesos); //Actualiza atributos del objeto creado
    //     ProcesoBloqueado.calculateTFinal();
    //     ProcesoBloqueado.calculateTRetorno();
    //     ProcesoBloqueado.calculateTEspera();

    //     procesosBloqueados.push(ProcesoBloqueado);
    //     console.log(procesosBloqueados);
    // }


    // updateDataChart(procesos);
    // ejecutarProceso(procesos);
    ejecutarProceso();
    // console.table(procesos);
}


/* Actualizar la data COMPLETA de la grafica chart */
function updateDataChart(newData) {
    chart.data = newData;
}



/*Funcion que simula la ejecucion de procesos en forma de semaforo binario 
function ejecutarProceso(arrayProcesos) {
    for (let i = 0; i <= arrayProcesos.length; i++) {

        setTimeout(() => {
            let arraySemaforo = arrayProcesos.slice(0, i);
            updateDataChart(arraySemaforo)
        }, 10000);

    }
}*/

const semaforoRojo = document.getElementById("semaforoRojo");
const semaforoVerde = document.getElementById("semaforoVerde");


let contadorProcesos = 0;
let arraySemaforo;
function ejecutarProceso() {

    if (contadorProcesos < procesos.length) {
        semaforoVerde.style.display = "none";
        semaforoRojo.style.display = "block";
        setTimeout(() => {
            // semaforoVerde.style.display = "none";
            // semaforoRojo.style.display = "block";
            contadorProcesos++;
            arraySemaforo = procesos.slice(0, contadorProcesos);
            updateDataChart(arraySemaforo);
            ejecutarProceso(contadorProcesos);
        }, 3000);
    } else {
        semaforoVerde.style.display = "block";
        semaforoRojo.style.display = "none";


        if (procesosBloqueados.length == 0) {
            // semaforoVerde.style.display = "block";
            // semaforoRojo.style.display = "none";
        } else {
            // let arrayProcesosTotales = arraySemaforo.concat(procesosBloqueados);
            // updateDataChart(arrayProcesosTotales);
            // procesosBloqueados = [];
        }
    }
}












//FUNCIONES TEST
function getNombreProceso() {
    let nombreProceso = procesos[procesos.length - 1].proceso;
    return nombreProceso;
}

function getTInicial() {
    let tInicialActualProceso = (procesos[procesos.length - 2].tFinal); //tInicial

    return tInicialActualProceso;
}

function getTFinal() {
    let tFinalAnteriorProceso = procesos[procesos.length - 2].tFinal; //tInicial
    let rafagaActualProceso = procesos[procesos.length - 1].rafaga;
    let tFinalActualProceso = (parseInt(tFinalAnteriorProceso) + parseInt(rafagaActualProceso));  //tFinal

    return tFinalActualProceso.toString();
}
//No descartar usar esta función para cuando se implemente un semaforo haciendo uso de dos arrays
//Uno para la tabla y otro que cargue lentamente los elementos en el chart
function addDataGantt(proceso, tComienzo, tFinal) {
    chart.addData({ proceso: proceso, tComienzo: tComienzo, tFinal: tFinal }, 0);
}
