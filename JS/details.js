const linkData = "https://aulamindhub.github.io/amazing-api/events.json"

let eventos = []
let filtrados = []

fetch(linkData)
    .then(response => response.json())
    .then(data => {
        eventos = data.events

        function pintarDetails(tarjeta) {
            let detalles = document.createElement("div");
            detalles.className = 'card m-5" style="max-width: 1200px;';
            detalles.innerHTML = `
            <div class="row g-0">
                <div class="col-lg-5 p-3">
                    <img src="${tarjeta.image}"
                    class="img-fluid rounded-start m_2" alt="">
                </div>
                <div class="col-lg-5">
                    <div class="card-body">
                        <h5 class="card-title">${tarjeta.name}</h5>
                        <p class="card-text">${tarjeta.description}</p>
                        <p class="card-text">Date: ${tarjeta.date}.</p>
                        <p class="card-text">Category: ${tarjeta.category}.</p>
                        <p class="card-text">Place: ${tarjeta.place}.</p>
                        <p class="card-text">Capacity: ${tarjeta.capacity}.</p>
                        <p class="card-text">${tarjeta.assistance == undefined ? `Estimate: ${tarjeta.estimate}.` : `Assistance: ${tarjeta.assistance}.`}</p>
                        <h5 class="card-title">Price: ${tarjeta.price}$</h5>
                    </div>
                </div>
            </div>`
            padreDetails.appendChild(detalles);
        }

        let padreDetails = document.getElementById("padreDetails")

        let urlDetails = new URL(window.location.href).searchParams.get('value')

        filtrados = eventos.filter(element => element._id == urlDetails)

        pintarDetails(filtrados[0])
    })