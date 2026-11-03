/* Forum Immobilien · Bewegung (Flurkarte, Säulen, Ablauf) und Bewertungs-Assistent.
   Ohne Bibliothek. Alles respektiert prefers-reduced-motion, Inhalte sind ohne JS lesbar. */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Entwurfsstellen der Vorführ-Version ein- und ausblenden */
  var toggle = document.getElementById("toggle-drafts");
  if (toggle) toggle.addEventListener("click", function () {
    var on = document.body.classList.toggle("show-drafts");
    toggle.setAttribute("aria-pressed", String(on));
    toggle.textContent = on ? "Entwurfsstellen ausblenden" : "Entwurfsstellen zeigen";
  });

  /* 1 · Flurkarte zeichnet sich */
  var plan = document.querySelector(".plan");
  if (plan) {
    plan.querySelectorAll(".ln, .yours").forEach(function (p) {
      try { p.style.setProperty("--len", Math.ceil(p.getTotalLength()) + 2); } catch (e) {}
    });
    if (reduce) plan.classList.add("is-drawn");
    else requestAnimationFrame(function () { requestAnimationFrame(function () { plan.classList.add("is-drawn"); }); });
  }

  /* 2 · Drei Säulen wachsen, sobald sie zu sehen sind */
  var cols = document.querySelector(".columns");
  if (cols) {
    if (reduce || !("IntersectionObserver" in window)) cols.classList.add("is-in");
    else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { cols.classList.add("is-in"); io.disconnect(); } });
      }, { threshold: 0.35 });
      io.observe(cols);
    }
  }

  /* 3 · Ablauf: Säule füllt sich Station für Station */
  var track = document.querySelector("[data-track]");
  if (track) {
    var pillar = track.querySelector(".pillar");
    var stations = Array.prototype.slice.call(track.querySelectorAll(".station"));
    var ticking = false;
    function update() {
      ticking = false;
      var mid = window.innerHeight * 0.55, passed = 0;
      stations.forEach(function (s) {
        var past = s.getBoundingClientRect().top < mid;
        s.classList.toggle("is-past", past);
        if (past) passed++;
      });
      var first = stations[0].getBoundingClientRect().top, last = stations[stations.length - 1].getBoundingClientRect().top;
      var p = Math.min(1, Math.max(0, (mid - first) / Math.max(1, last - first)));
      pillar.style.setProperty("--p", reduce ? 1 : p.toFixed(3));
      pillar.classList.toggle("done", passed === stations.length);
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* Bewertungs-Assistent */
  var form = document.getElementById("inquiry-form");
  if (!form) return;
  var wrap = document.getElementById("form-wrap");
  var steps = Array.prototype.slice.call(form.querySelectorAll(".step"));
  var btnBack = form.querySelector("[data-back]"), btnNext = form.querySelector("[data-next]"), btnSubmit = form.querySelector("[data-submit]");
  var progressText = document.getElementById("progress-text"), progressFill = form.querySelector(".progress .fill");
  var statusEl = document.getElementById("form-status"), successEl = document.getElementById("form-success");
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var current = 1;

  function show(n, focus) {
    current = n;
    steps.forEach(function (s) { s.hidden = Number(s.dataset.step) !== n; });
    btnBack.hidden = n === 1;
    btnNext.hidden = n === steps.length;
    btnSubmit.hidden = n !== steps.length;
    progressText.textContent = "Bewertung anfragen, Teil " + n + " von " + steps.length;
    progressFill.style.transform = "scaleY(" + (n / steps.length) + ")";
    if (focus) { var l = steps[n - 1].querySelector("legend"); if (l) { l.setAttribute("tabindex", "-1"); l.focus({ preventScroll: true }); } }
  }

  function setError(field, on) { if (field) field.classList.toggle("has-error", on); }

  function validStep(n) {
    var ok = true;
    if (n === 1) { var a = form.querySelector('input[name="objektart"]:checked'); setError(document.getElementById("f-art"), !a); ok = !!a; }
    if (n === 2) {
      var o = form.querySelector('input[name="ort"]:checked');
      var free = document.getElementById("ort-frei");
      var valid = !!o && (o.value !== "anderer Ort" || free.value.trim());
      setError(document.getElementById("f-ort"), !valid); ok = valid;
    }
    if (n === 4) {
      ["name", "telefon"].forEach(function (id) { var el = document.getElementById(id); var bad = !el.value.trim(); setError(el.closest(".field"), bad); el.setAttribute("aria-invalid", String(bad)); if (bad) ok = false; });
      var em = document.getElementById("email"); var badMail = em.value.trim() && !emailPattern.test(em.value.trim());
      setError(em.closest(".field"), !!badMail); if (badMail) ok = false;
      var c = document.getElementById("consent"); setError(c.closest(".field"), !c.checked); if (!c.checked) ok = false;
    }
    return ok;
  }

  form.addEventListener("change", function (e) {
    if (e.target.name === "ort") document.getElementById("f-ort-frei").hidden = e.target.value !== "anderer Ort";
    if (e.target.name === "objektart" || e.target.name === "ort") {
      setError(e.target.closest(".field"), false);
      if (e.target.value !== "anderer Ort") setTimeout(function () { if (validStep(current)) show(current + 1, true); }, 180);
    }
    if (e.target.id === "consent" && e.target.checked) setError(e.target.closest(".field"), false);
  });
  ["name", "telefon", "email"].forEach(function (id) {
    var el = document.getElementById(id);
    el.addEventListener("blur", function () { if (el.closest(".field").classList.contains("has-error") || el.value.trim()) validStep(4); });
  });

  btnNext.addEventListener("click", function () { if (validStep(current)) show(current + 1, true); });
  btnBack.addEventListener("click", function () { show(current - 1, true); });

  function startAt(objektart) {
    if (objektart) { var r = form.querySelector('input[name="objektart"][value="' + objektart + '"]'); if (r) r.checked = true; show(2, false); }
    else show(1, false);
    document.getElementById("wert").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    setTimeout(function () { var l = steps[current - 1].querySelector("legend"); if (l) { l.setAttribute("tabindex", "-1"); l.focus({ preventScroll: true }); } }, reduce ? 0 : 650);
  }
  document.querySelectorAll('[data-quickstart] input[name="q-art"]').forEach(function (r) {
    r.addEventListener("change", function () { startAt(r.value); });
  });
  document.querySelectorAll("[data-start-assist]").forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); startAt(null); });
  });

  function collect() {
    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = typeof v === "string" ? v.trim() : v; });
    data.consent = document.getElementById("consent").checked;
    data.page = location.href; data.submittedAt = new Date().toISOString();
    return data;
  }
  function mailto(d) {
    var labels = { objektart: "Objektart", ort: "Ort", ort_frei: "Ort (frei)", wohnflaeche: "Wohnfläche m²", grundstueck: "Grundstück m²", baujahr: "Baujahr", zimmer: "Zimmer", vorhaben: "Vorhaben", name: "Name", telefon: "Telefon", email: "E-Mail", quelle: "Aufmerksam geworden über" };
    var lines = Object.keys(labels).filter(function (k) { return d[k]; }).map(function (k) { return labels[k] + ": " + d[k]; });
    if (d.message) lines.push("", "Nachricht:", d.message);
    return "mailto:" + form.dataset.mailto + "?subject=" + encodeURIComponent("Bewertungsanfrage: " + (d.objektart || "") + " in " + (d.ort_frei || d.ort || "")) + "&body=" + encodeURIComponent(lines.join("\n"));
  }
  function success() {
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
