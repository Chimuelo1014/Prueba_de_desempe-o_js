export function applyTheme() {
    const tema = localStorage.getItem("tema") || "light";
    document.body.setAttribute("data-bs-theme", tema);
  }
  
  export function toggleTheme() {
    const temaActual = document.body.getAttribute("data-bs-theme");
    const nuevoTema = temaActual === "light" ? "dark" : "light";
    document.body.setAttribute("data-bs-theme", nuevoTema);
    localStorage.setItem("tema", nuevoTema);
  }
  