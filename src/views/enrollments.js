export async function renderEnrollments(main) {
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
}