// ============================================
// МИНИМАЛЬНЫЙ JS ДЛЯ ФОРМЫ (РАБОТАЕТ С ПЕРЕАДРЕСАЦИЕЙ)
// ============================================

const form = document.querySelector('.contact-form');
const requestTypeSelect = form.querySelector('[name="request-type"]');
const subjectInput = form.querySelector('[name="_subject"]');
const submitBtn = form.querySelector('button[type="submit"]');
const conditionalFields = form.querySelectorAll('[data-show-for]');

// 1. Условная логика полей
function updateFieldVisibility() {
    const selectedType = requestTypeSelect.value;
    
    conditionalFields.forEach(field => {
        const showFor = field.getAttribute('data-show-for');
        if (showFor === selectedType) {
            field.style.display = '';
            field.removeAttribute('disabled');
        } else {
            field.style.display = 'none';
            field.setAttribute('disabled', 'disabled');
        }
    });
}

requestTypeSelect.addEventListener('change', updateFieldVisibility);
updateFieldVisibility();

// 2. Динамическая тема письма
requestTypeSelect.addEventListener('change', function() {
    if (this.value === 'booking') {
        subjectInput.value = '🎸 Заявка на букинг VERRONA';
    } else if (this.value === 'merch') {
        subjectInput.value = '🛍 Заказ мерча VERRONA';
    } else {
        subjectInput.value = 'Новая заявка VERRONA';
    }
});

// 3. Блокировка кнопки + валидация
form.addEventListener('submit', function(e) {
    // Клиентская валидация email
    const email = form.querySelector('[name="email"]').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        e.preventDefault();
        
        // Определяем язык по URL или localStorage
        const isEnglish = window.location.pathname.includes('-en') || 
                         localStorage.getItem('verrona-lang') === 'en';
        
        alert(isEnglish 
            ? 'Please enter a valid email address' 
            : 'Пожалуйста, введите корректный email');
        return false;
    }
    
    // Блокируем кнопку
    const isEnglish = window.location.pathname.includes('-en');
    submitBtn.disabled = true;
    submitBtn.textContent = isEnglish ? 'Sending...' : 'Отправка...';
});