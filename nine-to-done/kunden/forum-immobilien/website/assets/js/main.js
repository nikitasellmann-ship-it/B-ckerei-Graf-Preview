/* Forum Immobilien · Bewegung und Bewertungsformular
   Bewegung nach dem Muster von Sondaven: GSAP + ScrollTrigger + SplitText, Lenis für weiches Scrollen.
   Ohne Skript und bei prefers-reduced-motion ist alles sofort sichtbar und bedienbar. */
(function () {
  "use strict";
  var root = document.documentElement;
  var motion = root.classList.contains("motion") && window.gsap && window.ScrollTrigger && window.SplitText;
  if (!motion) { root.classList.remove("motion"); root.classList.add("no-anim"); }
  var EASE = "power4.inOut", EASE_OUT = "expo.out";

  /* Entwurfsstellen der Vorführ-Version */
  var toggle = document.getElementById("toggle-drafts");
  if (toggle) toggle.addEventListener("click", function () {
    var on = document.body.classList.toggle("show-drafts");
    toggle.setAttribute("aria-pressed", String(on));
    toggle.textContent = on ? "Entwurfsstellen ausblenden" : "Entwurfsstellen zeigen";
  });

  /* Weiches Scrollen */
  var lenis = null;
  if (motion && window.Lenis) {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    lenis = new Lenis({ duration: 1.15, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); } });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  } else if (motion) gsap.registerPlugin(ScrollTrigger, SplitText);

  function scrollToEl(el) {
    var bar = document.querySelector("[data-bar]"), off = bar ? -bar.offsetHeight + 1 : 0;
    if (lenis) lenis.scrollTo(el, { offset: off, duration: 1.4 });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + off, behavior: "auto" });
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute("href") === "#") return;
    var el = document.querySelector(a.getAttribute("href"));
    if (!el) return;
    e.preventDefault();
    closeMenu(false);
    scrollToEl(el);
    if (history.replaceState) history.replaceState(null, "", a.getAttribute("href"));
  });

  /* Kopfleiste: unter dem Vorführ-Hinweis, weiß nach der Eröffnung, weicht beim Runterscrollen */
  var bar = document.querySelector("[data-bar]"), demo = document.querySelector(".demo"), hero = document.querySelector(".hero");
  var lastY = 0;
  function onScroll() {
    var y = window.scrollY, dh = demo ? demo.offsetHeight : 0;
    bar.style.setProperty("--bar-top", Math.max(0, dh - y) + "px");
    var past = hero ? y > hero.offsetHeight - bar.offsetHeight - dh : true;
    bar.classList.toggle("is-solid", past || !hero);
    bar.classList.toggle("is-hidden", past && y > lastY + 4 && y > 400 && !menuOpen);
    if (y < lastY - 4) bar.classList.remove("is-hidden");
    lastY = y;
  }
  if (bar) {
    if (lenis) lenis.on("scroll", onScroll); else window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  }

  /* Navigation: aktueller Bereich wird unterstrichen */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  if (navLinks.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (l) { if (l.getAttribute("href") === "#" + en.target.id) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current"); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    navLinks.forEach(function (l) { var t = document.querySelector(l.getAttribute("href")); if (t) io.observe(t); });
  }

  /* Menü */
  var menu = document.querySelector("[data-menu]"), openBtn = document.querySelector("[data-menu-open]"), menuOpen = false;
  function openMenu() {
    if (!menu) return;
    menuOpen = true; menu.hidden = false; openBtn.setAttribute("aria-expanded", "true");
    if (lenis) lenis.stop();
    document.body.style.overflow = "hidden";
    if (motion) {
      gsap.fromTo(menu, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: .9, ease: EASE });
      gsap.fromTo(menu.querySelectorAll(".menu-list a"), { yPercent: 110 }, { yPercent: 0, duration: 1, ease: EASE_OUT, stagger: .06, delay: .35 });
      gsap.fromTo(menu.querySelector(".menu-foot"), { opacity: 0 }, { opacity: 1, duration: .8, delay: .7 });
    }
    menu.querySelector("[data-menu-close]").focus();
  }
  function closeMenu(focusBack) {
    if (!menuOpen) return;
    menuOpen = false; openBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (lenis) lenis.start();
    var done = function () { menu.hidden = true; if (focusBack) openBtn.focus(); };
    if (motion) gsap.to(menu, { clipPath: "inset(0 0 100% 0)", duration: .7, ease: EASE, onComplete: done }); else done();
  }
  if (menu) {
    openBtn.addEventListener("click", openMenu);
    menu.querySelector("[data-menu-close]").addEventListener("click", function () { closeMenu(true); });
    document.addEventListener("keydown", function (e) {
      if (!menuOpen) return;
      if (e.key === "Escape") closeMenu(true);
      if (e.key === "Tab") {
        var f = menu.querySelectorAll("a, button"), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* Angebote: Pfeile blättern um eine Karte */
  var track = document.querySelector("[data-track]");
  if (track) {
    var prev = document.querySelector("[data-prev]"), next = document.querySelector("[data-next-offer]");
    var step = function () { var c = track.querySelector(".offer"); return c ? c.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : 300; };
    var upd = function () { prev.disabled = track.scrollLeft < 8; next.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 8; };
    prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: motion ? "smooth" : "auto" }); });
    next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: motion ? "smooth" : "auto" }); });
    track.addEventListener("scroll", upd, { passive: true }); window.addEventListener("resize", upd); upd();
  }

  /* Bewegung */
  if (motion) (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(function () {
    function lines(el) {
      var s = new SplitText(el, { type: "lines", linesClass: "line", mask: "lines" });
      gsap.set(el, { visibility: "visible" });
      return s.lines;
    }

    /* Eröffnung: Zeilen steigen aus der Maske */
    var h1 = document.querySelector("[data-split-load]");
    if (h1) {
      var tl = gsap.timeline({ delay: .15 });
      tl.from(lines(h1), { yPercent: 110, duration: 1.4, ease: EASE_OUT, stagger: .1 })
        .to("[data-fade-load]", { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.9")
        .from(bar, { opacity: 0, duration: 1 }, "<");
      gsap.to(".hero-in", { yPercent: -12, opacity: .2, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    }

    /* Überschriften */
    gsap.utils.toArray("[data-split]").forEach(function (el) {
      gsap.from(lines(el), { yPercent: 110, duration: 1.2, ease: EASE_OUT, stagger: .08, scrollTrigger: { trigger: el, start: "top 85%", once: true } });
    });

    /* Haltungssatz: Wörter werden beim Lesen dunkel */
    gsap.utils.toArray("[data-words]").forEach(function (el) {
      var s = new SplitText(el, { type: "words" });
      gsap.fromTo(s.words, { opacity: .16 }, { opacity: 1, ease: "none", stagger: .1, scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 45%", scrub: true } });
    });

    /* Bild öffnet sich von schmal auf volle Breite */
    gsap.utils.toArray("[data-expand]").forEach(function (el) {
      gsap.fromTo(el.firstElementChild, { clipPath: "inset(14% 18% 14% 18%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: el, start: "top 90%", end: "center 55%", scrub: true } });
    });

    /* Fotos gleiten im Rahmen */
    gsap.utils.toArray("[data-parallax]").forEach(function (el) {
      var img = el.querySelector("img");
      if (img) gsap.fromTo(img, { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    });

    /* Blöcke tauchen auf */
    ScrollTrigger.batch("[data-reveal]", {
      start: "top 88%", once: true,
      onEnter: function (els) { gsap.fromTo(els, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1, ease: EASE_OUT, stagger: .1 }); }
    });

    /* Angebote fahren nacheinander ein */
    var offers = gsap.utils.toArray(".offer");
    if (offers.length) gsap.from(offers, { opacity: 0, x: 60, duration: 1.2, ease: EASE_OUT, stagger: .08, scrollTrigger: { trigger: ".offers-track", start: "top 85%", once: true } });

    ScrollTrigger.refresh();
  });

  /* Bewertungsformular */
  var form = document.getElementById("inquiry-form");
  if (!form) return;
  var wrap = document.getElementById("form-wrap");
  var steps = Array.prototype.slice.call(form.querySelectorAll(".step"));
  var btnBack = form.querySelector("[data-back]"), btnNext = form.querySelector("[data-next]"), btnSubmit = form.querySelector("[data-submit]");
  var progressText = document.getElementById("progress-text"), progN = document.querySelector("[data-progress-n]"), progBar = document.querySelector("[data-progress-bar]");
  var statusEl = document.getElementById("form-status"), successEl = document.getElementById("form-success");
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var current = 1;

  function focusLegend(n) { var l = steps[n - 1].querySelector("legend"); if (l) { l.setAttribute("tabindex", "-1"); l.focus({ preventScroll: true }); } }
  function show(n, focus) {
    current = n;
    steps.forEach(function (s) { s.hidden = Number(s.dataset.step) !== n; });
    btnBack.hidden = n === 1; btnNext.hidden = n === steps.length; btnSubmit.hidden = n !== steps.length;
    progressText.textContent = "Bewertung anfragen, Teil " + n + " von " + steps.length;
    if (progN) progN.textContent = "0" + n;
    if (progBar) progBar.style.width = (n / steps.length * 100) + "%";
    if (motion && focus) gsap.fromTo(steps[n - 1], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .6, ease: "power3.out" });
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
      setError(em.closest(".field"), badMail); em.setAttribute("aria-invalid", String(badMail)); if (badMail) ok = false;
      var c = document.getElementById("consent"); setError(c.closest(".field"), !c.checked); if (!c.checked) ok = false;
    }
    return ok;
  }

  form.addEventListener("change", function (e) {
    var t = e.target;
    if (t.name === "ort") document.getElementById("f-ort-frei").hidden = t.value !== "anderer Ort";
    if (t.name === "objektart" || t.name === "ort") {
      setError(t.closest(".field"), false);
      if (t.value !== "anderer Ort") setTimeout(function () { if (validStep(current)) show(current + 1, true); }, 260);
    }
    if (t.id === "consent" && t.checked) setError(t.closest(".field"), false);
  });
  ["name", "telefon", "email"].forEach(function (id) {
    var el = document.getElementById(id);
    el.addEventListener("blur", function () { if (el.closest(".field").classList.contains("has-error") || el.value.trim()) validStep(4); });
  });
  btnNext.addEventListener("click", function () { if (validStep(current)) show(current + 1, true); });
  btnBack.addEventListener("click", function () { show(current - 1, true); });

  function collect() {
    var d = {};
    new FormData(form).forEach(function (v, k) { d[k] = typeof v === "string" ? v.trim() : v; });
    d.consent = document.getElementById("consent").checked; d.page = location.href; d.submittedAt = new Date().toISOString();
    return d;
  }
  function mailto(d) {
    var labels = { objektart: "Objektart", ort: "Ort", ort_frei: "Ort (frei)", wohnflaeche: "Wohnfläche m²", grundstueck: "Grundstück m²", baujahr: "Baujahr", zimmer: "Zimmer", vorhaben: "Vorhaben", name: "Name", telefon: "Telefon", email: "E-Mail", quelle: "Aufmerksam geworden über" };
    var rows = Object.keys(labels).filter(function (k) { return d[k]; }).map(function (k) { return labels[k] + ": " + d[k]; });
    if (d.message) rows.push("", "Nachricht:", d.message);
    return "mailto:" + form.dataset.mailto + "?subject=" + encodeURIComponent("Bewertungsanfrage: " + (d.objektart || "") + " in " + (d.ort_frei || d.ort || "")) + "&body=" + encodeURIComponent(rows.join("\n"));
  }
  function success() {
    wrap.classList.add("is-sent"); form.hidden = true; successEl.hidden = false; successEl.focus();
    if (progN) progN.textContent = "04";
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

  /* Einstieg im ersten Bild: Objektart übernehmen und mit Teil 2 weitermachen */
  var quick = document.querySelector("[data-quickstart]");
  if (quick) quick.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = quick.querySelector("select").value;
    var r = v && form.querySelector('input[name="objektart"][value="' + v + '"]');
    if (r) { r.checked = true; setError(document.getElementById("f-art"), false); show(2, false); }
    scrollToEl(document.getElementById("bewertung"));
    setTimeout(function () { focusLegend(current); }, motion ? 1300 : 0);
  });

  show(1, false);
})();
