const appState = {
  currentView: "home",
  selectedField: null,
  selectedCareer: null,
  theme: localStorage.getItem("theme") || "light"
};

function initApp() {
  if (appState.theme === "dark") {
    document.body.classList.add("dark");
  }
}

window.onload = initApp;
