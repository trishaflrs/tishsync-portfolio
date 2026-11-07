/* =========================================================
   TishSync – script.js
   1) CONFIG: your contact links (edit the two values below)
   2) Mobile menu
   3) Image viewer for the portfolio galleries
   ========================================================= */

const CONFIG = {
  // ✏️ EDIT HERE: your professional email address
  email: "trishamaeflores24@gmail.com",

  // ✏️ EDIT HERE: your full LinkedIn profile link
  linkedin: "https://www.linkedin.com/in/trisha-mae-flores-400331430"
};

/* ---------- 1) Fill in the contact links ---------- */
(function () {
  var emailLinks = document.querySelectorAll("[data-email-link]");
  var emailTexts = document.querySelectorAll("[data-email-text]");
  var linkedinLinks = document.querySelectorAll("[data-linkedin-link]");

  if (CONFIG.email) {
    var mailto = "mailto:" + CONFIG.email;
    emailLinks.forEach(function (el) { el.setAttribute("href", mailto); });
    emailTexts.forEach(function (el) { el.textContent = CONFIG.email; });
  }

  if (CONFIG.linkedin) {
    linkedinLinks.forEach(function (el) {
      el.setAttribute("href", CONFIG.linkedin);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });
  }
})();

/* ---------- 2) Mobile menu ---------- */
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.querySelector(".nav-toggle-label").textContent = open ? "Close" : "Menu";
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });

  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
})();

/* ---------- 3) Image viewer ---------- */
(function () {
  var dlg = document.getElementById("lightbox");
  if (!dlg || typeof dlg.showModal !== "function") return; // links still open the image normally

  var img = dlg.querySelector(".lb-stage img");
  var caption = dlg.querySelector(".lb-caption");
  var count = dlg.querySelector(".lb-count");
  var full = dlg.querySelector(".lb-full");
  var prev = dlg.querySelector(".lb-prev");
  var next = dlg.querySelector(".lb-next");
  var closeBtn = dlg.querySelector(".lb-close");

  var items = [];
  var index = 0;
  var opener = null;

  function show(i) {
    index = (i + items.length) % items.length;
    var link = items[index];
    var thumb = link.querySelector("img");
    img.src = link.getAttribute("href");
    img.alt = thumb ? thumb.alt : "";
    caption.textContent = link.getAttribute("data-caption") || "";
    full.href = link.getAttribute("href");
    var many = items.length > 1;
    prev.hidden = !many;
    next.hidden = !many;
    count.textContent = many ? (index + 1) + " of " + items.length : "";
  }

  document.addEventListener("click", function (e) {
    var link = e.target.closest("a.shot");
    if (!link) return;
    e.preventDefault();
    var group = link.getAttribute("data-gallery");
    items = Array.prototype.slice.call(
      document.querySelectorAll('a.shot[data-gallery="' + group + '"]')
    );
    opener = link;
    show(items.indexOf(link));
    dlg.showModal();
  });

  prev.addEventListener("click", function () { show(index - 1); });
  next.addEventListener("click", function () { show(index + 1); });
  closeBtn.addEventListener("click", function () { dlg.close(); });

  // click on the dark backdrop closes the viewer
  dlg.addEventListener("click", function (e) {
    if (e.target === dlg) dlg.close();
  });

  dlg.addEventListener("keydown", function (e) {
    if (items.length < 2) return;
    if (e.key === "ArrowLeft") { show(index - 1); }
    if (e.key === "ArrowRight") { show(index + 1); }
  });

  // return keyboard focus to the image you opened
  dlg.addEventListener("close", function () {
    img.removeAttribute("src");
    if (opener) opener.focus();
  });
})();

/* ---------- 4) Portrait reel viewer ---------- */
(function () {
  var dlg = document.getElementById("reel-viewer");
  if (!dlg || typeof dlg.showModal !== "function") return;

  var player = dlg.querySelector(".reel-video");
  var count = dlg.querySelector(".reel-count");
  var prev = dlg.querySelector(".reel-prev");
  var next = dlg.querySelector(".reel-next");
  var closeBtn = dlg.querySelector(".reel-close");
  var cards = Array.prototype.slice.call(document.querySelectorAll(".video-card video"));
  var index = 0;
  var opener = null;

  function load(i) {
    index = (i + cards.length) % cards.length;
    var source = cards[index].querySelector("source");
    player.src = source.getAttribute("src");
    player.poster = cards[index].getAttribute("poster") || "";
    player.setAttribute("aria-label", cards[index].getAttribute("aria-label") || "Video");
    count.textContent = (index + 1) + " of " + cards.length;
    var p = player.play();
    if (p && p.catch) p.catch(function () {});
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".reel-open");
    if (!btn) return;
    cards.forEach(function (v) { v.pause(); });
    opener = btn;
    dlg.showModal();
    load(parseInt(btn.getAttribute("data-reel"), 10));
  });

  prev.addEventListener("click", function () { load(index - 1); });
  next.addEventListener("click", function () { load(index + 1); });
  closeBtn.addEventListener("click", function () { dlg.close(); });
  player.addEventListener("ended", function () { load(index + 1); });

  dlg.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") load(index - 1);
    if (e.key === "ArrowRight") load(index + 1);
  });

  dlg.addEventListener("click", function (e) {
    if (e.target === dlg) dlg.close();
  });

  dlg.addEventListener("close", function () {
    player.pause();
    player.removeAttribute("src");
    player.load();
    if (opener) opener.focus();
  });
})();