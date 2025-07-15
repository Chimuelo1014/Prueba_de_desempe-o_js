import { obtenerUsuario } from "../utils/auth.js";

export async function renderHome(main) {
    const userAvatar1 = obtenerUsuario();
    main.innerHTML = `
    <main>
        <div class="sidebar">
            <h4 class="text-center">Events</h4>
            <div class="d-flex align-items-center gap-3 containerAvatar">
                <img id="userProfilePic" class="rounded-circle imagenAvatar" width="100" height="100"" src="https://i.pravatar.cc/150?img=5" alt="avatar">
                <h2>${userAvatar1.name}</h2>
            </div>
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
    const randomId = Math.floor(Math.random() * 70) + 1;
    document.getElementById("userProfilePic").src = `https://i.pravatar.cc/150?img=${randomId}`;

    const url = "http://localhost:3000/events"
    const url_registrados = "http://localhost:3000/registrados"
    const celda = document.getElementById('celda');
    const res = await fetch(`${url}`)
    const data = await res.json();
    data.forEach(event => {
        contador(event.id,event.capacidad);
        celda.innerHTML += `<tr>
          <td class="celda-titulo">${event.tittle}</td>
          <td class="celda-contenido">${event.contenido}</td>
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
        if (counter === Number(capacidad) || Number(capacidad) === 0) {
            botonEnroll.style.setProperty("background-color", "grey", "important");
            botonEnroll.style.setProperty("cursor", "not-allowed", "important");
            botonEnroll.disabled = true;
            botonEnroll.textContent = "Sold Out ";
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



