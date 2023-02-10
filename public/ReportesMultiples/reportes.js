window.onload=principal;


// let url = window.location.href;

// localStorage.setItem("urlReportes" , url);

// let pantalla = localStorage.getItem("urlPatallaIncial");
// let admin = localStorage.getItem("urlAdmin");
// let ventas = localStorage.getItem("urlVentas");
// let anulacion = localStorage.getItem("urlAnulacion");
// let movimientos = localStorage.getItem("urlMovimientos");
// let registrar = localStorage.getItem("urlRegistrarClientes");
// let cobranza = localStorage.getItem("urlCobranza");

function principal(){
    document.getElementById("brnAceptar").addEventListener("click", aceptarOpcion)
}

var fecha=new Date;

async function aceptarOpcion(){

    document.getElementById("tablaMuestra").innerHTML="";
    document.getElementById("cabezaTabla").innerHTML="";
    document.getElementById("tablaMuestra2").innerHTML="";
    document.getElementById("cabezaTabla2").innerHTML="";
    document.getElementById("pieTabla").innerHTML ="";
    try {

        let articulo;
        let Cliente;
        let nombre;
        let reporte = document.getElementById("selector").value;

        if (reporte=="estadoDeCaja") {
            document.getElementById("cabezaTabla").innerHTML=
            `
            <tr>
                <th scope="col">EstadoDeCaja</th>
                <th scope="col">Contado</th>
                <th scope="col">CuentaCorriente</th>
                <th scope="col">Transferecia/Tarjetas</th>
            </tr>
            `
    
            let estado=await axios.get("http://localhost:3001/EstadoDeCaja");
            let efectivo;
            let cc;
            let tarjeta;
            for (let item of estado.data) {
                if (item.id==1) {
                   efectivo=item.efectivo;
                    
                }
                if (item.id==2) {
                  cc=item.ventasEnCuentaCorriente;
                }
                if (item.id==3) {
                    tarjeta=item.VentasTrasferencias;
                  }
            }
            document.getElementById("tablaMuestra").innerHTML+=
            `<tr>
                <th scope="row"></th>
                <td>${efectivo}</td>
                <td>${cc}</td>
                <td>${tarjeta}</td>
            </tr>`;
        }
    
        if (reporte=="ventasTotales") {
            
            document.getElementById("cabezaTabla").innerHTML=
            `
            <tr>
                <th scope="col">ID#</th>
                <th scope="col">Tipo</th>
                <th scope="col">Articulo</th>
                <th scope="col">cantidad</th>
                <th scope="col">total</th>
            </tr>
            `
            let ventas=await axios.get("http://localhost:3001/ventas");
            let articulos=await axios.get("http://localhost:3001/articulo");
            let tipoVenta=await axios.get("http://localhost:3001/tipoVenta")
            let nom;
            let tipo;
         
            for (let item of ventas.data) {
                if (item.estadoVentaId !== 2){ 
                  
                                    
                    for (let item2 of articulos.data) {
                        if (item.articuloId==item2.id) {
                            nom=item2.nombre;
                        }
                    }
    
                    for (let item3 of tipoVenta.data) {
                        if (item.tipoVentaId==item3.id) {
                            tipo=item3.tipo;
                        }
                    }
                   
    
    
                    document.getElementById("tablaMuestra").innerHTML+=
                    `<tr>
                        <th scope="row">${item.id}</th>
                        <td>${tipo}</td>
                        <td>${nom}</td>
                        <td>${item.cantidad}</td>
                        <td>${item.totalVenta}</td>                    
                    </tr>`;
                }
            }
              
        }
        if (reporte=="ventasDelDia") {
            


            document.getElementById("cabezaTabla").innerHTML=
            `
            <tr>
                <th scope="col">ID#</th>
                <th scope="col">Tipo</th>
                <th scope="col">Articulo</th>
                <th scope="col">cantidad</th>
                <th scope="col">total</th>
            </tr>
            `
            let ventas=await axios.get("http://localhost:3001/ventas");
            let articulos=await axios.get("http://localhost:3001/articulo");
            let tipoVenta=await axios.get("http://localhost:3001/tipoVenta")
            let total_dia = 0;
            let nom;
            let tipo;
            

           

            for (let item of ventas.data) {
                    if (item.dia==fecha.getDate() && item.mes == fecha.getMonth() && item.estadoVenta==1 && item.tipoVentaId==1 || item.tipoVentaId==2 || item.tipoVentaId == 3) {
                    let precio = parseInt( item.totalVenta)
                     total_dia = total_dia + precio;

                    for (let item2 of articulos.data) {
                        if (item.articuloId==item2.id) {
                            nom=item2.nombre;
                        }
                    }
    
                    for (let item3 of tipoVenta.data) {
                        if (item.tipoVentaId==item3.id) {
                            tipo=item3.tipo;
                        }
                    }
                   
    
    
                    document.getElementById("tablaMuestra").innerHTML+=
                    `<tr>
                        <th scope="row">${item.id}</th>
                        <td>${tipo}</td>
                        <td>${nom}</td>
                        <td>${item.cantidad}</td>
                        <td>${item.totalVenta}</td>                    
                    </tr>`;
                }
                }
              
                document.getElementById("pieTabla").innerHTML =  `<tr>
                <th scope="row"></th>
                <td></td>
                <td></td>
                <td>Total-></td>
                <td>${total_dia}</td>
            </tr>`;
            
              
        }
        if (reporte=="ventasDelMes") {
         
            document.getElementById("cabezaTabla").innerHTML=
            `
            <tr>
                <th scope="col">ID#</th>
                <th scope="col">Tipo</th>
                <th scope="col">Articulo</th>
                <th scope="col">cantidad</th>
                <th scope="col">total</th>
            </tr>
            `
            let ventas=await axios.get("http://localhost:3001/ventas");
            let articulos=await axios.get("http://localhost:3001/articulo");
            let tipoVenta=await axios.get("http://localhost:3001/tipoVenta")
            let nom;
            let tipo;
            let total_mes = 0;

            for (let item of ventas.data) {
                if (item.mes==fecha.getMonth() && item.estadoVenta==1 && item.tipoVentaId==1 || item.tipoVentaId==2 || item.tipoVentaId==3) {
                  
                    let precio = parseInt(item.totalVenta);
                    total_mes = total_mes + precio;  
                     
                    for (let item2 of articulos.data) {
                        if (item.articuloId==item2.id) {
                            nom=item2.nombre;
                        }
                    }
    
                    for (let item3 of tipoVenta.data) {
                        if (item.tipoVentaId==item3.id) {
                            tipo=item3.tipo;
                        }
                    }
                   
    
    
                    document.getElementById("tablaMuestra").innerHTML+=
                    `<tr>
                        <th scope="row">${item.id}</th>
                        <td>${tipo}</td>
                        <td>${nom}</td>
                        <td>${item.cantidad}</td>
                        <td>${item.totalVenta}</td>                    
                    </tr>`;
                }

                document.getElementById("pieTabla").innerHTML =  `<tr>
                <th scope="row"></th>
                <td></td>
                <td></td>
                <td>Total mes-></td>
                <td>${total_mes}</td>
            </tr>`;

            }
              
        }
        if (reporte=="ventasContado") {
           
            document.getElementById("cabezaTabla").innerHTML+=
            `
            <tr>
                    <th scope="col">#ID</th>
                    <th scope="col">Articulo</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">total</th>
            </tr>
    
            `
    
    
            let ventaContado=await axios.get("http://localhost:3001/ventas");
            let total1=0;
            for (let item of ventaContado.data) {
                if (item.tipoVentaId==1 && item.estadoVentaId!=2) {
                    
                    let total=parseInt(item.totalVenta)
    
                    total1=total1+total;
    
                    let art=await axios.get("http://localhost:3001/articulo");
    
                    for (let item2 of art.data) {
                        if (item2.id==item.articuloId) {
                            nombre=item2.nombre;
                            break;
                        }
                    }
                    document.getElementById("tablaMuestra").innerHTML+=
                    `<tr>
                    <th scope="row">${item.id}</th>
                    <td>${nombre}</td>
                    <td>${item.cantidad}</td>
                    <td>${item.totalVenta}</td>
                  
                </tr>`;
                }
                document.getElementById("pieTabla").innerHTML=
                `<tr>
                <th scope="row"></th>
                <td></td>
                <td>Total Contado-></td>
                <td>${total1}</td>
            </tr>`;
            }
            
        }

        if (reporte=="ventasCuentaCorriente") {
            
            document.getElementById("cabezaTabla").innerHTML+=
            `
            <tr>
                    <th scope="col">#ID</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Articulo</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">total</th>
            </tr>
    
            `
    
            let ventaCuentaCorriente=await axios.get("http://localhost:3001/ventas"); 
            let total1=0;
            for (let item of ventaCuentaCorriente.data) {
                if (item.tipoVentaId==2 && item.estadoVentaI!=2) {
                    
                    let total=parseInt(item.totalVenta)
    
                    total1=total1+total;
    
                    let arti=await axios.get("http://localhost:3001/articulo");
                
                    for (let item2 of arti.data) {
                        if (item2.id==item.articuloId) {
                            articulo=item2.nombre;
                            break;
    
                        }
                    }
    
                    let cli=await axios.get("http://localhost:3001/clientes");
    
                    for (let item3 of cli.data) {
                        if (item3.id==item.clientesId) {
                            Cliente=item3.nomYape;
                            break;
                        }
                    }
    
                    document.getElementById("tablaMuestra").innerHTML+=
                    `<tr>
                        <th scope="row">${item.id}</th>
                        <td>${Cliente}</td>
                        <td>${articulo}</td>
                        <td>${item.cantidad}</td>
                        <td>${item.totalVenta}</td>
                    </tr>`;
                }
                document.getElementById("pieTabla").innerHTML=
                `<tr>
                <th scope="row"></th>
                <td></td>
                <td></td>
                <td>Total CuentaCorriente-></td>
                <td>${total1}</td>
            </tr>`;
                
            }
        }
        if (reporte=="ventasTarjeta") {
           
            document.getElementById("cabezaTabla").innerHTML+=
            `
            <tr>
                    <th scope="col">#ID</th>
                    <th scope="col">Articulo</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">total</th>
            </tr>
    
            `
    
    
            let ventaContado=await axios.get("http://localhost:3001/ventas");
            let total1=0;
            for (let item of ventaContado.data) {
                if (item.tipoVentaId==3 && item.estadoVentaId!=2) {
                    
                    let total=parseInt(item.totalVenta)
    
                    total1=total1+total;
    
                    let art=await axios.get("http://localhost:3001/articulo");
    
                    for (let item2 of art.data) {
                        if (item2.id==item.articuloId) {
                            nombre=item2.nombre;
                            break;
                        }
                    }
                    document.getElementById("tablaMuestra").innerHTML+=
                    `<tr>
                    <th scope="row">${item.id}</th>
                    <td>${nombre}</td>
                    <td>${item.cantidad}</td>
                    <td>${item.totalVenta}</td>
                  
                </tr>`;
                }
                document.getElementById("pieTabla").innerHTML=
                `<tr>
                <th scope="row"></th>
                <td></td>
                <td>Total Tarjeta-></td>
                <td>${total1}</td>
            </tr>`;
            }
            
        }
        if (reporte=="ventaAnuladas") {
           
            document.getElementById("cabezaTabla").innerHTML+=
            `
            <tr>
                    <th scope="col">#ID</th>
                    <th scope="col">Articulo</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">total</th>
            </tr>

            `
            let venta=await axios.get("http://localhost:3001/ventas"); 
            let total1=0;
            let articulo;
                for (let item of venta.data) {
                    if (item.estadoVentaId==2) {
                        
                        let total=parseInt(item.totalVenta)

                        total1=total1+total;

                        let arti=await axios.get("http://localhost:3001/articulo");
                    
                        for (let item2 of arti.data) {
                            if (item2.id==item.articuloId) {
                                articulo=item2.nombre;
                                break;

                            }
                        }

                        let cli=await axios.get("http://localhost:3001/clientes");

                        for (let item3 of cli.data) {
                            if (item3.id==item.clientesId) {
                                Cliente=item3.nomYape;
                                break;
                            }
                        }

                        document.getElementById("tablaMuestra").innerHTML+=
                        `<tr>
                            <th scope="row">${item.id}</th>
                            <td>${articulo}</td>
                            <td>${item.cantidad}</td>
                            <td>${item.totalVenta}</td>
                        </tr>`;
                    }
                    document.getElementById("pieTabla").innerHTML=
                    `<tr>
                    <th scope="row"></th>
                    <td></td>
                    <td>Total Anuladas-></td>
                    <td>${total1}</td>
                </tr>`;
                    
                }
                
            }
            if (reporte=="deudaDeCuentasCorrientes") {
               
          
                    document.getElementById("cabezaTabla").innerHTML+=
                    `
                    <tr>
                            <th scope="col">#ID</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Deuda</th>
                    </tr>

                    `

                    let clientes=await axios.get("http://localhost:3001/clientes");
                    let cc=await axios.get("http://localhost:3001/cuentaCorriente");
                    let total1=0;
                    let total;
                    let nombre;

                    for (let item of cc.data) {
                        for (let item2 of clientes.data) {
                            if (item.clientesId==item2.id) {
                                nombre=item2.nomYape;
                                break;
                            }
                            
                        }
                        total=parseInt(item.deuda);
                        total1=total1+total;
                        if (item.deuda!=0) {
                            

                            document.getElementById("tablaMuestra").innerHTML+=
                            `<tr>
                                <th scope="row">${item.clientesId}</th>
                                <td>${nombre}</td>
                                <td>${item.deuda}</td>
                                
                            </tr>`;


                        }
                        


                        document.getElementById("pieTabla").innerHTML=
                        `<tr>
                        <th scope="row"></th>
                        <td>Total anulado-></td>
                        <td>${total1}</td>
                    </tr>`;
                        
                }
             }
             if (reporte=="pagosDeCuentasCorrientes") {

              
                document.getElementById("pieTabla").innerHTML="";
                document.getElementById("cabezaTabla").innerHTML+=
                `
                <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Pago</th>
                </tr>
        
                `
                let nombrcliente;
                let pagos=await axios.get("http://localhost:3001/pagosCuentaCorriente");
                let cliente=await axios.get("http://localhost:3001/clientes");
                for (let item2 of cliente.data) {
                    
                    for (let item of pagos.data) {
        
                        if (item.clientesId==item2.id) {
                                document.getElementById("tablaMuestra").innerHTML+=
                            `<tr>
                                <th scope="row">${item.id}</th>
                                <td>${item2.nomYape}</td>
                                <td>${item.pago}</td>
                                
                            </tr>`;
                         }  
                    }
                   
                 }
             }
             if (reporte=="stockCompleto") {
                document.getElementById("cabezaTabla").innerHTML+=
                `
                <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">Articulo</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Precio Compra</th>
                        <th scope="col">Precio Venta</th>
                </tr>
        
                `
                 let stock=await axios.get("http://localhost:3001/articulo");
                 for (let item of stock.data) {
                    switch (item.categoriaId) {
                        case 1:
                             cat="comestibles";
                             break;
                       case 2:
                             cat="bebidas";
                          break;
                      case 3:
                             cat="cigarrilos";
                          break;
                    case 4:
                            cat="golosinas";
                        break;
                     
                         default:
                             break;
                     }
           
                            document.getElementById("tablaMuestra").innerHTML+= 
                           `<tr>
                               <th scope="row">${item.id}</th>
                               <td>${item.nombre}</td>
                               <td>${item.cantidad}</td>
                               <td>${cat}</td>
                               <td>$${item.PrecioCompra}</td>
                               <td>$${item.PrecioVenta}</td>
                           </tr>`;
                 }
             }
             if (reporte=="stockCritico") {
                document.getElementById("cabezaTabla").innerHTML+=
                `
                <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">Articulo</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Precio Compra</th>
                        <th scope="col">Precio Venta</th>
                </tr>
        
                `
                 let stock=await axios.get("http://localhost:3001/articulo");
                 for (let item of stock.data) {
                    switch (item.categoriaId) {
                        case 1:
                             cat="comestibles";
                             break;
                       case 2:
                             cat="bebidas";
                          break;
                      case 3:
                             cat="cigarrilos";
                          break;
                    case 4:
                            cat="golosinas";
                        break;
                     
                         default:
                             break;
                     }
                     
                     if (item.cantidad<=5) {
                          document.getElementById("tablaMuestra").innerHTML+= 
                           `<tr>
                               <th scope="row">${item.id}</th>
                               <td>${item.nombre}</td>
                               <td>${item.cantidad}</td>
                               <td>${cat}</td>
                               <td>$${item.PrecioCompra}</td>
                               <td>$${item.PrecioVenta}</td>
                           </tr>`;
                     }
                           
                 }
             }
             if (reporte=="stockCero") {
                 
                document.getElementById("cabezaTabla").innerHTML+=
                `
                <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">Articulo</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Precio Compra</th>
                        <th scope="col">Precio Venta</th>
                </tr>
        
                `
                 let stock=await axios.get("http://localhost:3001/articulo");
                 for (let item of stock.data) {
                    switch (item.categoriaId) {
                        case 1:
                             cat="comestibles";
                             break;
                       case 2:
                             cat="bebidas";
                          break;
                      case 3:
                             cat="cigarrilos";
                          break;
                    case 4:
                            cat="golosinas";
                        break;
                     
                         default:
                             break;
                     }
                     
                     if (item.cantidad==0) {
                          document.getElementById("tablaMuestra").innerHTML+= 
                           `<tr>
                               <th scope="row">${item.id}</th>
                               <td>${item.nombre}</td>
                               <td>${item.cantidad}</td>
                               <td>${cat}</td>
                               <td>$${item.PrecioCompra}</td>
                               <td>$${item.PrecioVenta}</td>
                           </tr>`;
                     }
                           
                 }

             }
             if (reporte=="movimientosDeCaja") {
                   
                document.getElementById("cabezaTabla").innerHTML+=
                `
                <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">Dinero</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Tipo</th>
                </tr>
        
                `

                let movEntrada=await axios.get("http://localhost:3001/ingresoDinero");
            
                for (let item of movEntrada.data) {

                    document.getElementById("tablaMuestra").innerHTML+= 
                         `
                         <tr>
                               <th scope="row">${item.id}</th>
                               <td>${item.dinero}</td>
                               <td>${item.descripcion}</td>  
                               <td>Ingreso De Dinero</td>                                                    
                           </tr>`;
                }

            

                let salDinero=await axios.get("http://localhost:3001/salidaDinero");
           
                for (let item of salDinero.data) {
                    document.getElementById("tablaMuestra").innerHTML+= 
                    `
                    
                        <tr>
                               <th scope="row">${item.id}</th>
                               <td>-${item.dinero}</td>
                               <td>${item.descripcion}</td>  
                               <td>Salida De Dinero</td>                           
                           </tr>
                    
                    `;

                }
                 
             }
        
        
    } catch (err) {
        alert(err)
    }
}