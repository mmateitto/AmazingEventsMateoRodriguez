const linkData = "https://aulamindhub.github.io/amazing-api/events.json"

fetch(linkData)
    .then(response => response.json())
    .then(data => {
        eventos = data.events

        let masAsistido = eventos.map(e => e.capacity - e.assistance).sort((a, b) => b - a).filter(e => e > 0)

        let dato = eventos.filter(e => e.capacity - e.assistance == masAsistido[0])

        document.getElementById("masAsistido").innerHTML = `<a href="./details.html?value=${dato[0]._id}">${dato[0].name}</a>`

        let menosAsistido = eventos.map(e => e.capacity - e.assistance).sort((a, b) => a - b).filter(e => e > 0)

        let menosAsistidoFiltrado = eventos.filter(e => e.capacity - e.assistance == menosAsistido[0])

        document.getElementById("menosAsistido").innerHTML = `<a href="./details.html?value=${menosAsistidoFiltrado[0]._id}">${menosAsistidoFiltrado[0].name}</a>`

        let masCapacidad = eventos.map(e => e.capacity).sort((a, b) => b - a)

        document.getElementById("masCapacidad").innerHTML = `<a href="./details.html?value=${dato[0]._id}">${dato[0].name}</a>`

        let eventosFuturos = data.events.filter(element => data.currentDate < element.date);

        console.log(data);

        function groupEventsByCategory(events) {
            return events.reduce((acc, event) => {
                if (!acc[event.category]) {
                    acc[event.category] = [];
                }
                acc[event.category].push(event);
                return acc;
            }, {});

        }
        let eventsByCategory = groupEventsByCategory(eventosFuturos);
        console.log(eventsByCategory);
    })