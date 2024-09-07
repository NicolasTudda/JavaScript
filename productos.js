const shopContent = document.getElementById("shopContent")
const productos = [
{   id: 1,
    nombre: "torta a",
    precio: 15000,
    img: "https://media.diariouno.com.ar/p/a8844ba478893e5f872e0863fba5d155/adjuntos/298/imagenes/009/338/0009338643/1200x0/smart/la-mejor-torta-cumpleanospng.png",
},
{   id: 2,
    nombre: "torta b",
    precio: 15000,
    img: "https://media.diariouno.com.ar/p/a8844ba478893e5f872e0863fba5d155/adjuntos/298/imagenes/009/338/0009338643/1200x0/smart/la-mejor-torta-cumpleanospng.png",
},
{   id: 3,
    nombre: "torta c",
    precio: 15000,
    img: "https://media.diariouno.com.ar/p/a8844ba478893e5f872e0863fba5d155/adjuntos/298/imagenes/009/338/0009338643/1200x0/smart/la-mejor-torta-cumpleanospng.png",
},
{   id: 4,
    nombre: "torta d",
    precio: 15000,
    img: "https://media.diariouno.com.ar/p/a8844ba478893e5f872e0863fba5d155/adjuntos/298/imagenes/009/338/0009338643/1200x0/smart/la-mejor-torta-cumpleanospng.png",
},];

let carrito = [];

productos.forEach((product)=>{
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price">${product.precio} $</p>
    `;

    shopContent.append(content)

    let comprar = document.createElement("button")
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.append(comprar)
});

