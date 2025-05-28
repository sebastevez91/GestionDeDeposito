document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.sidebar nav ul li a');
    const pageSections = document.querySelectorAll('.page-section');
    const mainContent = document.querySelector('.main-content');

    // Función para cambiar de página
    function showPage(pageId) {
        pageSections.forEach(section => {
            section.classList.remove('active');
        });
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            mainContent.scrollTop = 0; // Scroll to top of new page
        }

        // Actualizar link activo en el sidebar
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.dataset.page === pageId) {
                link.classList.add('active-link');
            }
        });
    }

    // Manejadores de eventos para la navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const pageId = this.dataset.page;
            showPage(pageId);
        });
    });

    // Función global para navegar (usada por botones dentro de las páginas)
    window.navigateTo = function(pageId) {
        showPage(pageId);
    }

    // Mostrar la página por defecto (dashboard) al cargar
    showPage('dashboard');

    // Simulación de envío de formularios
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const formId = this.id;
            let message = "Datos guardados (simulación).";
            if (formId === "form-producto") {
                message = "Producto guardado (simulación).";
                // Opcional: limpiar formulario
                // this.reset();
                // Opcional: navegar a la lista
                // showPage('productos-lista');
            } else if (formId === "form-movimiento") {
                message = "Movimiento registrado (simulación).";
            } else if (formId === "form-usuario") {
                message = "Usuario guardado (simulación).";
            }
            alert(message);
        });
    });

    // Simulación de logout
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            alert('Sesión cerrada (simulación). Redirigiendo a Login...');
            // En una app real, aquí redirigirías a una página de login.
            // Para este prototipo, podrías simplemente volver al dashboard o no hacer nada.
            // window.location.href = "login.html"; // Si tuvieras una página de login
        });
    }

});