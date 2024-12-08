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

