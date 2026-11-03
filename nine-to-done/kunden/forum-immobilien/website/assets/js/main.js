/* Forum Immobilien · Die Verkaufsmappe
   Register folgt dem Blatt, Säulen wachsen, Stempel landen, Bewertungsbogen in vier Teilen.
   Ohne Bibliothek. Inhalte sind ohne JS lesbar, Bewegung respektiert prefers-reduced-motion. */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasIO = "IntersectionObserver" in window;

  /* Entwurfsstellen der Vorführ-Version */
  var toggle = document.getElementById("toggle-drafts");
  if (toggle) toggle.addEventListener("click", function () {
    var on = document.body.classList.toggle("show-drafts");
    toggle.setAttribute("aria-pressed", String(on));
    toggle.textContent = on ? "Entwurfsstellen ausblenden" : "Entwurfsstellen zeigen";
  });

  /* Register: der Reiter des Blatts, das gerade oben liegt, steht hervor */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.register a[href^="#"]'));
  var targets = tabs.map(function (a) { return document.querySelector(a.getAttribute("href")); }).filter(Boolean);
  function markTab() {
    var line = window.innerHeight * 0.35, current = targets[0];
    targets.forEach(function (t) { if (t.getBoundingClientRect().top <= line) current = t; });
    tabs.forEach(function (a) {
      var on = a.getAttribute("href") === "#" + current.id;
      if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      if (on && a.parentNode.scrollWidth > a.parentNode.clientWidth) {
        var nav = a.parentNode, l = a.offsetLeft - 16;
        if (l < nav.scrollLeft || a.offsetLeft + a.offsetWidth > nav.scrollLeft + nav.clientWidth) nav.scrollTo({ left: l, behavior: reduce ? "auto" : "smooth" });
      }
    });
  }

  /* Laufzettel: Stempel landen, wenn die Zeile die Blattmitte erreicht */
  var rows = Array.prototype.slice.call(document.querySelectorAll("[data-slip] tbody tr"));
  function stamp() {
    var line = window.innerHeight * (reduce ? 1 : 0.62);
    rows.forEach(function (r) { if (r.getBoundingClientRect().top < line) r.classList.add("is-stamped"); });
  }

  var ticking = false;
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; markTab(); stamp(); }); } }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  markTab(); stamp();

  /* Säulen wachsen, sobald die Zeichnung zu sehen ist */
  var drawing = document.querySelector(".drawing");
  if (drawing) {
    if (reduce || !hasIO) drawing.classList.add("is-in");
    else {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { drawing.classList.add("is-in"); io.disconnect(); } }); }, { threshold: 0.4 });
      io.observe(drawing);
    }
  }

  /* Bewertungsbogen */
  var form = document.getElementById("inquiry-form");
  if (!form) return;
  var wrap = document.getElementById("form-wrap");
  var steps = Array.prototype.slice.call(form.querySelectorAll(".step"));
  var parts = Array.prototype.slice.call(document.querySelectorAll(".parts [data-part]"));
  var btnBack = form.querySelector("[data-back]"), btnNext = form.querySelector("[data-next]"), btnSubmit = form.querySelector("[data-submit]");
  var progressText = document.getElementById("progress-text");
  var statusEl = document.getElementById("form-status"), successEl = document.getElementById("form-success");
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var current = 1;

  function focusLegend(n) { var l = steps[n - 1].querySelector("legend"); if (l) { l.setAttribute("tabindex", "-1"); l.focus({ preventScroll: true }); } }
  function show(n, focus) {
    current = n;
    steps.forEach(function (s) { s.hidden = Number(s.dataset.step) !== n; });
    btnBack.hidden = n === 1; btnNext.hidden = n === steps.length; btnSubmit.hidden = n !== steps.length;
    parts.forEach(function (p) { var k = Number(p.dataset.part); p.classList.toggle("done", k < n); p.classList.toggle("now", k === n); p.textContent = (k < n ? "X " : "") + "Teil " + k; });
    progressText.textContent = "Bewertung anfragen, Teil " + n + " von " + steps.length;
    if (focus) focusLegend(n);
  }
  function setError(field, on) { if (field) field.classList.toggle("has-error", on); }
  function validStep(n) {
    var ok = true;
    if (n === 1) { var a = form.querySelector('input[name="objektart"]:checked'); setError(document.getElementById("f-art"), !a); ok = !!a; }
    if (n === 2) {
      var o = form.querySelector('input[name="ort"]:checked'), free = document.getElementById("ort-frei");
      var valid = !!o && (o.value !== "anderer Ort" || !!free.value.trim());
      setError(document.getElementById("f-ort"), !valid); ok = valid;
    }
    if (n === 4) {
      ["name", "telefon"].forEach(function (id) { var el = document.getElementById(id), bad = !el.value.trim(); setError(el.closest(".field"), bad); el.setAttribute("aria-invalid", String(bad)); if (bad) ok = false; });
      var em = document.getElementById("email"), badMail = !!em.value.trim() && !emailPattern.test(em.value.trim());
      setError(em.closest(".field"), badMail); if (badMail) ok = false;
      var c = document.getElementById("consent"); setError(c.closest(".field"), !c.checked); if (!c.checked) ok = false;
    }
    return ok;
  }

  form.addEventListener("change", function (e) {
    var t = e.target;
    if (t.name === "ort") document.getElementById("f-ort-frei").hidden = t.value !== "anderer Ort";
    if (t.name === "objektart" || t.name === "ort") {
      setError(t.closest(".field"), false);
      if (t.value !== "anderer Ort") setTimeout(function () { if (validStep(current)) show(current + 1, true); }, 220);
    }
    if (t.id === "consent" && t.checked) setError(t.closest(".field"), false);
  });
  ["name", "telefon", "email"].forEach(function (id) {
    var el = document.getElementById(id);
    el.addEventListener("blur", function () { if (el.closest(".field").classList.contains("has-error") || el.value.trim()) validStep(4); });
  });
  btnNext.addEventListener("click", function () { if (validStep(current)) show(current + 1, true); });
  btnBack.addEventListener("click", function () { show(current - 1, true); });

  function startAt(objektart) {
    if (objektart) { var r = form.querySelector('input[name="objektart"][value="' + objektart + '"]'); if (r) r.checked = true; show(2, false); }
    else show(current, false);
    document.getElementById("bewertung").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    setTimeout(function () { focusLegend(current); }, reduce ? 0 : 700);
  }
  document.querySelectorAll('[data-quickstart] input[name="q-art"]').forEach(function (r) { r.addEventListener("change", function () { startAt(r.value); }); });
  document.querySelectorAll("[data-start-assist]").forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); startAt(null); }); });

  function collect() {
    var d = {};
    new FormData(form).forEach(function (v, k) { d[k] = typeof v === "string" ? v.trim() : v; });
    d.consent = document.getElementById("consent").checked; d.page = location.href; d.submittedAt = new Date().toISOString();
    return d;
  }
  function mailto(d) {
    var labels = { objektart: "Objektart", ort: "Ort", ort_frei: "Ort (frei)", wohnflaeche: "Wohnfläche m²", grundstueck: "Grundstück m²", baujahr: "Baujahr", zimmer: "Zimmer", vorhaben: "Vorhaben", name: "Name", telefon: "Telefon", email: "E-Mail", quelle: "Aufmerksam geworden über" };
    var lines = Object.keys(labels).filter(function (k) { return d[k]; }).map(function (k) { return labels[k] + ": " + d[k]; });
    if (d.message) lines.push("", "Nachricht:", d.message);
    return "mailto:" + form.dataset.mailto + "?subject=" + encodeURIComponent("Bewertungsanfrage: " + (d.objektart || "") + " in " + (d.ort_frei || d.ort || "")) + "&body=" + encodeURIComponent(lines.join("\n"));
  }
  function success() {
    var dt = document.getElementById("stamp-date");
    if (dt) dt.textContent = new Date().toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
    parts.forEach(function (p) { p.classList.add("done"); p.classList.remove("now"); p.textContent = "X Teil " + p.dataset.part; });
    wrap.classList.add("is-sent"); successEl.hidden = false; successEl.focus();
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validStep(4)) { var bad = form.querySelector(".has-error input, .has-error textarea"); if (bad) bad.focus(); return; }
    var d = collect();
    if (d.website) { success(); return; }
    var endpoint = form.dataset.endpoint;
    if (!endpoint) { window.location.href = mailto(d); success(); return; }
    btnSubmit.disabled = true; statusEl.textContent = "Wird gesendet …";
    fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(d) })
      .then(function (r) { if (!r.ok) throw new Error(r.status); statusEl.textContent = ""; success(); })
      .catch(function () { statusEl.textContent = "Senden hat nicht geklappt. Bitte versuchen Sie es noch einmal oder rufen Sie an: 07273 800365."; })
      .then(function () { btnSubmit.disabled = false; });
  });

  show(1, false);
})();
