    const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito.</h1>
    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
                <img src="${product.img}">
                <h3>${product.nombre}</h3>
                <p>${product.precio} $</p>
                <span class= "restar"> - </span>
                <p>Cantidad: ${product.cantidad}</p>
                <span class= "sumar"> + </span>
                <p>Total: ${product.cantidad * product.precio}</p>
                <span class= "delete-product"> ❌ </span>
                `;

        modalContainer.append(carritoContent)

        let restar = carritoContent.querySelector(".restar")
        restar.addEventListener("click", () => {
            if(product.cantidad !== 1){
            product.cantidad--;
            }
            saveLocal();
            pintarCarrito();
        });

        let sumar = carritoContent.querySelector(".sumar");
        sumar.addEventListener("click", () => {
            product.cantidad++;
            saveLocal();
            pintarCarrito();
        });

        let eliminar = carritoContent.querySelector(".delete-product");
        eliminar.addEventListener("click", () => {
            eliminarProducto(product.id);
        });
    
        
    }); 
    
    
    const total = carrito.reduce((acc,el) => acc + el.precio * el.cantidad, 0);

    const totalBuying = document.createElement("div")
    totalBuying.className = "total-content"
    totalBuying.innerHTML = `total a pagar: ${total} $`;
    modalContainer.append(totalBuying);

    const terminarCompra = document.createElement("button")
    terminarCompra.className = "finalizar-compra"
    terminarCompra.innerHTML = `FINALIZAR COMPRA`;
    modalContainer.append(terminarCompra)
    terminarCompra.addEventListener("click", ()=>{
        if(total === 0) {
            Swal.fire({
            title: "No tenes nada en el carrito",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            imageUrl:""
            })
        }else{
            Swal.fire({
                title: "Gracias por su compra",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                imageUrl:""
            })
        }
        carrito = []
        
        saveLocal();
        pintarCarrito();
    })
    

};



verCarrito.addEventListener("click", pintarCarrito)


const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    carritoCounter();
    saveLocal();
    pintarCarrito();
};

//const eliminarCarrito = (id) => {
   // const documentId = carrito.find((element) => documentId ===id);
//}

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

const carritoLength = carrito.length;
localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();