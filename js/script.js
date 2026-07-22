// Скрипт отключения анимации при повторной загрузке
if (sessionStorage.getItem('logoAnimated')) {
    document.querySelector('.logo').style.animation = 'none';
    document.querySelector('.logo').style.opacity = '1';
} else {
    sessionStorage.setItem('logoAnimated', 'true');
}


// ============================================
// БУРГЕР-МЕНЮ
// ============================================

const burgerBtn = document.getElementById('burger-btn');
const navContainer = document.getElementById('nav-mobile-container');

// Открытие/закрытие меню
burgerBtn.addEventListener('click', function() {
    burgerBtn.classList.toggle('active');
    navContainer.classList.toggle('active');
    document.body.style.overflow = navContainer.classList.contains('active') ? 'hidden' : '';
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-mobile-container .nav-link').forEach(link => {
    link.addEventListener('click', function() {
        burgerBtn.classList.remove('active');
        navContainer.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Закрытие меню при клике вне его
document.addEventListener('click', function(e) {
    if (!navContainer.contains(e.target) && !burgerBtn.contains(e.target) && navContainer.classList.contains('active')) {
        burgerBtn.classList.remove('active');
        navContainer.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Закрытие меню при изменении размера окна (если пользователь повернул телефон)
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navContainer.classList.contains('active')) {
        burgerBtn.classList.remove('active');
        navContainer.classList.remove('active');
        document.body.style.overflow = '';
    }
});