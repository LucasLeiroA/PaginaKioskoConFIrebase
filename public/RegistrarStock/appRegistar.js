window.onload=principal;

import { getItems , deleteSingleItem , IngresarDatos ,modificarItem } from "../firebase.js";
//obteniendo la url desde el localstorage



let urlActual = window.location.href;
let url = localStorage.getItem("urlAdmin");

let UrlAnterior = document.referrer;

if(urlActual !== urlActual){
if(UrlAnterior !== url ){
    
alert('no intentes hackear')
window.location= "./Admin.html";
}   
}


localStorage.setItem("urlRegistrar" , urlActual);

let coleccion = "articulo";
var var_id;

function principal(){
   
    document.getElementById("agregarArticulo").addEventListener("click", Aceptar);
    document.getElementById("cancelarArticulo").addEventListener("click", cancelar);
    document.getElementById("btn_db").addEventListener("click", ingresoDb);
}
function ingresoDb() {
    window.location="./ManejoDB/manejoDB.html";
}


    var editStatus = false;
    const cuerpoTabla = document.getElementById("CuerpoTabla");

 window.addEventListener("DOMContentLoaded", async (e) =>{
     
     document.getElementById("CuerpoTabla").innerHTML = " ";
     let stock = await getItems(coleccion)
     var cat;
     try {      
                     
         for (let item of stock) {
           switch (parseInt(item.categoriaId)) {
              case 1:
                   cat =  "comestibles";
                   break;
             case 2:
                   cat = "bebidas";
                break;
            case 3:
                   cat = "cigarrilos";
                break;
          case 4:
                  cat = "golosinas";
              break;
           
               default:
                   break;
           }
     
                     document.getElementById("CuerpoTabla").innerHTML+= 
                 `<tr>
                     <th scope="row">${item.id}</th>
                     <td>${item.nombre}</td>
                     <td>${item.cantidad}</td>
                     <td>${cat}</td>
                     <td>$${item.PrecioCompra}</td>
                     <td>$${item.PrecioVenta}</td>
                     <td><button class="btn-modificar" data-id="${item.id}">M</button></td>
                     <td><button class="btn-eliminar" data-id="${item.id}">x</button></td>
                 </tr>`;
         }


         //boton para modificar
         const btnsModificar = cuerpoTabla.querySelectorAll(".btn-modificar");
         btnsModificar.forEach((btn) =>
           btn.addEventListener("click", async (e) => {  
             try {
               let id = (e.target.dataset.id);
               var_id = id;
               editStatus = true;
              let stock = await getItems(coleccion);
              for (const item of stock) {
               if(item.id == id){

                    document.getElementById("idArticulo").value=item.nombre;
                    document.getElementById("idCantidad").value=item.cantidad;
                    document.getElementById("idPrecioCompra").value=item.PrecioCompra;
                    document.getElementById("idPrecioVenta").value=item.PrecioVenta;
                 
               }
               }
             } catch (error) {
               console.log(error);
             }
           })
         );

         const btnsEliminar = cuerpoTabla.querySelectorAll(".btn-eliminar");
         btnsEliminar.forEach((btn)=>
         btn.addEventListener("click", async (e) => {  
           try {
             let id = (e.target.dataset.id);
            
             deleteSingleItem(coleccion, id)
             swal({
                title: "Producto Eliminido!",
                icon: "success",
              }) 
             location.reload()
           } catch (error) {
             console.log(error);
           }
         })
         )



     
         }catch (err) {
     
             alert(err)
         }          
})


 async function Aceptar(){
   
    let arti=document.getElementById("idArticulo").value;
    let cant=document.getElementById("idCantidad").value;
    let precioComp=document.getElementById("idPrecioCompra").value;
    let precioVent=document.getElementById("idPrecioVenta").value;
    let cat=document.getElementById("categorias").value;
    let catId;

     if (arti!="" && cant>0 && precioComp>0 && precioVent>0) {
         
     
    try {

    let categoria = await getItems("categoria");

    for (let item of categoria) {
        if (item.tipo == cat) {
            catId=item.id;
        }
    }
    let nuevaData={
        nombre:arti,
        cantidad:cant,
        PrecioCompra:precioComp,
        PrecioVenta:precioVent,
        categoriaId:catId
    }

    if(!editStatus){

        await  IngresarDatos("articulo" , nuevaData ).then(
        swal({
            title: "Producto Agregado!",
            icon: "success",
          }))
    }else{
        await modificarItem("articulo" , var_id ,nuevaData).then(
            swal({
                title: "Producto Modificado!",
                icon: "success",
              }) 
        )
    }


    } catch (err) {
        swal(err)
    }
    }else{
        alert("Todos los campos deben estas cargados correctamente")
    }
       limpiarCeldas();
       location.reload();
}

function limpiarCeldas(){
    document.getElementById("idArticulo").value="";
    document.getElementById("idCantidad").value="";
    document.getElementById("idPrecioCompra").value="";
    document.getElementById("idPrecioVenta").value="";
}
function cancelar() {
    document.getElementById("idArticulo").value="";
    document.getElementById("idCantidad").value="";
    document.getElementById("idPrecioCompra").value="";
    document.getElementById("idPrecioVenta").value="";
    
}