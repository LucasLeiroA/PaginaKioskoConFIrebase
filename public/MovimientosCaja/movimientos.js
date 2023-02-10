window.onload=principal;
var date = new Date();
var mes = date.getMonth();
var fecha = date.getDate();
var hora = date.getHours()

let url = window.location.href;

localStorage.setItem("UrlMovimientos" , url);

let pantalla = localStorage.getItem("urlPatallaIncial");
let admin = localStorage.getItem("urlAdmin");
let ventas = localStorage.getItem("urlVentas");
let anulacion = localStorage.getItem("urlAnulacion");
let registrar = localStorage.getItem("urlRegistrarClientes");
let cobranza = localStorage.getItem("urlCobranza");
let reportes = localStorage.getItem("urlReportes");

function principal(){

    document.getElementById("aceptar").addEventListener("click", aceptarTipo)
}

async function aceptarTipo(){

    document.getElementById("cabezaTabla").innerHTML="";
    document.getElementById("tablaMuestra").innerHTML="";

    try {
        let TipoVenta=document.getElementById("selector").value;

        if (TipoVenta=="IngreDinero") {
            document.getElementById("salida1").style.background="#3b4652"
            document.getElementById("salida1").innerHTML="";
            document.getElementById("pieTabla").innerHTML="";
            document.getElementById("salida1").innerHTML+=
            `
            <h3>Ingreso de Dinero</h3>
            <label for="">Monto</label>
            <input type="number" id="ingreso1" name="age" pattern="[0-9]+" /> 
            <label for="">Descipcion</label>
            <textarea name="" id="areatext" cols="30" rows="3"></textarea>
            <button id="confirmar">Confirmar</button>
            `
            document.getElementById("confirmar").addEventListener("click",IngresoDeDinero)
            
        }
        if (TipoVenta=="SalidaDinero") {
            document.getElementById("salida1").style.background="#3b4652"
            document.getElementById("salida1").innerHTML="";
            document.getElementById("pieTabla").innerHTML="";
            document.getElementById("salida1").innerHTML+=
            `
            <h3>Salida de Dinero</h3>
            <label for="">Monto:</label>
            <input type="number" id="ingreso1" name="age" pattern="[0-9]+" /> 
            <label for="">Descipcion:</label>
            <textarea name="" id="areatext" cols="30" rows="3"></textarea>
            <button id="confirmar1">Confirmar</button>

            `

            document.getElementById("confirmar1").addEventListener("click",salidaDeDinero)
        }

    } catch (err) {
        alert(err)
    }
          
}   
async function IngresoDeDinero(){

    let descripcion=document.getElementById("areatext").value;
    let money=document.getElementById("ingreso1").value;
    let total;
    let final;
try {
    if( descripcion != "" && money > 0){
        let ingreso=await axios.post("http://localhost:3001/ingresoDinero",{
        dinero:parseInt(money),
        descripcion:descripcion,
        mes:mes,
        fecha:fecha,
        hora:hora

    })}else(
        alert("Debe cargar ambos campos")
    )

    let estado=await axios.get("http://localhost:3001/EstadoDeCaja");
    for (let item of estado.data) {

        if (item.id==1) {
            total=item.efectivo;    
        }
    }
     final=total+parseInt(money);
    let modiestado=await axios.put("http://localhost:3001/EstadoDeCaja/1",{
        efectivo:final
    });

   limpiar();
} catch (err) {
    alert(err)
}

}
async function salidaDeDinero(){
    
    let descripcion=document.getElementById("areatext").value;
    let money=document.getElementById("ingreso1").value;
    let total;
    let final;
    try {
        if( descripcion != "" && money  > 0){
              let ingreso=await axios.post("http://localhost:3001/salidaDinero",{
        dinero:parseInt(money),
        descripcion:descripcion,
        mes:mes,
        fecha:fecha,
        hora:hora 
        }
     
    )}else(
        alert("Debe cargar ambos campos")
    )

    let estado=await axios.get("http://localhost:3001/EstadoDeCaja");
    for (let item of estado.data) {

        if (item.id==1) {
            total=item.efectivo;    
        }
    }
     final=total-parseInt(money);
    let modiestado=await axios.put("http://localhost:3001/EstadoDeCaja/1",{
        efectivo:final
    });
    limpiar();
} catch (err) {
    alert(err)
}
}

function limpiar(){
    document.getElementById("areatext").value = "";
    document.getElementById("ingreso1").value = "";
}