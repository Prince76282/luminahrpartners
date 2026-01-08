// Preloader
window.addEventListener("load", function () {
  const preloader = document.querySelector(".preloader");

  setTimeout(() => {
    preloader.classList.add("fade-out");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }, 1500);
});

// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  const backToTop = document.getElementById("backToTop");

  if (window.scrollY > 100) {
    header.classList.add("scrolled");
    backToTop.classList.add("visible");
  } else {
    header.classList.remove("scrolled");
    backToTop.classList.remove("visible");
  }
});
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const id = this.getAttribute("href");
    if (id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();

    const headerHeight = document.getElementById("header").offsetHeight;
    const y =
      target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    window.scrollTo({ top: y, behavior: "smooth" });
  });
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mainNav = document.getElementById("mainNav");

mobileMenuBtn.addEventListener("click", function () {
  mainNav.classList.toggle("active");

  // Change icon
  const icon = mobileMenuBtn.querySelector("i");
  if (mainNav.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
    document.body.style.overflow = "hidden";
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
    document.body.style.overflow = "auto";
  }
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    mainNav.classList.remove("active");
    mobileMenuBtn.querySelector("i").classList.remove("fa-times");
    mobileMenuBtn.querySelector("i").classList.add("fa-bars");
    document.body.style.overflow = "auto";
  });
});

// Back to top button
const backToTopBtn = document.getElementById("backToTop");
backToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Floating contact button
const floatingContactBtn = document.querySelector(".floating-contact-btn");
floatingContactBtn.addEventListener("click", function () {
  document.getElementById("contact").scrollIntoView({
    behavior: "smooth",
  });
});

// Form submission
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Simple validation
    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    // In a real application, you would send this data to a server
    // For this demo, we'll show a success animation
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
      submitBtn.style.background = "linear-gradient(135deg, #28a745, #20c997)";

      // Reset after 3 seconds
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background =
          "linear-gradient(135deg, var(--primary-blue), var(--deep-purple))";
        contactForm.reset();
      }, 3000);
    }, 1500);
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();

      // Calculate offset for header
      const headerHeight = document.getElementById("header").offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Count-up animation for stats
function animateCountUp() {
  const statItems = document.querySelectorAll(".stat-item.count-up");

  statItems.forEach((item) => {
    const count = parseInt(item.getAttribute("data-count"));
    const statNumber = item.querySelector(".stat-number");
    const suffix = statNumber.textContent.includes("%") ? "%" : "";

    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = count / (duration / 16); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= count) {
        statNumber.textContent = count + suffix;
        clearInterval(timer);
      } else {
        statNumber.textContent = Math.floor(start) + suffix;
      }
    }, 16);
  });
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const element = entry.target;

      // Add animation class based on existing classes
      if (
        element.classList.contains("fade-in-up") ||
        element.classList.contains("fade-in-right") ||
        element.classList.contains("slide-in-left") ||
        element.classList.contains("slide-in-right") ||
        element.classList.contains("slide-in-up") ||
        element.classList.contains("zoom-in") ||
        element.classList.contains("scale-in") ||
        element.classList.contains("rotate-in")
      ) {
        element.style.animationPlayState = "running";
      }

      // Handle elements with data-delay attribute
      const delay = element.getAttribute("data-delay");
      if (delay) {
        element.style.animationDelay = `${delay}s`;
      }

      // Handle count-up animation for stats
      if (
        element.classList.contains("stat-item") &&
        element.classList.contains("count-up")
      ) {
        if (!element.classList.contains("animated")) {
          element.classList.add("animated");
          animateCountUp();
        }
      }

      // Add a class to mark as animated
      element.classList.add("animated");
    }
  });
}, observerOptions);

// Observe all animated elements
document
  .querySelectorAll(
    ".fade-in-up, .fade-in-right, .slide-in-left, .slide-in-right, .slide-in-up, .zoom-in, .scale-in, .rotate-in, .stat-item"
  )
  .forEach((el) => {
    // Set initial animation state to paused
    if (
      el.classList.contains("fade-in-up") ||
      el.classList.contains("fade-in-right") ||
      el.classList.contains("slide-in-left") ||
      el.classList.contains("slide-in-right") ||
      el.classList.contains("slide-in-up") ||
      el.classList.contains("zoom-in") ||
      el.classList.contains("scale-in") ||
      el.classList.contains("rotate-in")
    ) {
      el.style.animationPlayState = "paused";
    }

    // Apply custom delay if specified
    const delay = el.getAttribute("data-delay");
    if (delay) {
      el.style.animationDelay = `${delay}s`;
    }

    observer.observe(el);
  });

// Add hover animation to service cards
const serviceCards = document.querySelectorAll(".service-card");
serviceCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px)";
    this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.1)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "var(--shadow)";
  });
});

// Add hover animation to client logos
const clientLogos = document.querySelectorAll(".client-logo");
clientLogos.forEach((logo) => {
  logo.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px)";
    this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.1)";
  });

  logo.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "var(--shadow)";
  });
});

// Newsletter form submission
const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const submitBtn = newsletterForm.querySelector("button");

    if (!emailInput.value) {
      emailInput.style.borderColor = "#dc3545";
      return;
    }

    // Simulate subscription
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i>';
      emailInput.value = "";
      emailInput.placeholder = "Subscribed!";

      // Reset after 3 seconds
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
        emailInput.placeholder = "Your Email";
      }, 3000);
    }, 1500);
  });
}

// Initialize animations on page load
window.addEventListener("DOMContentLoaded", function () {
  // Trigger typing animation for hero title
  const heroTitle = document.querySelector(".typing-animation");
  if (heroTitle) {
    // Add a cursor after the animation completes
    setTimeout(() => {
      heroTitle.style.borderRight = "none";
    }, 3500);
  }

  // Trigger initial animations after a delay
  setTimeout(() => {
    document
      .querySelectorAll(
        ".fade-in-up, .fade-in-right, .slide-in-left, .slide-in-right, .slide-in-up, .zoom-in, .scale-in, .rotate-in"
      )
      .forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.style.animationPlayState = "running";
          el.classList.add("animated");
        }
      });
  }, 500);
});

// Parallax effect for hero section
window.addEventListener("scroll", function () {
  const hero = document.querySelector(".hero");
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;

  if (hero) {
    hero.style.backgroundPosition = `center ${rate}px`;
  }
});

// Add ripple effect to buttons
const buttons = document.querySelectorAll(
  ".btn-primary, .btn-secondary, .social-link"
);
buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const x = e.clientX - e.target.getBoundingClientRect().left;
    const y = e.clientY - e.target.getBoundingClientRect().top;

    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn, .social-link {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);
