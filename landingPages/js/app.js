/*=============== SHOW MENU ===============*/
const navMenu = document.querySelector('.nav__menu'),
  navToggle = document.querySelector('.nav__toggle'),
  navClose = document.querySelector('.nav__close');

// בדיקה אם קיים
if(navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  })
}

if(navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  })
}