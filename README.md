🗓 EventosApp - Gestión de Eventos (SPA)
Aplicación web tipo SPA desarrollada con JavaScript Vanilla, HTML5, CSS3 y Bootstrap, que permite a usuarios registrarse, iniciar sesión y participar en eventos, con un sistema de roles (administrador y visitante) y operaciones CRUD sobre eventos usando una base de datos simulada con json-server.

---

✨ Funcionalidades principales
🔐 Sistema de autenticación con roles (admin y visitor)
📌 Rutas protegidas según el rol y estado de sesión
🧠 Persistencia de sesión con localStorage
📅 CRUD completo de eventos para administradores
👥 Registro de visitantes a eventos disponibles
🎨 Tema claro/oscuro con persistencia
📡 Sincronización en tiempo real con json-server

---

🛠 Tecnologías usadas
JavaScript (ES6+)
HTML5 & CSS3
Bootstrap 5
json-server
Postman (para pruebas)
LocalStorage
SPA Router manual

---

🚀 Cómo ejecutar el proyecto
Clonar el repositorio
```bash
git clone https://github.com/Chimuelo1014/Prueba_de_desempe-o_js.git
cd eventos-app
Instalar json-server (si no lo tienes)
npm install -g json-server
Ejecutar el servidor json-server
json-server --watch db.json --port 3000
👉 Esto habilita el backend falso en: http://localhost:3000/

Abrir el proyecto
Abre index.html con Live Server o simplemente doble clic para abrir en el navegador.

📁 Estructura del proyecto

eventos-app/
├── index.html
├── db.json
├── README.md
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   ├── utils/
│   └── router.js
└── main.js
👤 Información del coder

Nombre completo: Samuel Quintero
Clan: Clan Ritchie
Correo: quinterosanchezsamuel1@gmail.com
Documento: 1025890263
🧪 Pruebas con Postman


Puedes probar las rutas de la API json-server como si fueran reales.

📦 Rutas útiles:
Usuarios

GET http://localhost:3000/users
POST http://localhost:3000/users
Eventos

GET http://localhost:3000/events
POST http://localhost:3000/events
PUT http://localhost:3000/events/:id
DELETE http://localhost:3000/events/:id
Registro a eventos (opcional)

POST http://localhost:3000/registrations
GET http://localhost:3000/registrations?userId=1
📥 Cómo importar la colección de Postman
Abre Postman
Clic en Import
Selecciona el archivo postman_collection.json (te lo paso si quieres)
Ejecuta las peticiones contra http://localhost:3000/
✅ Requisitos cumplidos

 SPA con rutas protegidas por autenticación y roles
 json-server como backend simulado
 CRUD completo para eventos
 Registro e inicio de sesión funcional
 Registro de visitantes a eventos
 Persistencia de sesión y tema
 Vistas separadas por rol
 Código modular, comentado y organizado
📎 Notas

Usuario administrador por defecto en db.json
La aplicación se comporta distinto según el tipo de usuario
Incluye botón de logout y selector de tema persistente