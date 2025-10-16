(function () {
  function decode(b64) {
    try { return atob(b64); } catch { return ""; }
  }
  function telHrefText(raw) {
    return raw.replace(/\s+/g, "");
  }
  function reveal(el) {
    const type  = el.getAttribute("data-type");
    const value = decode(el.getAttribute("data-b64") || "");
    if (!value) return;

    const a = document.createElement("a");
    // Optik: normaler Text, keine Unterstreichung, aber klickbar
    a.className = "text-gray-900 no-underline cursor-pointer";
    a.style.textDecoration = "none";
    a.rel = "nofollow";

    if (type === "phone") {
      a.href = "tel:" + telHrefText(value);
      a.textContent = value;           // Anzeige bleibt formatiert
    } else {
      a.href = "mailto:" + value;
      a.textContent = value;           // Anzeige = Adresse
    }
    el.replaceChildren(a);
  }

  function init() {
    document.querySelectorAll(".ct-protect").forEach((el) => {
      el.addEventListener("click", () => reveal(el), { once: true });
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

