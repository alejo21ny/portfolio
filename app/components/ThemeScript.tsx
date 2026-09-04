// Blocking, inline, and static (no user input reaches it) — the standard
// pattern to set the theme attribute before first paint, avoiding a
// light-then-dark flash. Runs before hydration; kept deliberately tiny.
const THEME_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored === "light" || stored === "dark" ? stored : "system";
    if (theme !== "system") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  } catch (e) {}
})();
`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}
