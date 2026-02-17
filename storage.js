function saveCareer(name) {
  localStorage.setItem("savedCareer", name);
  alert(`${name} saved ❤️`);
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
}
