document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const themeToggle = document.getElementById('theme-toggle');
    const backToTopButton = document.getElementById('backToTop');
    const formSuccessMessage = document.getElementById('formSuccessMessage');

    // Tema değiştirici durumu yükleme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        let valid = true;

        // İsim doğrulama
        if (!name) {
            showError('nameError', 'İsim boş olamaz.');
            valid = false;
        } else {
            clearError('nameError');
        }

        // Email doğrulama
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email) {
            showError('emailError', 'Email boş olamaz.');
            valid = false;
        } else if (!emailPattern.test(email)) {
            showError('emailError', 'Lütfen geçerli bir email adresi giriniz.');
            valid = false;
        } else {
            clearError('emailError');
        }

        // Mesaj doğrulama
        if (!message) {
            showError('messageError', 'Mesaj boş olamaz.');
            valid = false;
        } else {
            clearError('messageError');
        }

        if (valid) {
            displayMessage(`Teşekkürler, ${name}! Mesajınız alındı.`, 'success');
            formSuccessMessage.classList.add('show');
            form.reset();

            setTimeout(() => {
                formSuccessMessage.classList.remove('show');
            }, 3000);
        }
    });

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }

    function clearError(elementId) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = '';
    }

    function displayMessage(message, type) {
        formSuccessMessage.textContent = message;
        formSuccessMessage.className = `success-message ${type}`;
    }

    themeToggle.addEventListener('click', () => {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
