window.onload=principal;

let url = window.location.href;

localStorage.setItem("urlCobranza" , url);

let pantalla = localStorage.getItem("urlPatallaIncial");
let admin = localStorage.getItem("urlAdmin");
let ventas = localStorage.getItem("urlVentas");
let anulacion = localStorage.getItem("urlAnulacion");
let movimientos = localStorage.getItem("urlMovimientos");
let registrar = localStorage.getItem("urlRegistrarClientes");
let reportes = localStorage.getItem("urlReportes");

function principal(){
    document.getElementById("btnpagar").addEventListener("click", pagaoDeuda)
    document.getElementById("mostrar").addEventListener("click", mostrarclintes)
}
var var_id;

async function mostrarclintes(){
    document.getElementById("cuerpoTabla").innerHTML="";
   let cuentaCorriente = await axios.get("http://localhost:3001/cuentaCorriente");
   let cliente=await axios.get("http://localhost:3001/clientes");

   for (let item2 of cuentaCorriente.data) {
       for (let item of cliente.data) {
            if (item2.clientesId==item.id && item2.deuda > 0) {
            document.getElementById("cuerpoTabla").innerHTML+=
            `
            <td><button id="btn" class="btn btn-outline-dark" onclick="selecCliente(${item.id})">${item.nomYape}</button></td><br>
            `
          }
   }
   }
  
}

async function selecCliente(id){

    var_id=id;
    let cli=await axios.get("http://localhost:3001/clientes");
    let cc=await axios.get("http://localhost:3001/cuentaCorriente");
    let deuda;

    for (let item of cc.data) {
        if (item.clientesId==var_id) {
        deuda=parseInt(item.deuda)       
        }
    }

    for (let item of cli.data) {
        if (item.id==var_id) {
            document.getElementById("inpu").value=item.nomYape;
            document.getElementById("inpu1").value=item.dni;
            document.getElementById("inpu2").value=item.direccion;
            document.getElementById("inpu3").value=deuda ;
        }
    }



}

async function pagaoDeuda(){
    try {
           let pago=parseInt(document.getElementById("inpu4").value);
           let cliente;
           let clienteId;
           let deuda;
           let idCuentaCorriente;
           let cc=await axios.get("http://localhost:3001/cuentaCorriente");

    for (let item of cc.data) {
        if (item.clientesId==var_id) {
            cliente=item.cliente;
            clienteId=item.clientesId;
            deuda=item.deuda;
           idCuentaCorriente=item.id;
        }
    }

    let nuevaDeuda=deuda-pago;
    if (deuda>=pago) {
         let modificarDeuda=await axios.put("http://localhost:3001/cuentaCorriente/"+idCuentaCorriente,{
        cliente:cliente ,
        clientesId:clienteId,
        deuda: nuevaDeuda
      },
    );

    let pagoDeuda=await axios.post("http://localhost:3001/pagosCuentaCorriente",{
        clientesId:clienteId,
        pago:pago
    })
    let totalEfec;
    let final=0;
    let efec=await axios.get("http://localhost:3001/EstadoDeCaja");
    for (let item of efec.data) {
        if (item.id==1) {
            totalEfec=item.efectivo;
        }
    }
    final=parseInt(totalEfec)+pago;

    let sumaEfectivo=await axios.put("http://localhost:3001/EstadoDeCaja/1",{
        efectivo:final
    })

    let cc=await axios.get("http://localhost:3001/EstadoDeCaja");
    let valorcc;
    let finalCC=0;
    for (let item of cc.data) {
        if (item.id==2) {
            valorcc=item.ventasEnCuentaCorriente;
        }
    }
    finalCC=parseInt(valorcc)-pago;
    let restaCC=await axios.put("http://localhost:3001/EstadoDeCaja/2",{
        ventasEnCuentaCorriente:finalCC
    })

    alert("Pago Realizado Correctamente") 
    }else{
        alert("No puede pagar mas de lo que debe")
    }
   

    } catch (err) {
        alert(err)
    }
 

}