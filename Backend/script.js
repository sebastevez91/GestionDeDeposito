document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.sidebar nav ul li a');
  const pageSections = document.querySelectorAll('.page-section');
  const mainContent = document.querySelector('.main-content');
  const logoutLink = document.getElementById('logout-link');
  const loginForm = document.getElementById('login-form');

  // -------------------------------
  // Navegación entre secciones
  // -------------------------------
  function showPage(pageId) {
    pageSections.forEach(section => section.classList.remove('active'));
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active');
      if (mainContent) mainContent.scrollTop = 0;
    }

    navLinks.forEach(link => {
      link.classList.remove('active-link');
      if (link.dataset.page === pageId) {
        link.classList.add('active-link');
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const pageId = this.dataset.page;
      showPage(pageId);
    });
  });

  // Función global para navegación desde botones
  window.navigateTo = function (pageId) {
    showPage(pageId);
  };

  // Mostrar "dashboard" por defecto si existe
  if (document.getElementById('dashboard')) {
    showPage('dashboard');
  }

  // -------------------------------
  // Envío de formularios (simulado)
  // -------------------------------
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const formId = this.id;
      let message = "Datos guardados (simulación).";
      if (formId === "form-producto") {
        message = "Producto guardado (simulación).";
      } else if (formId === "form-movimiento") {
        message = "Movimiento registrado (simulación).";
      } else if (formId === "form-usuario") {
        message = "Usuario guardado (simulación).";
      }
      alert(message);
    });
  });

  // -------------------------------
  // Logout simulado
  // -------------------------------
  if (logoutLink) {
    logoutLink.addEventListener('click', function (event) {
      event.preventDefault();
      alert('Sesión cerrada (simulación). Redirigiendo a Login...');
      // Podés redirigir al login.html si lo tenés
      // window.location.href = "login.html";
    });
  }

  // -------------------------------
  // Login real con fetch al backend
  // -------------------------------
  if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const nombre_usuario = document.getElementById('usuario').value;
      const password = document.getElementById('password').value;

      try {
        const res = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre_usuario, password })
        });

        const data = await res.json();

        if (res.ok) {
          alert('Login exitoso ✅');
          // Redirigir a dashboard o sección principal
          if (window.navigateTo) {
            navigateTo('dashboard');
          } else {
            // Alternativa si usás otra página:
            // window.location.href = 'dashboard.html';
          }
        } else {
          alert('Error: ' + data.error);
        }
      } catch (err) {
        alert('Error de conexión con el servidor.');
      }
    });
  }
});
