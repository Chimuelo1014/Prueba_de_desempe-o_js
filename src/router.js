import { renderLogin } from "./views/login.js";
import { renderRegister } from "./views/register.js";
import { renderDashboard } from "./views/admin/dashboard.js";
import { renderHome } from "./views/home.js";
import { renderEnrollments } from "./views/enrollments.js";
import { render404} from "./views/not-found.js";

const router = {
    "/" : renderLogin,
    "/register" : renderRegister,
    "/dashboard" : renderDashboard,
    "/home" : renderHome,
    "/enrollments" : renderEnrollments,
    "/notFound" : render404
};

const rutasPrivadas = ["/dashboard"];

export function initRouter() {
  function handleRoute() {
    const path = location.hash.slice(1) || "/";
    const main = document.getElementById("contentMain"); 
    const vista = router[path];

    const usuario = localStorage.getItem("user");

    // Si la ruta es privada y no hay sesión
    if (rutasPrivadas.includes(path) && !usuario) {
      location.hash = "#/";
      return;
    }

    // Si existe la vista, la renderiza
    if (vista) {
      vista(main);
    } else {
      render404(main);
    }
  }

  // Eventos
  window.addEventListener("hashchange", handleRoute);
  window.addEventListener("DOMContentLoaded", handleRoute);
}

