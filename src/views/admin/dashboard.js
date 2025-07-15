
import { cerrarSesion } from "../../utils/auth.js";
export async function renderDashboard(main) {
    main.innerHTML = `
    <main>
        <div class="sidebar">
            <h4 class="text-center">Events</h4>
            <hr class="text-light">
            <a href="#/dashboard" class="eventsBoton"><i class="bi bi-mortarboard "></i> Events</a>
            <!-- Esto es un simple enlace. No "cierra sesión" realmente sin JS -->
            <a href="" id="closeSession"><i class="bi bi-box-arrow-left"></i> Cerrar sesión</a>
        </div>

        <div class="content">
            <button type="button" class="btn btn-success botonAgreagardash" data-bs-toggle="modal" data-bs-target="#exampleModal">
        agregar
        </button>
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Agregar Nuevo evento</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form class="needs-validation">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Titulo</label>
                    <input type="text" class="form-control" id="name" aria-describedby="emailHelp" required>

                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Contenido</label>
                    <input type="text" class="form-control" id="conten" required>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Capacidad</label>
                    <input type="Number" class="form-control" id="capacidad" required>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Fecha</label>
                    <input type="date" class="form-control" id="fecha" required>
                </div>                
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Imagen</label>
                    <input type="url" class="form-control" id="imagen" required>
                </div>  
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cerrar</button>
                <button id="add" type="button" class="btn btn-primary">enviar</button>
            </div>
            </div>
        </div>
        </div> 
        
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
    const celda = document.getElementById('celda');
    const res = await fetch(`${url}`)
    const data = await res.json();
    data.forEach(event => {
        celda.innerHTML += `<tr>
          <td>${event.tittle}</td>
          <td>${event.contenido}</td>
          <td>${event.capacidad}</td>
          <td>${event.fecha}</td>
          <td>
          <img class="imagenEvento" src="${event.imagen}" alt="Imagen del evento"></img>
          </td>

          <td>
               
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal${event.id}">
            Editar
            </button>

            <!-- Modal -->
            <div class="modal fade" id="editModal${event.id}" tabindex="-1" aria-labelledby="editModal${event.id}" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title edit" id="labeledit${event.id}">Editar Usuario</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Nuevo Titulo</label>
                        <input type="text" class="form-control" id="newName${event.id}" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Nuevo Contenido</label>
                        <input type="text" class="form-control" id="newContenido${event.id}">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Nueva Capacidad</label>
                        <input type="number" class="form-control" id="newCapacidad${event.id}">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Nueva Fecha</label>
                        <input type="date" class="form-control" id="newFecha${event.id}">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Nueva Imagen</label>
                        <input type="url" class="form-control" id="newImagen${event.id}">
                    </div>
                    
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cerrar</button>
                    <button id="edit${event.id}" type="button" class="btn btn-primary">enviar</button>
                </div>
                </div>
            </div>
            </div> 
      
            <button id="btnEliminar${event.id}" class="btn btn-danger">eliminar</button>
          </td>
        </tr>
        `;

        setTimeout(() => {
            const botonEditar = document.getElementById(`edit${event.id}`);
            if (botonEditar) {
                botonEditar.addEventListener("click", () => editarUsuario(event.id));
            }
        });
        setTimeout(() => {
            const botonEliminar = document.getElementById(`btnEliminar${event.id}`);
            if (botonEliminar) {
                botonEliminar.addEventListener("click", () => eliminarUsuario(event.id));
            }
        });
    });
    const botonAgregar = document.getElementById('add');

    botonAgregar.addEventListener('click', async (e) => {
        e.preventDefault();
        const inputName = document.getElementById('name').value;
        const inputContenido = document.getElementById('conten').value;
        const inputCapacidad = document.getElementById('capacidad').value;
        const inputFecha = document.getElementById('fecha').value;
        const inputImagen = document.getElementById('imagen').value;
        if (!inputName.trim() || !inputContenido.trim() || !inputCapacidad.trim() || !inputFecha.trim() || !inputImagen.trim()) {
            alert("Campos vacíos");
            return;
        }


        const newNote = {
            tittle: inputName,
            contenido: inputContenido,
            capacidad: inputCapacidad,
            fecha : inputFecha,
            imagen : inputImagen

        };


        const send = await fetch(`${url}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newNote)

        });
        if (!send.ok) {
            alert("Error al crear Nota")
            return;
        }

        location.hash = "#/dashboard";

    });

    async function editarUsuario(id) {
        console.log("Editando usuario:", id);

        const inputNewName = document.getElementById(`newName${id}`).value;
        const inputNewContent = document.getElementById(`newContenido${id}`).value;
        const inputNewCapacidad = document.getElementById(`newCapacidad${id}`).value;
        const inputNewFecha = document.getElementById(`newFecha${id}`).value;
        const inputNewImagen = document.getElementById(`newImagen${id}`).value;
        if (!inputNewName.trim() || !inputNewContent.trim() || !inputNewCapacidad.trim() || !inputNewFecha.trim() || !inputNewImagen.trim()) {
            alert("Campos vacíos");
            return;
        }

        const updateNote = {
            tittle: inputNewName,
            contenido: inputNewContent,
            capacidad: inputNewCapacidad,
            fecha : inputNewFecha,
            imagen : inputNewImagen
        };
        const send = await fetch(`${url}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateNote)
        });
        if (!send.ok) {
            alert("No se pudo actualizar la nota");
            return;
        }
        alert("La nota se actualizo correctamente");
        // Oculta el modal manualmente usando Bootstrap
        const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        modal.hide();

        // Ahora sí renderiza las notas
        renderNotas();


    }

    async function eliminarUsuario(id) {
        const send = await fetch(`${url}/${id}`, {
            method: "DELETE"
        });
        if (!send.ok) {
            alert("No se pudo eliminar la nota");
            return;
        }
        alert("Nota eliminada correctamente");
        const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        modal.hide();
        renderNotas();

    }
    const closeSession = document.getElementById('closeSession');
    closeSession.addEventListener("click", cerrarSesion)
}

