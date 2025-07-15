import { obtenerUsuario } from "../utils/auth.js";
export async function renderEnrollments(main) {
    const userAvatar = obtenerUsuario();
    main.innerHTML = `
    <main>
        <div class="sidebar">
            <h4 class="text-center">Events</h4>
            <div class="d-flex align-items-center gap-3 containerAvatar">
                <img id="userProfilePic" class="rounded-circle imagenAvatar" width="100" height="100"" src="https://i.pravatar.cc/150?img=5" alt="avatar">
                <h2>${userAvatar.name}</h2>
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
    const url = "http://localhost:3000/users";
    const url_events = "http://localhost:3000/events";
    const url_registradas = "http://localhost:3000/registrados";
    const user = obtenerUsuario();
    const registrados = buscarEnRegistrados(user.id);

    async function buscarEnRegistrados(id) {
        const res = await fetch(`${url_registradas}?userId=${id}`);
        const data = await res.json();
        if (data.length > 0) {
            const celda = document.getElementById('celda');

            data.forEach(event => {
                tin(event);

            });


        }
        else {
            console.log("nadabro");
            return;
        }
        async function tin(event) {
            const idEvent = event.eventId;
            const resEvent = await fetch(`${url_events}?id=${idEvent}`);
            const dataEvent = await resEvent.json();
                dataEvent.forEach(evento => {
                     celda.innerHTML += `
                    <tr>
                        <td class="celda-titulo">${evento.tittle}</td>
                        <td class="celda-titulo">${evento.contenido}</td>
                        <td>${evento.capacidad}</td>
                        <td>${evento.fecha}</td>
                        <td>
                            <img class="imagenEvento" src="${evento.imagen}" alt="Imagen del evento"></img>
                        </td>
                    </tr>
                `
                });
            
           

        }


    }
};