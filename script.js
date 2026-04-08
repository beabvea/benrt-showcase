document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // HERO IMAGE SWITCH (ADDED HERE ✅ SAFE)
  // =========================
  const heroImg = document.getElementById("hero-img");

  function updateHeroImage(theme) {
    if (!heroImg) return;

    heroImg.style.opacity = 0;

    setTimeout(() => {
      if (theme === "dark") {
        heroImg.src = "images/headshot_tulio_photoroom.png";
      } else {
        heroImg.src = "images/headshot_tulio.png";
      }

      heroImg.style.opacity = 1;
    }, 200);
  }

  // =========================
  // SMOOTH SCROLL WITH CONTROLLED SPEED
  // =========================
  function smoothScroll(targetSelector, duration = 1200) {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    const start = window.scrollY;
    const end = target.offsetTop;
    const distance = end - start;
    const startTime = performance.now();

    function scrollAnimation(currentTime) {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, start + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(scrollAnimation);
      }
    }

    requestAnimationFrame(scrollAnimation);
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      smoothScroll(this.getAttribute("href"), 1200);
    });
  });

  // =========================
  // SCROLL SPY
  // =========================
  const navLinks = document.querySelectorAll(".nav-links a");
  const allSections = document.querySelectorAll("section[id], .project-section");

  function updateNav() {
    let currentSectionId = "";

    allSections.forEach(section => {
      const top = section.offsetTop - 120;
      const bottom = top + section.offsetHeight;

      if (window.scrollY >= top && window.scrollY < bottom) {
        currentSectionId = section.id;
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute("href").substring(1);
      link.classList.toggle("active", href === currentSectionId);
    });
  }

  window.addEventListener("scroll", updateNav);
  window.addEventListener("resize", updateNav);
  updateNav();

  // =========================
  // PROJECT NAV
  // =========================
  const projectSections = document.querySelectorAll(".project-section");
  const projectNavLinks = document.querySelectorAll(".project-nav a");

  function updateProjectNav() {
    let currentProject = "";
    projectSections.forEach(proj => {
      const top = proj.offsetTop - 120;
      const bottom = top + proj.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        currentProject = proj.id;
      }
    });

    projectNavLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + currentProject);
    });
  }

  window.addEventListener("scroll", updateProjectNav);
  updateProjectNav();

  // =========================
  // FADE-IN
  // =========================
  const elements = document.querySelectorAll(".section, .hero-text, .hero-image, .project-section");

  function isInViewport(el, offset = 100) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight - offset && rect.bottom > offset;
  }

  function handleFade() {
    elements.forEach(el => {
      if (isInViewport(el)) {
        el.classList.add("show");
      } else {
        el.classList.remove("show");
      }
    });
  }

  window.addEventListener("scroll", handleFade);
  window.addEventListener("resize", handleFade);
  handleFade();

  // =========================
  // ALBUM
  // =========================
  const slides = document.querySelectorAll(".album-slide");
  const prevBtn = document.querySelector(".album-btn.prev");
  const nextBtn = document.querySelector(".album-btn.next");
  const dotsContainer = document.querySelector(".album-dots");

  let index = 0;

  if (slides.length && prevBtn && nextBtn && dotsContainer) {

    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.addEventListener("click", () => showSlide(i));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".album-dots span");

    function showSlide(i) {
      slides.forEach(s => s.classList.remove("active"));
      dots.forEach(d => d.classList.remove("active"));

      index = (i + slides.length) % slides.length;

      slides[index].classList.add("active");
      dots[index].classList.add("active");
    }

    prevBtn.addEventListener("click", () => showSlide(index - 1));
    nextBtn.addEventListener("click", () => showSlide(index + 1));

    showSlide(0);
  }

  // =========================
  // LIGHTBOX
  // =========================
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");

  if (lightbox && lightboxImg && closeBtn) {

    document.querySelectorAll(".album-slide img").forEach(img => {
      img.addEventListener("click", () => {
        lightbox.classList.add("show");
        lightboxImg.src = img.src;
      });
    });

    closeBtn.addEventListener("click", () => {
      lightbox.classList.remove("show");
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("show");
      }
    });
  }


});


// =========================
// THEME TOGGLE + HERO IMAGE FIX (FINAL)
// =========================
const themeBox = document.getElementById("themeBox");
const themeIndicator = document.getElementById("themeIndicator");
const options = themeBox.querySelectorAll(".theme-option");
const darkIcon = themeBox.querySelector('.theme-option[data-theme="dark"] i');

// ✅ IMAGE SWITCH FUNCTION
function updateHeroImage(theme) {
  const heroImg = document.getElementById("hero-img");
  if (!heroImg) {
    console.log("hero-img NOT FOUND");
    return;
  }

  console.log("Switching theme:", theme);

  heroImg.style.opacity = 0;

  setTimeout(() => {
    if (theme === "dark") {
      heroImg.src = "images/headshot_tulio_photoroom.png"; // ✅ PNG
    } else {
      heroImg.src = "images/headshot_tulio.png";
    }

    heroImg.style.opacity = 1;
  }, 200);
}

function setTheme(theme) {
  options.forEach(opt => opt.classList.toggle("active", opt.dataset.theme === theme));

  document.body.classList.toggle("dark", theme === "dark");
  document.body.classList.toggle("dim", theme === "dim");

  localStorage.setItem("theme", theme);

  themeIndicator.style.transform =
    theme === "dim" ? "translateX(0px)" : "translateX(28px)";

  darkIcon.style.color = theme === "dark" ? "#facc15" : "white";

  // 🔥 SWITCH IMAGE
  updateHeroImage(theme);
}

// CLICK
options.forEach(opt => {
  opt.addEventListener("click", () => setTheme(opt.dataset.theme));
});

// ✅ LOAD AFTER DOM (IMPORTANT)
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme") || "dim";
  setTheme(savedTheme);
});


// =========================
// TYPING EFFECT
// =========================
const typingText = document.getElementById("typing-text");
const text = "Junior IT Professional";
let index = 0;
let forward = true;
let speed = 80;
let pause = 1000;

function typeWriter() {
  if (forward) {
    typingText.textContent = text.substring(0, index + 1);
    index++;
    if (index === text.length) {
      forward = false;
      setTimeout(typeWriter, pause);
      return;
    }
  } else {
    typingText.textContent = text.substring(0, index - 1);
    index--;
    if (index === 0) {
      forward = true;
    }
  }

  setTimeout(typeWriter, forward ? speed : speed / 2);
}

document.addEventListener("DOMContentLoaded", () => {
  typingText.classList.add("typing");
  typeWriter();
});


