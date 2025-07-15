import { guardarUsuario } from "../utils/auth.js";
export function renderRegister(main) {
  main.innerHTML = `
    <nav class="navbar navbar-expand-lg bg-white border-bottom">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Events</a>
      </div>
    </nav>

    <div class="container py-5">
      <div class="row align-items-center justify-content-center">
        <!-- FORM SECTION -->
        <div class="col-md-6 col-lg-5">
          <h2 class="fw-bold text-center mb-4">Register</h2>
          <form id="register">
            <div class="mb-3">
              <label class="form-label">Full Name</label>
              <input type="text" id="fullName" class="form-control" placeholder="Enter your full name">
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" id="email" placeholder="Enter your email">
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input type="password" class="form-control" id="password" placeholder="Choose a username">
            </div>
            <div class="mb-4">
              <label class="form-label">Confirm Password</label>
              <input type="password" class="form-control" id="confirmPassword" placeholder="Create a password">
            </div>
            <button type="submit" class="btn btn-primary w-100 fw-semibold btn-" style="background-color:rgb(131, 59, 246); border: none;">
                    Register
                  </button>
            <div id="mensaje" class="mt-3"></div>
          </form>
          <p class="text-center text-muted mt-2">
            Already have an account? <a href="#/" class="text-decoration-none">Sign in</a>
          </p>
        </div>


      </div>
    </div>
  `;

  // Evento de toggle de tema si usas modo oscuro
  const form = document.getElementById("register");
  const mensaje = document.getElementById("mensaje");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const role = "comun"
    const password = document.getElementById("password").value;

    if (!fullName || !email || !confirmPassword || !password) {
      mensaje.innerHTML = `<div class="alert alert-warning">Por favor completa todos los campos.</div>`;
      return;
    }
    if (password!==confirmPassword) {
        mensaje.innerHTML = `<div class="alert alert-warning">La contraseña no coincide</div>`;
        return;
    }

    const [name, ...lastArr] = fullName.split(" ");
    const lastName = lastArr.join(" ");

    try {
      const url = "http://localhost:3000/users";
      const resEmail = await fetch(`${url}?email=${email}`);
      const existeEmail = await resEmail.json();

      if (existeEmail.length > 0) {
        mensaje.innerHTML = `<div class="alert alert-danger">Este email ya esta registrado.</div>`;
        return;
      }

      const newUser = {
        name,
        lastName,
        email,
        password,
        role
      };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });

      if (!res.ok) throw new Error("Error al guardar el usuario.");

      mensaje.innerHTML = `<div class="alert alert-success">Registro exitoso. Redirigiendo...</div>`;
      setTimeout(() => {
        guardarUsuario(user);
        location.hash = "#/home";
      }, 2000);
    } catch (err) {
      mensaje.innerHTML = `<div class="alert alert-danger">Error de conexión con el servidor.</div>`;
    }
  });
}
