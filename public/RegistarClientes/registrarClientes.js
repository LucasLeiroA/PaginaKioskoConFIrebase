window.onload=principal;
 
import {getItems , IngresarDatos ,  deleteSingleItem , modificarItem } from "../firebase.js"

function principal(){
  document.getElementById("btnAceptar").addEventListener("click",btnAceptar)
  document.getElementById("btnCancelar").addEventListener("click",cancelarCliente)
  
}
var var_id;
var editStatus = false;
const coleccion = "clientes";


const cuerpoTabla = document.getElementById("CuerpoTabla");


document.getElementById("CuerpoTabla").innerHTML="";

    window.addEventListener("DOMContentLoaded" , async (e) => {

   
      
        let cliente = await getItems(coleccion);
       
        
        cliente.forEach(item => {
            
            document.getElementById("CuerpoTabla").innerHTML+=
            `<tr>
                            <th scope="row">${item.id}</th>
                            <td>${item.nomYape}</td>
                            <td>${item.dni}</td>
                            <td>${item.direccion}</td>
                            <td><Button class="btn-modificar" data-id="${item.id}">M</Button></td>
                            <td><Button class="btn-eliminar" data-id="${item.id}">X</Button></td>
            
            </tr>`;
        });

        const btnsModificar = cuerpoTabla.querySelectorAll(".btn-modificar");
          btnsModificar.forEach((btn) =>
            btn.addEventListener("click", async (e) => {  
              try {
                let id = (e.target.dataset.id);
                var_id = id;
                editStatus = true;
               let clientes = await getItems(coleccion);
               for (const item of clientes) {
                if(item.id == id){

                      document.getElementById("nomYape").value=item.nomYape;
                      document.getElementById("numDNI").value=item.dni;
                      document.getElementById("direccion").value=item.direccion;
                  
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
            alert("cliente eliminado correctamente");
            location.reload();
          } catch (error) {
            console.log(error);
          }
        })
        )
            
      }
    );


        
        function limpiarImput(){
          document.getElementById("nomYape").value="";
          document.getElementById("numDNI").value="";
          document.getElementById("direccion").value="";
     
          
        }
        
        
        async function cancelarCliente(){
          
          document.getElementById("nomYape").value="";
          document.getElementById("numDNI").value="";
          document.getElementById("direccion").value="";
          
        }
         async function btnAceptar(){
          try {
         
            
              let nombre=document.getElementById("nomYape").value;
              let dni=document.getElementById("numDNI").value;
              let direccion=document.getElementById("direccion").value;
              
              let nuevaData = {
                nomYape:nombre,
                dni:dni,
                direccion:direccion
              }; 
              
                if (!editStatus) {
                  
                 await IngresarDatos(coleccion , nuevaData).then(alert("Cliente Agendado Correctamente"));

                }else{
                  await modificarItem(coleccion , var_id, nuevaData).then(alert("Cliente Modificado Correctamente"));
                }

              
              } catch (err) {
                  console.log(err)
              }
              
              limpiarImput();
              location.reload()
          }
        


