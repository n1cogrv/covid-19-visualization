function setColorScheme(scheme) {
  switch(scheme){
    case "dark":
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("darkSwitch", "dark");
      darkSwitch.checked = true;
      break;
    case "light":
      document.body.removeAttribute("data-theme");
      localStorage.removeItem("darkSwitch");
      darkSwitch.checked = false;
      break;
    default:
      document.body.removeAttribute("data-theme");
      localStorage.removeItem("darkSwitch");
      darkSwitch.checked = false;
      break;
  }
}

function getPreferredColorScheme() {
  if (window.matchMedia) {
    if(window.matchMedia("(prefers-color-scheme: dark)").matches){
      return "dark";
    } else {
      return "light";
    }
  }
  return "light";
}

function manualOverrideTheme() {
    setColorScheme(darkSwitch.checked ? "dark" : "light");
}

var darkSwitch = document.getElementById("darkSwitch");

if(window.matchMedia && darkSwitch){
    let colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    colorSchemeQuery.addEventListener("change", setColorScheme(getPreferredColorScheme()));
}

if (darkSwitch) {
    darkSwitch.addEventListener("change", function (e) {
        manualOverrideTheme();
    });
}
