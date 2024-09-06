const productos = document.getElementById("productos")
const carrito = document.getElementById("carrito")
const Carrito = JSON.parse(localStorage.getItem("carrito")) || []

const Productos = [
        {
            imagen: "https://media.diariouno.com.ar/p/a8844ba478893e5f872e0863fba5d155/adjuntos/298/imagenes/009/338/0009338643/1200x0/smart/la-mejor-torta-cumpleanospng.png",
            titulo: "torta a",
            precio: 15000,
        },
        {
            imagen: "https://cocinerosargentinos.com/content/recipes/500x500/recipes.18500.jpg",
            titulo: "torta b",
            precio: 15000,
        },
        {
            imagen: "https://www.aki.com.ec/wp-content/uploads/2021/01/foto-receta-pastel-chocolate.jpg",
            titulo: "torta c",
            precio: 15000,
        },
        {
            imagen: "https://chocolateaguila.com/archivos/recetas/receta-1251_torta-de-chocolate-con-dulce-de-leche.jpg",
            titulo: "torta d",
            precio: 15000,
        },
        {
            imagen: "https://chocolateaguila.com/archivos/recetas/receta-1251_torta-de-chocolate-con-dulce-de-leche.jpg",
            titulo: "torta e",
            precio: 15000,
        },
        {
            imagen: "https://chocolateaguila.com/archivos/recetas/receta-1251_torta-de-chocolate-con-dulce-de-leche.jpg",
            titulo: "torta f",
            precio: 15000,
        },
];

const sumarAlCarro = (titulo) => {
    
  
        const producto = Carrito.find(el => {
            return el.titulo === titulo
        })
        producto.cantidad += 1
    
    reloadStore()
}
const restarAlCarro = (titulo) => {
    
    const producto = Carrito.find(el => {
        return el.titulo === titulo
    })
    if(producto.cantidad <=1){
        let arrayDetitulos = Carrito.map(el => {
            return el.titulo
        })
        let index = arrayDetitulos.indexOf(titulo)
        Carrito.splice(index, 1)
    }else{
        producto.cantidad -= 1
    }

reloadStore()
}

const creadoraDeCardsDeCarrito = (titulo, precio, cantidad) => {
    const contenedor = document.createElement("div") 
    const tituloDOM = document.createElement("h3")
    const precioDOM = document.createElement("p")
    const contenedorCantidad = document.createElement("div")
    const cantidadDOM = document.createElement("p")
    const botonPlusDOM = document.createElement("button")
    const botonMinumDOM = document.createElement("button")

    contenedor.classList.add("contenedor")
    tituloDOM.classList.add("titulo")
    precioDOM.classList.add("precio")
    cantidadDOM.classList.add("cantidad")

    tituloDOM.innerText = titulo
    precioDOM.innerText = precio
    cantidadDOM.innerText = cantidad
    botonPlusDOM.innerText = "+"
    botonMinumDOM.innerText = "-"
    
    botonPlusDOM.addEventListener("click", ()=>{
        sumarAlCarro(titulo)
    })
    botonMinumDOM.addEventListener("click", ()=>{
        restarAlCarro(titulo)
    })

    contenedorCantidad.appendChild(botonMinumDOM)
    contenedorCantidad.appendChild(cantidadDOM)
    contenedorCantidad.appendChild(botonPlusDOM)

    contenedor.appendChild(tituloDOM)
    contenedor.appendChild(precioDOM)
    contenedor.appendChild(contenedorCantidad)

    return contenedor
}

const reloadStore = () => {
    carrito.innerText = ""

    const totalDOM = document.createElement("h3")

    const total = Carrito.reduce((acc, el)=>{
        return acc + el.cantidad * el.precio
    },0)

    totalDOM.innerText = total

    Carrito.forEach(el =>{
        carrito.appendChild(creadoraDeCardsDeCarrito(el.titulo, el.precio, el.cantidad))
        carrito.appendChild(totalDOM)
    })
    localStorage.setItem("carrito", JSON.stringify(Carrito))
}


const agregarAlCarro = (titulo, precio) => {
    const booleano = Carrito.some(el => {
        return el.titulo === titulo
    })
    if(booleano){
        const producto = Carrito.find(el => {
            return el.titulo === titulo
        })
        producto.cantidad += 1
    }else{
        Carrito.push({
            titulo,
            precio,
            cantidad: 1
        } )
    }
    reloadStore()
}

const creadoraDeCards = (titulo, imagen, precio) => {
    const contenedor = document.createElement("div") 
    const tituloDOM = document.createElement("h3")
    const imagenDOM = document.createElement("img")
    const precioDOM = document.createElement("p")
    const botonDOM = document.createElement("button")

    contenedor.classList.add("contenedor")
    tituloDOM.classList.add("titulo")
    imagenDOM.classList.add("imagen")
    precioDOM.classList.add("precio")
    botonDOM.classList.add("boton")

    tituloDOM.innerText = titulo
    precioDOM.innerText = "$" + precio
    botonDOM.innerText = "Comprar"

    imagenDOM.src = imagen

    botonDOM.addEventListener("click", ()=>{
        agregarAlCarro(titulo, precio)
    })

    contenedor.appendChild(tituloDOM)
    contenedor.appendChild(imagenDOM)
    contenedor.appendChild(precioDOM)
    contenedor.appendChild(botonDOM)

    return contenedor
}

Productos.forEach(el =>{
    const productoDOM = creadoraDeCards(el.titulo, el.imagen, el.precio)

    productos.appendChild(productoDOM)
})

document.addEventListener("DOMContentLoaded", ()=>{
    reloadStore()
})

