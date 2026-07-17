/**
 * main.js — shared language-switcher and FAQ-accordion wiring for index.html and privacy.html.
 *
 * Locale choice persists via localStorage (see i18n.js's setLocale/detectLocale), so
 * switching language on one page and following a link to the other keeps the same
 * language — same idea as the extension panel's own settings.locale, just backed by
 * localStorage instead of chrome.storage since this runs on a plain public page.
 */
(function () {
  "use strict";

  const i18n = window.__landingI18n;
  const select = document.getElementById("langSelect");

  select.innerHTML = i18n.LOCALES.map(
    (code) => `<option value="${code}">${i18n.LOCALE_NAMES[code]}</option>`
  ).join("");

  function render(locale) {
    i18n.applyTranslations(locale);
    select.value = locale;
  }

  const current = i18n.detectLocale();
  render(current);

  select.addEventListener("change", () => {
    i18n.setLocale(select.value);
    render(select.value);
  });

  document.querySelectorAll(".faq-q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });
})();
