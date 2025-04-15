(function () {
    var darkSwitch = document.getElementById("darkSwitch");
    if (darkSwitch) {
        initTheme();
        darkSwitch.addEventListener("change", function (event) {
            resetTheme();
        });

        function initTheme() {
            if (localStorage.getItem("darkSwitch") == null && isSystemSetToDarkTheme()) {
                setDocumentTheme("dark");
            } else {
                var darkThemeSelected = (localStorage.getItem("darkSwitch") === "dark");
                darkSwitch.checked = darkThemeSelected;
                darkThemeSelected
                    ? setDocumentTheme("dark")
                    : setDocumentTheme("light");
            }
        }

        function resetTheme() {
            if (darkSwitch.checked) {
                setDocumentTheme("dark");
            } else {
                setDocumentTheme("light");
            }

        }

        function setDocumentTheme(theme) {
            switch (theme) {
                case "dark":
                    document.body.setAttribute("data-theme", "dark");
                    localStorage.setItem("darkSwitch", "dark");
                    darkSwitch.checked = true;
                    break;
                default:
                    document.body.removeAttribute("data-theme");
                    localStorage.removeItem("darkSwitch");
                    darkSwitch.checked = false;
                    break;
            }
        }

        function isSystemSetToDarkTheme() {
            if (window.matchMedia) {
                if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        }

    }
})();