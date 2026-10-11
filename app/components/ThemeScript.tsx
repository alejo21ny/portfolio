// Blocking, inline, and static (no user input reaches it). The server renders
// <html data-theme="dark">; this only swaps to light before first paint when
// the visitor picked it earlier, so there is no dark-then-light flash.
const THEME_SCRIPT = `
(function () {
  try {
    if (localStorage.getItem("theme") === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    }
  } catch (e) {}
})();
`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}
