/* ========== MENU SHOW ========== */
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

// show menu
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

//hide menu
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

/* ========== REMOVE MENU MOBILE ========== */
const navLink = document.querySelectorAll(".nav-link");

function linkAction() {
  // when click on each nav link, we remove the show-menu class
  navMenu.classList.remove('show-menu');
}
navLink.forEach(link => link.addEventListener('click', linkAction));

/* ========== HTML & CSS PROJECTS SWIPER ========== */
let swiper = new Swiper(".services-container", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});