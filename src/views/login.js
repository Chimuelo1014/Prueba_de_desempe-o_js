import { guardarUsuario } from "../utils/auth.js";

export function renderLogin(main) {
    main.innerHTML = `
        <nav class="navbar navbar-expand-lg bg-white border-bottom">
            <div class="container-fluid">
              <a class="navbar-brand" href="#">Events</a>
            </div>
          </nav>
      
          <div class="container loginFormContainer">
            <div class="row justify-content-center">
              <div class="col-md-8 col-lg-5">
                <!-- TÍTULO -->
                <h2 class="text-center fw-bold mb-4">Login</h2>
      
                <form id="loginForm">
                  <div class="mb-3">
                    <input type="text" class="form-control input-thick" id="email" placeholder="Email" required>
                  </div>
                  <div class="mb-4">
                    <input type="password" class="form-control input-thick" id="password" placeholder="Password" required>
                  </div>
                  <button type="submit" class="btn btn-primary w-100 fw-semibold btn-" style="background-color:rgb(131, 59, 246); border: none;">
                    Sign In
                  </button>
                  <div id="mensaje" class="mt-3"></div>
                </form>
      
                <p class="text-center text-muted mt-3">
                  Don’t have an account? <a href="#/register" class="text-decoration-none">Register</a>
                </p>
              </div>
            </div>
          </div>
  `;


    const form = document.getElementById("loginForm");
    const mensaje = document.getElementById("mensaje");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const input = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!input || !password) {
            mensaje.innerHTML = `<div class="alert alert-warning">Completa todos los campos.</div>`;
            return;
        }

        try {
            const url = "http://localhost:3000/users";
            const res = await fetch(`${url}?q=${input}`);
            const datos = await res.json();


            const user = datos.find(
                u => (u.email === input) && u.password === password);

            if (!user) {
                mensaje.innerHTML = `<div class="alert alert-danger">Credenciales incorrectas</div>`;
                return;
            }
            setTimeout(() => {
                guardarUsuario(user);
            }, 2000);
            user.role === "admin" ? location.hash = "#/dashboard" : location.hash = "#/home";



        } catch (err) {
            mensaje.innerHTML = `<div class="alert alert-danger">Error al conectar con el servidor</div>`;
        }
    });
}

