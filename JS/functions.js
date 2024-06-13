export let divPadre = document.getElementById("divPadre")

export function pintarTarjeta(divPadre, array) {
    divPadre.innerHTML = ""
    for (let i = 0; i < array.length; i++) {
        crearTarjeta(divPadre, array[i]);
    }
}

export function crearTarjeta(divPadre, tarjeta) {
    let nuevaTarjeta = document.createElement("div");
    nuevaTarjeta.className = "col-12-xs card m-3 d-flex flex-column";
    nuevaTarjeta.innerHTML =
        `<div class="card-header p-0 my-2">
                <img style="height: 20vh;" src="${tarjeta.image}" class="object-fit-cover card-img-top img-fluid"> 
        </div>   
        <div class="card-body d-flex flex-column justify-content-between">
                <h5 class="card-title">${tarjeta.name}</h5>
                <p>${tarjeta.description}</p> 
                <h6>Capacity: ${tarjeta.capacity}</h6>
                <h6>Price: ${tarjeta.price}$</h6>
                <a href="./details.html?value=${tarjeta._id}" class="btn btn-primary">See Details</a>
        </div>`;
    divPadre.appendChild(nuevaTarjeta);
}

export function crearCheckbox(divPadre, caja) {
    for (let i = 0; i < caja.length; i++) {
        let box = document.createElement("div");
        box.className = "form-check form-check-inline";
        box.innerHTML =
            `<input class="form-check-input" type="checkbox" value='${caja[i]}'>
    <label class="form-check-label">${caja[i]}</label>`;
        divPadre.appendChild(box);
    }
}

export let categorias = []

export function filtrarCategorias(eventos, categorias) {
    eventos.forEach(e => {
        if (!categorias.includes(e.category)) {
            categorias.push(e.category)
        }
    })
}

export let padreCheckbox = document.getElementById("divCheckBox")

export function checkBoxs(padreCheckbox, eventos) {
    padreCheckbox.addEventListener('change', (event) => {

        let filtradosBox = eventos;

        let array = document.querySelectorAll('input[type=checkbox]:checked');

        if (array.length != 0) {
            filtradosBox = filtrarCheck(array, eventos);
        }

        let texto = document.getElementById("busqueda").value;

        if (texto != "") {
            filtradosBox = filtrarText(texto, filtradosBox)
        }

        pintarTarjeta(divPadre, filtradosBox);
    });
}

export let buscar = document.getElementById("busqueda")

export function textBox(buscar, eventos) {
    buscar.addEventListener('input', (event) => {

        let array = document.querySelectorAll('input[type=checkbox]:checked');

        let texto = document.getElementById("busqueda").value;

        let filtradosSearch = filtrarText(texto, eventos);

        if (array.length != 0) {
            filtradosSearch = filtrarCheck(array, filtradosSearch)
        }

        if (filtradosSearch != "") {
            pintarTarjeta(divPadre, filtradosSearch);
        } else {
            divPadre.innerHTML = `
        <div class = "d-flex flex-column justify-content-center align-items-center w-50">
        <h1>No results found</h1>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/007/104/553/small_2x/search-no-result-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg" alt="">
        </div>
        `
        }
    })
}

export function filtrarCheck(array, events) {
    array = Array.from(array);
    array = array.map(checkbox => checkbox.value);
    let filtradosBox = events.filter(objeto => array.includes(objeto.category));
    return filtradosBox;
}

export function filtrarText(texto, array) {
    let filtradosSearch = array.filter(e => e.name.toLowerCase().includes(texto.toLowerCase()));
    return filtradosSearch;
}

export function page(functionModule, eventos) {
    pintarTarjeta(divPadre, eventos)

    filtrarCategorias(eventos, functionModule.categorias);

    checkBoxs(functionModule.padreCheckbox, eventos)

    textBox(functionModule.buscar, eventos)

    crearCheckbox(functionModule.padreCheckbox, functionModule.categorias);
}