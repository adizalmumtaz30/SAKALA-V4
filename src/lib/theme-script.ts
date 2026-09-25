/**
 * Dijalankan sebelum paint (blocking, di <head>) — cegah "flash" tema salah.
 * Default: dark. Operator bisa override lewat toggle, tersimpan di localStorage.
 */
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("sakala-theme");
    var theme = stored === "light" || stored === "dark" ? stored : "dark";
    document.documentElement.classList.toggle("dark", theme === "dark");
  } catch (e) {
    document.documentElement.classList.add("dark");
  }
})();
`;
