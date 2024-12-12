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

/* ========== SCROLL SECTIONS ACTIVE LINK ========== */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.scrollY || window.pageYOffSet;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(`.nav-menu a[href*=${sectionId}]`).classList.add('active-link');
    } else {
      document.querySelector(`.nav-menu a[href*=${sectionId}]`).classList.remove('active-link');
    }
  });
}

window.addEventListener('scroll', scrollActive);

/* ========== CHANGE BACKGROUND HEADER ========== */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('header');
  if (this.scrollY >= 80)
    nav.classList.add('scroll-header');
  else
    nav.classList.remove('scroll-header');
});

/* ========== SHOW SCROLL Up ========== */
window.addEventListener('scroll', () => {
  const scrollUp = document.getElementById("scroll-up");
  if (this.scrollY >= 560)
    scrollUp.classList.add("show-scroll");
  else
    scrollUp.classList.remove("show-scroll");
});

/*================ DARK LIGHT THEME ================*/
const themeBtn = document.getElementById("theme-btn");
const darktheme = "dark-theme";
const icontheme = "bx-sun";

// previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// we obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darktheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeBtn.classList.contains(icontheme) ? "bx-moon" : "bx-sun";

// we validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darktheme
  );
  document.body.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    icontheme
  );
}

// Activate / deactivate the theme manually with the button
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle(darktheme);
  // Add or remove the dark / icon theme
  themeBtn.classList.toggle(icontheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*================ CONTACT ME VALIDATION ================*/
const name = document.getElementById("name"),
  email = document.getElementById("email"),
  phone = document.getElementById("phone"),
  msg = document.getElementById("msg");

function isFieldValid() {
  if (name.value !== "" && email.value !== "" && phone.value !== "" && msg.value !== "")
    document.getElementById("contact-btn").disabled = false;
  else
    document.getElementById("contact-btn").disabled = true;
}

document.getElementById("contact-btn").addEventListener('click', () => {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("msg").value = "";

  alert("The form has been sent successfully");
})


