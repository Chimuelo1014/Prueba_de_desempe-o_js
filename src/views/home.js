
export async function renderHome(main) {
    main.innerHTML = `
    <main>
        <div class="sidebar">
            <h4 class="text-center">Events</h4>
            <hr class="text-light">
            <a href="#/enrollments" class="eventsBoton"><i class="bi bi-bookmark-fill"></i></i> Enrollments</a>
            <a href="#/home" class="eventsBoton"><i class="bi bi-mortarboard "></i> Events</a>
            <!-- Esto es un simple enlace. No "cierra sesión" realmente sin JS -->
            <a href="" id="closeSession"><i class="bi bi-box-arrow-left"></i> Cerrar sesión</a>
        </div>

        <div class="content">
            
        
            <table class="table">
                <thead>
                    <tr>
                            
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Capacity</th>
                        <th scope="col">Date</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        
                    </tr>
                </thead>
            <tbody id="celda"></tbody>
        </div>
    </main>

    `;
    const url = "http://localhost:3000/events"
    const url_registrados = "http://localhost:3000/registrados"
    const celda = document.getElementById('celda');
    const res = await fetch(`${url}`)
    const data = await res.json();
    data.forEach(event => {
        contador(event.id,event.capacidad);
        celda.innerHTML += `<tr>
          <td>${event.tittle}</td>
          <td>${event.contenido}</td>
          <td>${event.capacidad}</td>
          <td>${event.fecha}</td>
          <td>
          <img class="imagenEvento" src="${event.imagen}" alt="Imagen del evento"></img>
          </td>

          <td>
                <button class="btn btn-success botonAgreagardash" id="enroll${event.id}">enrroll</button>
          </td>
        </tr>
        `;
        setTimeout(() => {
            const botonEnroll = document.getElementById(`enroll${event.id}`);
            if (botonEnroll) {
                botonEnroll.addEventListener("click", () => agregar(event.id));
            }
        });


    });
    async function contador(id,capacidad) {
        const res = await fetch(`${url_registrados}?eventId=${id}`);
        const data = await res.json();
        const counter = data.length;
        const botonEnroll = document.getElementById(`enroll${id}`);
        if (counter === Number(capacidad)) {
            botonEnroll.style.backgroundColor = "grey";
        }
        
    }


    async function agregar(id) {
        localStorage.getItem("user")
        const user = JSON.parse(localStorage.getItem("user"))
        console.log(user);
        
        const eventId = id;
        
        
        const res = await fetch(`${url_registrados}?userId=${user.id}&eventId=${eventId}`);
        const exists = await res.json();
        if (exists.length > 0) {
            alert("Ya estás registrado en este evento");
            return;

        }
        await fetch(`${url_registrados}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: user.id,
                eventId: eventId
            })
        });
       

    }
}



