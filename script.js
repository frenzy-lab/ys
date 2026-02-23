window.addEventListener("DOMContentLoaded", () => {
  const logoArea = document.getElementById("logoArea");
  const linksArea = document.getElementById("linksArea");
  const diagLine = document.getElementById("diagLine");

  logoArea.classList.remove("hidden");
  linksArea.classList.remove("hidden");
  logoArea.classList.add("show");
  linksArea.classList.add("show");

  diagLine.classList.add("visible");
});

const hoverSlice = document.querySelector(".hover-slice");

setInterval(() => {
  const top = Math.random() * 80;
  const height = 5 + Math.random() * 15;
  const shift = (Math.random() - 0.5) * 25;

  hoverSlice.style.clipPath =
    `inset(${top}% 0 ${100 - (top + height)}% 0)`;

  hoverSlice.style.transform =
    `translateX(${shift}px)`;

  hoverSlice.style.opacity = 0.85;

  setTimeout(() => {
    hoverSlice.style.opacity = 0;
  }, 80);

}, 140);