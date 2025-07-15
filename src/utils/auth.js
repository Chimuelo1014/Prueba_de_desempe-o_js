// utils/auth.js

// ¿Está logueado?
export function estaLogueado() {
    const usuario = localStorage.getItem("usuario");
    if (usuario !== null) {
      return true;
    } else {
      return false;
    }
  }
  //TAMBIEN SE PODRIA HACER CON ESTO !! QUE VUELVE VALORES A TRUE O FALSE
  // export function estaLogueado() {
  //   return !!localStorage.getItem("usuario");
  // }
  // Devuelve true si hay algo guardado (por ejemplo "admin")
  
  // Devuelve false si el valor es null
  
  // Guardar usuario al hacer login
  export function guardarUsuario(usuario) {
    const convertido = JSON.stringify(usuario)
    localStorage.setItem("usuario", convertido);
  }
  
  // Obtener usuario actual
  export function obtenerUsuario() {
    return localStorage.getItem("usuario");
  }
  
  // Cerrar sesión
  export function cerrarSesion() {
    localStorage.removeItem("usuario");
    location.hash = "#/";
  }
  