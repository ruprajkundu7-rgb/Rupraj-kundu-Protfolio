/* ==========================================================================
   Rupraj Kundu — device portfolio
   All content comes from js/data.js (the PORTFOLIO object). This file builds
   the two experiences from it and runs the device behaviour.
   ========================================================================== */
(function () {
  "use strict";

  var D = window.PORTFOLIO;
  if (!D) return;   // js/data.js missing — leave the no-JS content in place

  /* ── small helpers ────────────────────────────────────────────────────── */
  var $  = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function icon(id, cls) {
    return '<svg class="' + (cls || "") + '" aria-hidden="true" focusable="false"><use href="#' + id + '"></use></svg>';
  }
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function wait(ms) { return new Promise(function (r) { setTimeout(r, reduced ? Math.min(ms, 16) : ms); }); }

  function initials(name) {
    return String(name).trim().split(/\s+/).slice(0, 2).map(function (w) { return w[0]; }).join("").toUpperCase();
  }

  /* ── avatar: real photo if data.js has one, otherwise a drawn monogram ── */
  var avatarSeed = 0;
  function avatarHTML() {
    var name = D.identity.name;
    if (D.identity.photo) {
      return '<img class="avatar__img" src="' + esc(D.identity.photo) + '" alt="' + esc(name) + '">';
    }
    var g = "av" + (++avatarSeed);
    return '<svg class="avatar__svg" viewBox="0 0 120 120" role="img" aria-label="' + esc(name) + '">' +
      '<defs><linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#FFC15E"/><stop offset=".55" stop-color="#FF8A3D"/><stop offset="1" stop-color="#C4451F"/>' +
      '</linearGradient></defs>' +
      '<circle cx="60" cy="60" r="60" fill="#1A1624"/>' +
      '<circle cx="60" cy="60" r="59" fill="url(#' + g + ')" opacity=".14"/>' +
      '<circle cx="60" cy="60" r="44" fill="none" stroke="url(#' + g + ')" stroke-width="1" opacity=".5"/>' +
      '<text x="60" y="75" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-weight="700" ' +
      'font-size="42" letter-spacing="-2" fill="url(#' + g + ')">' + esc(initials(name)) + '</text>' +
      '</svg>';
  }

  function meterHTML(level) {
    var out = "";
    for (var i = 1; i <= 5; i++) out += "<i" + (i <= level ? ' class="on"' : "") + "></i>";
    return '<span class="meter" role="img" aria-label="' + level + ' out of 5">' + out + "</span>";
  }

  function projectLinks(p) {
    var cls = "btn btn--ghost btn--small";
    var out = "";
    if (p.github) out += '<a class="' + cls + '" href="' + esc(p.github) + '" target="_blank" rel="noopener">' + icon("i-github") + "Code</a>";
    if (p.demo)   out += '<a class="' + cls + '" href="' + esc(p.demo) + '" target="_blank" rel="noopener">' + icon("i-link") + "Live demo</a>";
    return out;
  }

  function projectCard(p) {
    return '<article class="card proj reveal">' +
      '<span class="proj__icon">' + icon("i-" + (p.icon || "grid")) + "</span>" +
      '<h3 class="proj__name">' + esc(p.name) + "</h3>" +
      '<p class="proj__blurb">' + esc(p.blurb) + "</p>" +
      '<div class="proj__tech">' + p.tech.map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("") + "</div>" +
      '<div class="proj__links">' + projectLinks(p) + "</div>" +
      "</article>";
  }

  function railHTML() {
    return '<div class="rail">' + D.experience.map(function (x) {
      return '<div class="rail__item reveal' + (x.current ? " is-now" : "") + '">' +
        '<span class="rail__dot"></span>' +
        '<p class="rail__when">' + esc(x.period) + "</p>" +
        '<h3 class="rail__role">' + esc(x.role) + "</h3>" +
        '<p class="rail__org">' + esc(x.org) + "</p>" +
        '<ul class="rail__points">' + x.points.map(function (pt) { return "<li>" + esc(pt) + "</li>"; }).join("") + "</ul>" +
        "</div>";
    }).join("") + "</div>";
  }

  function reachHTML() {
    var out = '<a href="mailto:' + esc(D.contact.email) + '">' + icon("i-mail") +
      '<span><span class="reach__label">Email</span><br><span class="reach__handle">' + esc(D.contact.email) + "</span></span></a>";
    out += D.contact.links.map(function (l) {
      return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + icon("i-" + l.icon) +
        '<span><span class="reach__label">' + esc(l.label) + '</span><br><span class="reach__handle">' + esc(l.handle) + "</span></span></a>";
    }).join("");
    return '<div class="reach">' + out + "</div>";
  }

  function field(id, label, markup) {
    return '<label class="field"><span>' + label + "</span>" + markup +
      '<em class="field__err" id="' + id + '" hidden></em></label>';
  }

  function formHTML(k) {
    var p = k === "m" ? "mf" : "df";
    return '<form class="' + (k === "m" ? "m-form" : "d-form") + '" novalidate data-form>' +
      (k === "m" ? "" : '<div class="d-form__row">') +
      field(p + "-name", "Your name",
        '<input name="name" type="text" autocomplete="name" placeholder="Ada Lovelace" required aria-describedby="' + p + '-name">') +
      field(p + "-email", "Your email",
        '<input name="email" type="email" autocomplete="email" placeholder="ada@example.com" required aria-describedby="' + p + '-email">') +
      (k === "m" ? "" : "</div>") +
      field(p + "-msg", "Message",
        '<textarea name="message" rows="4" placeholder="What are you building?" required aria-describedby="' + p + '-msg"></textarea>') +
      '<button class="btn btn--solid" type="submit">' + icon("i-send") + "Send message</button>" +
      "</form>";
  }

  /* ══ MOBILE EXPERIENCE ═════════════════════════════════════════════════ */
  var TABS = [
    { id: "home",    label: "Home",    title: "Home",       icon: "i-home" },
    { id: "about",   label: "About",   title: D.about.heading, icon: "i-person" },
    { id: "skills",  label: "Skills",  title: "Skills",     icon: "i-stack" },
    { id: "work",    label: "Work",    title: "Work",       icon: "i-grid" },
    { id: "contact", label: "Contact", title: "Contact",    icon: "i-mail" }
  ];

  function mobileHome() {
    var f = D.identity.facts.map(function (x) {
      return '<div class="card m-fact"><b>' + esc(x.value) + "</b><span>" + esc(x.label) + "</span></div>";
    }).join("");
    return '<div class="m-hero">' +
      '<span class="avatar">' + avatarHTML() + "</span>" +
      '<h3 class="m-hero__name">Hi, I\'m ' + esc(D.identity.name) + "</h3>" +
      '<p class="m-hero__role">' + esc(D.identity.role) + "</p>" +
      '<p class="m-hero__intro">' + esc(D.identity.intro) + "</p>" +
      '<button class="btn btn--solid m-hero__cta" type="button" data-goto="work">Explore my work</button>' +
      '<p class="m-hero__where">' + icon("i-pin") + esc(D.identity.location) + "</p>" +
      '<div class="m-facts">' + f + "</div>" +
      "</div>";
  }

  function mobileAbout() {
    return '<div class="m-sect">' +
      D.about.body.map(function (p) { return '<p class="m-body">' + esc(p) + "</p>"; }).join("") + "</div>" +
      '<div class="m-sect"><h3 class="m-sect__title">Education</h3>' +
      '<ul class="m-edu">' + D.education.map(function (e) {
        return '<li class="card reveal">' + icon("i-cap") + "<div>" +
          '<p class="m-edu__title">' + esc(e.title) + "</p>" +
          '<p class="m-edu__meta">' + esc(e.place) + " &middot; " + esc(e.period) + "</p>" +
          (e.note ? '<p class="m-edu__note">' + esc(e.note) + "</p>" : "") +
          "</div></li>";
      }).join("") + "</ul></div>" +
      '<div class="m-sect"><h3 class="m-sect__title">Interests</h3>' +
      '<div class="m-chips">' + D.interests.map(function (i) { return '<span class="chip">' + esc(i) + "</span>"; }).join("") + "</div></div>";
  }

  function mobileSkills() {
    return '<div class="m-sect"><h3 class="m-sect__title">What I build with</h3>' +
      D.skills.map(function (g) {
        return '<div class="m-skillgroup reveal"><h4>' + esc(g.group) + "</h4>" +
          '<div class="m-skills">' + g.items.map(function (s) {
            return '<div class="skill"><span class="skill__name">' + esc(s.name) + "</span>" + meterHTML(s.level) + "</div>";
          }).join("") + "</div></div>";
      }).join("") + "</div>";
  }

  function mobileWork() {
    return '<div class="seg" role="tablist" aria-label="Work view">' +
      '<button type="button" role="tab" id="seg-p" aria-controls="pane-p" aria-selected="true"  data-pane="p">Projects</button>' +
      '<button type="button" role="tab" id="seg-e" aria-controls="pane-e" aria-selected="false" data-pane="e">Experience</button>' +
      "</div>" +
      '<div class="m-projects" id="pane-p" role="tabpanel" aria-labelledby="seg-p">' +
      D.projects.map(projectCard).join("") + "</div>" +
      '<div id="pane-e" role="tabpanel" aria-labelledby="seg-e" hidden>' + railHTML() + "</div>";
  }

  function mobileContact() {
    return '<p class="m-contact__lede">' + esc(D.contact.blurb) + "</p>" +
      reachHTML() + formHTML("m");
  }

  function buildMobile() {
    var host = $("#mobileScreens");
    var bodies = { home: mobileHome, about: mobileAbout, skills: mobileSkills, work: mobileWork, contact: mobileContact };
    host.innerHTML = TABS.map(function (t, i) {
      return '<section class="screen' + (i === 0 ? " is-active" : "") + '" id="screen-' + t.id +
        '" aria-label="' + esc(t.title) + '">' + bodies[t.id]() + "</section>";
    }).join("");

    $("#mobileTabs").innerHTML = TABS.map(function (t, i) {
      return '<button type="button" aria-current="' + (i === 0 ? "true" : "false") +
        '" data-tab="' + t.id + '"><span class="u-hide">Go to </span>' +
        icon(t.icon) + "<span>" + esc(t.label) + "</span></button>";
    }).join("");
  }

  var currentTab = 0;
  function goTab(id, silent) {
    var next = TABS.map(function (t) { return t.id; }).indexOf(id);
    if (next < 0 || next === currentTab) return;
    var back = next < currentTab;
    var screens = $$(".screen", $("#mobileScreens"));

    screens[currentTab].style.setProperty("--slide", back ? "22px" : "-22px");
    screens[currentTab].classList.remove("is-active");
    screens[next].style.setProperty("--slide", back ? "-22px" : "22px");
    // force a reflow so the incoming screen animates from its offset
    void screens[next].offsetWidth;
    screens[next].classList.add("is-active");
    screens[next].scrollTop = 0;

    currentTab = next;
    $("#appbarTitle").textContent = TABS[next].title;
    $$("#mobileTabs button").forEach(function (b, i) { b.setAttribute("aria-current", i === next ? "true" : "false"); });
    if (!silent) buzz();
  }

  /* ══ LAPTOP EXPERIENCE ═════════════════════════════════════════════════ */
  var SECTIONS = [
    { id: "home",       label: "Home" },
    { id: "about",      label: "About" },
    { id: "skills",     label: "Skills" },
    { id: "projects",   label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact",    label: "Contact" }
  ];

  function buildDesktop() {
    var page = $("#deskPage");

    var hero =
      '<section class="d-hero" id="sec-home">' +
        "<div>" +
          '<h2 class="d-hero__name">Hi, I\'m ' + esc(D.identity.name) + "</h2>" +
          '<p class="d-hero__role">' + esc(D.identity.role) + "</p>" +
          '<p class="d-hero__intro">' + esc(D.identity.intro) + "</p>" +
          '<div class="d-hero__cta">' +
            '<button class="btn btn--solid" type="button" data-scroll="projects">Explore my work</button>' +
            '<a class="btn btn--ghost" href="mailto:' + esc(D.contact.email) + '">' + icon("i-mail") + "Get in touch</a>" +
            (D.identity.resume ? '<a class="btn btn--ghost" href="' + esc(D.identity.resume) + '" target="_blank" rel="noopener">' + icon("i-link") + "Resume</a>" : "") +
          "</div>" +
          '<p class="d-hero__where">' + icon("i-pin") + esc(D.identity.location) + "</p>" +
        "</div>" +
        '<span class="avatar">' + avatarHTML() + "</span>" +
      "</section>" +
      '<div class="d-facts">' + D.identity.facts.map(function (f) {
        return '<div class="d-fact reveal"><b>' + esc(f.value) + "</b><span>" + esc(f.label) + "</span></div>";
      }).join("") + "</div>";

    var about =
      '<section class="d-sect" id="sec-about">' +
        '<div class="d-sect__head"><h2 class="d-sect__title">' + esc(D.about.heading) + "</h2></div>" +
        '<div class="d-about">' +
          '<div class="d-about__prose reveal">' +
            D.about.body.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
            '<div class="d-about__interests">' +
              D.interests.map(function (i) { return '<span class="chip">' + esc(i) + "</span>"; }).join("") +
            "</div>" +
          "</div>" +
          '<ul class="d-edu">' + D.education.map(function (e) {
            return '<li class="card reveal">' + icon("i-cap") + "<div>" +
              '<h3 class="d-edu__title">' + esc(e.title) + "</h3>" +
              '<p class="d-edu__meta">' + esc(e.place) + " &middot; " + esc(e.period) + "</p>" +
              (e.note ? '<p class="d-edu__note">' + esc(e.note) + "</p>" : "") +
              "</div></li>";
          }).join("") + "</ul>" +
        "</div>" +
      "</section>";

    var skills =
      '<section class="d-sect" id="sec-skills">' +
        '<div class="d-sect__head"><h2 class="d-sect__title">Skills</h2>' +
        '<p class="d-sect__lede">The meters are my own read on how comfortable I am, not a certificate.</p></div>' +
        '<div class="d-skills">' + D.skills.map(function (g) {
          return '<div class="card d-skillgroup reveal"><h3>' + esc(g.group) + "</h3>" +
            g.items.map(function (s) {
              return '<div class="skill"><span class="skill__name">' + esc(s.name) + "</span>" + meterHTML(s.level) + "</div>";
            }).join("") + "</div>";
        }).join("") + "</div>" +
      "</section>";

    var projects =
      '<section class="d-sect" id="sec-projects">' +
        '<div class="d-sect__head"><h2 class="d-sect__title">Projects</h2>' +
        '<p class="d-sect__lede">Things I built end to end, mostly because something around me was broken or slow.</p></div>' +
        '<div class="d-projects">' + D.projects.map(projectCard).join("") + "</div>" +
      "</section>";

    var experience =
      '<section class="d-sect" id="sec-experience">' +
        '<div class="d-sect__head"><h2 class="d-sect__title">Experience</h2></div>' +
        '<div class="d-exp">' + railHTML() + "</div>" +
      "</section>";

    var contact =
      '<section class="d-sect" id="sec-contact">' +
        '<div class="d-sect__head"><h2 class="d-sect__title">Contact</h2>' +
        '<p class="d-sect__lede">' + esc(D.contact.blurb) + "</p></div>" +
        '<div class="d-contact">' +
          '<div class="reveal">' + reachHTML() + "</div>" +
          '<div class="reveal">' + formHTML("d") + "</div>" +
        "</div>" +
      "</section>" +
      '<footer class="d-foot"><span>Built from scratch with HTML, CSS and vanilla JavaScript.</span>' +
      "<span>&copy; " + new Date().getFullYear() + " " + esc(D.identity.name) + "</span></footer>";

    page.innerHTML = hero + about + skills + projects + experience + contact;

    $("#deskNav").innerHTML = SECTIONS.map(function (s, i) {
      return '<button type="button" data-scroll="' + s.id + '" aria-current="' + (i === 0 ? "true" : "false") + '">' +
        esc(s.label) + "</button>";
    }).join("");
  }

  function scrollToSection(id) {
    var page = $("#deskPage");
    var sec = $("#sec-" + id);
    if (!page || !sec) return;
    // offsetTop is layout-based, so it stays correct while the device is scaled
    page.scrollTo({ top: Math.max(0, sec.offsetTop - page.offsetTop), behavior: reduced ? "auto" : "smooth" });
  }

  function buildKeyDeck() {
    var rows = [
      new Array(15).fill(""),
      ["k-wide"].concat(new Array(13).fill("")),
      new Array(13).fill("").concat(["k-wide"]),
      ["k-wide"].concat(new Array(11).fill("")).concat(["k-wide"]),
      new Array(4).fill("").concat(["k-space"]).concat(new Array(5).fill(""))
    ];
    $("#keyDeck").innerHTML = rows.map(function (r) {
      return r.map(function (c) { return "<i" + (c ? ' class="' + c + '"' : "") + "></i>"; }).join("");
    }).join("");
  }

  /* ══ sizing: keep whichever device is on screen fully visible ═══════════ */
  function px(el, prop, fallback) {
    var v = parseFloat(getComputedStyle(el).getPropertyValue(prop));
    return isFinite(v) && v > 0 ? v : fallback;
  }

  function fit() {
    var hud = $(".deck__hud");
    var hudH = (hud && hud.offsetHeight) || 46;
    var availW = window.innerWidth - 24;
    var availH = window.innerHeight - hudH - 24;

    var phone = $("#devicePhone");
    var laptop = $("#deviceLaptop");
    var lw = px(laptop, "--dw", 1180), lh = px(laptop, "--dh", 872);

    var laptopFit = Math.min(1, availW / lw, availH / lh);
    // below ~0.6 the desktop text stops being readable, so the frame goes slim
    var compact = window.innerWidth < 880 || laptopFit < 0.6;
    document.body.dataset.compact = compact ? "1" : "0";

    phone.style.setProperty("--fit",
      Math.min(1, availW / px(phone, "--dw", 414), availH / px(phone, "--dh", 866)));
    laptop.style.setProperty("--fit", compact ? 1 : laptopFit);
  }

  /* ══ power-on sequences ════════════════════════════════════════════════ */
  var mode = null;          // "mobile" | "laptop"
  var booting = false;
  var skipBoot = null;      // set for the whole sequence: jumps to the end
  var runId = 0;            // bumped whenever we change stage, so stale
                            // sequences from an earlier run bail out

  function buzz() {
    var dev = mode === "mobile" ? $("#devicePhone") : $("#deviceLaptop");
    if (!dev || reduced) return;
    dev.classList.remove("is-buzzing");
    void dev.offsetWidth;
    dev.classList.add("is-buzzing");
    if (navigator.vibrate) { try { navigator.vibrate(12); } catch (e) {} }
  }

  function flash(dev) {
    var g = $('[data-role="glow"]', dev);
    if (!g) return;
    g.classList.remove("is-flashing");
    void g.offsetWidth;
    g.classList.add("is-flashing");
  }

  function showOS(dev) {
    var os = $('[data-role="os"]', dev);
    os.setAttribute("aria-hidden", "false");
    os.inert = false;
    os.classList.add("is-live");
    var scroller = dev.id === "devicePhone" ? $(".screen.is-active", dev) : $("#deskPage");
    watchReveals(scroller);
  }

  async function bootPhone(my) {
    var dev = $("#devicePhone");
    var boot = $('[data-role="boot"]', dev);
    var lock = $('[data-role="lock"]', dev);
    var gate = $('[data-role="unlock"]', dev);
    var rushed = false;
    skipBoot = function () { rushed = true; };

    boot.classList.remove("is-done");
    boot.classList.add("is-running");
    lock.classList.remove("is-shown", "is-open");
    lock.inert = false;
    $('[data-role="os"]', dev).classList.remove("is-live");

    flash(dev);
    await wait(1500);
    if (my !== runId) return;

    boot.classList.add("is-done");
    lock.classList.add("is-shown");
    buzz();

    // wait for a swipe, a tap or a key — or open by itself after a beat
    if (!rushed) {
      await new Promise(function (resolve) {
        var done = false;
        var startY = null;
        function finish() {
          if (done) return;
          done = true;
          clearTimeout(timer);
          gate.removeEventListener("pointerdown", onDown);
          gate.removeEventListener("pointerup", onUp);
          gate.removeEventListener("click", finish);
          resolve();
        }
        function onDown(e) { startY = e.clientY; }
        function onUp(e) { if (startY !== null && startY - e.clientY > 18) finish(); startY = null; }
        gate.addEventListener("pointerdown", onDown);
        gate.addEventListener("pointerup", onUp);
        gate.addEventListener("click", finish);
        skipBoot = finish;
        var timer = setTimeout(finish, reduced ? 10 : 2400);
      });
    }
    skipBoot = null;
    if (my !== runId) return;

    lock.classList.add("is-open");
    lock.inert = true;
    buzz();
    await wait(180);
    if (my !== runId) return;
    showOS(dev);
    await wait(500);
  }

  async function bootLaptop(my) {
    var dev = $("#deviceLaptop");
    var boot = $('[data-role="boot"]', dev);
    var log = $('[data-role="bootlog"]', dev);
    var compact = document.body.dataset.compact === "1";
    var rushed = false;
    skipBoot = function () { rushed = true; };

    boot.classList.remove("is-done");
    log.innerHTML = "";
    $('[data-role="os"]', dev).classList.remove("is-live");

    if (!compact && !reduced) {
      dev.classList.add("is-closed");
      void dev.offsetWidth;
      await wait(120);
      if (my !== runId) return;
      dev.classList.remove("is-closed");
      await wait(820);
    } else {
      dev.classList.remove("is-closed");
    }
    if (my !== runId) return;

    flash(dev);
    await wait(220);
    if (my !== runId) return;

    var lines = D.bootLog || [];
    for (var i = 0; i < lines.length; i++) {
      if (rushed) { log.textContent = lines.join("\n"); break; }
      log.innerHTML = lines.slice(0, i).map(esc).join("\n") + (i ? "\n" : "") +
        "<b>" + esc(lines[i]) + "</b><i></i>";
      await wait(i === lines.length - 1 ? 420 : 240);
      if (my !== runId) return;
    }
    skipBoot = null;
    boot.classList.add("is-done");
    await wait(160);
    if (my !== runId) return;
    showOS(dev);
    await wait(500);
  }

  /* ══ stage transitions ═════════════════════════════════════════════════ */
  var LABEL = { mobile: "📱 Mobile", laptop: "💻 Laptop" };

  async function enter(device) {
    if (booting) return;
    booting = true;
    var my = ++runId;
    mode = device;

    document.body.dataset.stage = "leaving";
    await wait(reduced ? 0 : 430);
    if (my !== runId) return;

    $("#chooser").inert = true;
    $("#devicePhone").hidden  = device !== "mobile";
    $("#deviceLaptop").hidden = device !== "laptop";
    $("#deck").hidden = false;
    fit();
    document.body.dataset.stage = "device";

    $("#hudDevice").textContent = LABEL[device];
    var m = $(".appbar__mode");
    if (m) m.textContent = LABEL[device];

    await wait(reduced ? 0 : 320);
    if (my !== runId) return;

    if (device === "mobile") { await bootPhone(my); } else { await bootLaptop(my); }
    if (my !== runId) return;

    booting = false;
    var first = device === "mobile" ? $("#mobileTabs button") : $("#deskNav button");
    if (first) first.focus({ preventScroll: true });
    if (device === "laptop" && document.body.dataset.compact === "1") {
      toast("Small screen, so the laptop frame slims down to keep the text readable.", 4200);
    }
  }

  async function backToChooser() {
    var prev = mode;
    runId++;                       // stale boot sequences stop where they are
    if (skipBoot) { skipBoot(); skipBoot = null; }

    document.body.dataset.stage = "leaving";
    await wait(reduced ? 0 : 380);
    document.body.dataset.stage = "choose";
    $("#chooser").inert = false;
    $("#deck").hidden = true;
    $("#devicePhone").hidden = true;
    $("#deviceLaptop").hidden = true;

    // reset both experiences so the next entry replays properly
    $$('[data-role="os"]').forEach(function (o) {
      o.classList.remove("is-live");
      o.setAttribute("aria-hidden", "true");
      o.inert = true;
    });
    $$('[data-role="boot"]').forEach(function (b) { b.classList.remove("is-done", "is-running"); });
    var lock = $('[data-role="lock"]');
    if (lock) { lock.classList.remove("is-shown", "is-open"); lock.inert = false; }
    var page = $("#deskPage"); if (page) page.scrollTop = 0;
    goTab("home", true);

    mode = null;
    booting = false;
    var btn = $(".pick--" + (prev === "laptop" ? "laptop" : "phone") + " .pick__hit");
    if (btn) btn.focus({ preventScroll: true });
  }

  /* ══ toast ═════════════════════════════════════════════════════════════ */
  var toastTimer;
  function toast(msg, ms) {
    var t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-up");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("is-up"); }, ms || 3000);
  }

  /* ══ scroll reveals, scoped to the scroll container inside the screen ══ */
  var seen = new WeakSet();
  function watchReveals(root) {
    if (!root) return;
    if (!("IntersectionObserver" in window)) {
      $$(".reveal", root).forEach(function (n) { n.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { root: root, rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    $$(".reveal", root).forEach(function (n) {
      if (seen.has(n)) return;
      seen.add(n);
      io.observe(n);
    });
  }

  function watchScrollSpy() {
    var page = $("#deskPage");
    if (!page || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var id = e.target.id.replace("sec-", "");
        $$("#deskNav button").forEach(function (b) {
          b.setAttribute("aria-current", b.dataset.scroll === id ? "true" : "false");
        });
      });
    }, { root: page, rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    SECTIONS.forEach(function (s) { var n = $("#sec-" + s.id); if (n) io.observe(n); });
  }

  /* ══ contact form: validate, then hand off to the visitor's mail app ════ */
  function wireForms() {
    $$("[data-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var ok = true;
        var firstBad = null;
        $$(".field", form).forEach(function (f) {
          var input = $("input, textarea", f);
          var err = $(".field__err", f);
          var v = input.value.trim();
          var msg = "";
          if (!v) msg = "This one is needed.";
          else if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = "That email doesn't look right.";
          f.classList.toggle("is-bad", !!msg);
          input.setAttribute("aria-invalid", msg ? "true" : "false");
          err.textContent = msg;
          err.hidden = !msg;
          if (msg) { ok = false; if (!firstBad) firstBad = input; }
        });
        if (!ok) { buzz(); if (firstBad) firstBad.focus(); return; }
        var d = new FormData(form);
        var subject = "Portfolio message from " + d.get("name");
        var body = d.get("message") + "\n\n— " + d.get("name") + " (" + d.get("email") + ")";
        window.location.href = "mailto:" + D.contact.email +
          "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        toast("Opening your mail app with the message ready.");
        form.reset();
      });
    });
  }

  /* ══ clocks ════════════════════════════════════════════════════════════ */
  function tick() {
    var now = new Date();
    var h = now.getHours(), m = String(now.getMinutes()).padStart(2, "0");
    var h12 = h % 12 || 12;
    var t = h12 + ":" + m;
    $$('[data-role="locktime"], [data-role="ostime"]').forEach(function (n) { n.textContent = t; });
    var ld = $('[data-role="lockdate"]');
    if (ld) {
      ld.textContent = now.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
    }
  }

  // re-read the clock on the minute boundary, so it is never a minute stale
  function scheduleTick() {
    var now = new Date();
    var toMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
    setTimeout(function () { tick(); scheduleTick(); }, toMinute + 40);
  }

  /* ══ boot the page ═════════════════════════════════════════════════════ */
  function init() {
    buildMobile();
    buildDesktop();
    buildKeyDeck();
    wireForms();
    watchScrollSpy();
    tick();
    scheduleTick();
    fit();

    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(fit, 120); });

    $$("[data-device]").forEach(function (b) {
      b.addEventListener("click", function () { enter(b.dataset.device); });
    });
    $$("[data-switch]").forEach(function (b) {
      b.addEventListener("click", backToChooser);
    });

    // mobile tab bar + in-page jumps
    document.addEventListener("click", function (e) {
      var tab = e.target.closest("[data-tab]");
      if (tab) { goTab(tab.dataset.tab); return; }
      var goto = e.target.closest("[data-goto]");
      if (goto) { goTab(goto.dataset.goto); return; }
      var jump = e.target.closest("[data-scroll]");
      if (jump) { scrollToSection(jump.dataset.scroll); return; }
      var pane = e.target.closest("[data-pane]");
      if (pane) {
        var wantP = pane.dataset.pane === "p";
        $("#pane-p").hidden = !wantP;
        $("#pane-e").hidden = wantP;
        $$("[data-pane]").forEach(function (b) { b.setAttribute("aria-selected", b === pane ? "true" : "false"); });
        watchReveals($(".screen.is-active"));
        buzz();
      }
    });

    // reveals inside each mobile screen, as it becomes the active one
    var screensHost = $("#mobileScreens");
    if (screensHost) {
      $$(".screen", screensHost).forEach(function (s) {
        s.addEventListener("transitionend", function (e) {
          // ignore bubbled transitions from cards inside the screen
          if (e.target !== s || e.propertyName !== "opacity") return;
          if (s.classList.contains("is-active")) watchReveals(s);
        });
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.dataset.stage === "device") { backToChooser(); return; }
      if (booting && skipBoot && (e.key === "Enter" || e.key === " ")) { skipBoot(); }
    });

    // clicking the phone screen mid-boot skips ahead
    $$(".phone__screen, .laptop__screen").forEach(function (s) {
      s.addEventListener("click", function () { if (booting && skipBoot) skipBoot(); });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
