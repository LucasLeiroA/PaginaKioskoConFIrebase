
import { getItems } from "./firebase.js";

const dato = "ventas"
window.addEventListener('DOMContentLoaded', async ()=>{
    const queryShnapshot = await getItems(dato);
    // queryShnapshot.forEach( doc => {
    //     console.log(doc.data());
    // });

    console.log(queryShnapshot);
})

