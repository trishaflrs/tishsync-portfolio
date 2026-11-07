/* =========================================================
   TishSync – script.js
   This is the ONLY file you need to edit to add your
   contact links. Change the two values below, save, and
   refresh the page.
   ========================================================= */

const CONFIG = {
  // ✏️ EDIT HERE: your professional email address, e.g. "name@yourdomain.com"
  // Leave the quotes empty ("") until you have one.
  email: "",

  // ✏️ EDIT HERE: your full LinkedIn profile link, e.g. "https://www.linkedin.com/in/your-name"
  // Leave the quotes empty ("") until you have one.
  linkedin: ""
};

/* ---------- Everything below fills in the links automatically ---------- */
(function () {
  var ctaEmail = document.getElementById("cta-email");
  var emailCard = document.getElementById("contact-email");
  var emailText = document.getElementById("contact-email-text");
  var linkedinCard = document.getElementById("contact-linkedin");
  var linkedinText = document.getElementById("contact-linkedin-text");

  if (CONFIG.email) {
    var mailto = "mailto:" + CONFIG.email;
    if (ctaEmail) ctaEmail.setAttribute("href", mailto);
    if (emailCard) emailCard.setAttribute("href", mailto);
    if (emailText) emailText.textContent = CONFIG.email;
  }

  if (CONFIG.linkedin && linkedinCard) {
    linkedinCard.setAttribute("href", CONFIG.linkedin);
    linkedinCard.setAttribute("target", "_blank");
    linkedinCard.setAttribute("rel", "noopener noreferrer");
    if (linkedinText) linkedinText.textContent = "View my LinkedIn profile";
  }
})();
