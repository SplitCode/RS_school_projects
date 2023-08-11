console.log('Выполненные пункты:\n1) Вёрстка соответствует макету - +26\n2) Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется - +12\nНа ширине экрана 768рх реализовано адаптивное меню - +12')

console.log('Сумма баллов - 50');

const burger = document?.querySelector('.burger-menu');
const nav = document?.querySelector('.nav-menu');
const navItems = document?.querySelector('.nav-link');
const body = document.body;


burger?.addEventListener('click', () => {
    // body.classList.toggle('stop-scroll');
    burger?.classList.toggle('cross');
    nav?.classList.toggle('open');
});

body?.addEventListener('click', function(e) {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
        burger.classList.remove('cross');
        nav.classList.remove('open');
    }
});

navItems?.addEventListener('click', () => {
    // body.classList.remove('stop-scroll');
    burger?.classList.remove('cross');
    nav?.classList.remove('open');
});
