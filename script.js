/* script.js
   - typing effect
   - animate skill bars when in viewport
   - simple contact form handler
   - small nav toggle for mobile
*/

// Typing effect
const words = ["UI Developer", "Digital Marketer", "SEO • SEM Specialist", "MCA — Fresher"];
let wIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById("typed");
const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function typeLoop() {
  const word = words[wIndex];
  if (!deleting) {
    typedEl.textContent = word.slice(0, ++charIndex);
    if (charIndex === word.length) {
      deleting = true;
      await delay(900);
    }
  } else {
    typedEl.textContent = word.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      wIndex = (wIndex + 1) % words.length;
      await delay(200);
    }
  }
  setTimeout(typeLoop, deleting ? 50 : 120);
}
typeLoop();

// Skill bars animation when visible
function animateSkillBars() {
  const spans = document.querySelectorAll(".bar span");
  const triggerAt = window.innerHeight * 0.85;
  spans.forEach(span => {
    const rect = span.getBoundingClientRect();
    if (rect.top < triggerAt) {
      const pct = span.getAttribute("data-percent") || 80;
      span.style.width = pct + "%";
    }
  });
}
window.addEventListener("scroll", animateSkillBars);
window.addEventListener("load", animateSkillBars);

// Contact form: simple validation + mailto fallback
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.currentTarget;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  if (!name || !email || !message) {
    alert("Please fill all fields.");
    return;
  }

  // Try to open user's default email client with prefilled content
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
  window.location.href = `mailto:mani.sandaka18@gmail.com?subject=${subject}&body=${body}`;

  // reset form after short delay
  setTimeout(()=> form.reset(), 700);
});

// Simple nav toggle for mobile
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    if (navLinks.style.display === "flex") {
      navLinks.style.display = "none";
    } else {
      navLinks.style.display = "flex";
      navLinks.style.flexDirection = "column";
      navLinks.style.position = "absolute";
      navLinks.style.right = "1.2rem";
      navLinks.style.top = "72px";
      navLinks.style.background = "rgba(6,12,18,0.9)";
      navLinks.style.padding = "0.8rem";
      navLinks.style.borderRadius = "8px";
    }
  });
}