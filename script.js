// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  createStars();
  createFloatingDots();
  initializeEventListeners();
});

// Create animated stars
function createStars() {
  const starsContainer = document.getElementById("starsContainer");
  const numberOfStars = 50;

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.innerHTML = "★";

    // Random position
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    // Random size
    const size = Math.random() * 8 + 4;
    star.style.fontSize = size + "px";

    // Random animation delay and duration
    star.style.animationDelay = Math.random() * 3 + "s";
    star.style.animationDuration = 2 + Math.random() * 2 + "s";

    starsContainer.appendChild(star);
  }
}

// Create floating dots
function createFloatingDots() {
  const floatingDotsContainer = document.getElementById("floatingDots");
  const numberOfDots = 20;

  for (let i = 0; i < numberOfDots; i++) {
    const dot = document.createElement("div");
    dot.className = "floating-dot";

    // Random position
    dot.style.left = Math.random() * 100 + "%";
    dot.style.top = Math.random() * 100 + "%";

    // Random animation delay and duration
    dot.style.animationDelay = Math.random() * 4 + "s";
    dot.style.animationDuration = 3 + Math.random() * 2 + "s";

    floatingDotsContainer.appendChild(dot);
  }
}

// Initialize event listeners
function initializeEventListeners() {
  // Share button functionality
  const shareBtn = document.getElementById("shareBtn");
  shareBtn.addEventListener("click", handleShare);

  // Floating WhatsApp button functionality
  const floatingWhatsApp = document.getElementById("floatingWhatsApp");
  floatingWhatsApp.addEventListener("click", handleWhatsApp);

  // Add pulse effect on page load
  setTimeout(() => {
    floatingWhatsApp.classList.add("pulse");
  }, 2000);

  // Remove pulse effect after first interaction
  floatingWhatsApp.addEventListener("click", () => {
    floatingWhatsApp.classList.remove("pulse");
  });

  // Settings button functionality
  const settingsBtn = document.getElementById("settingsBtn");
  settingsBtn.addEventListener("click", handleSettings);

  // Add click effects to link buttons
  const linkBtns = document.querySelectorAll(".link-btn");
  linkBtns.forEach((btn) => {
    btn.addEventListener("click", handleLinkClick);
    btn.addEventListener("mouseenter", createSparkleEffect);
  });
}

// Handle share functionality
async function handleShare() {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      showCopyNotification();
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      showCopyNotification();
    }
  } catch (err) {
    console.error("Failed to copy: ", err);
    // Fallback notification
    alert("Link: " + window.location.href);
  }
}

// Show copy notification
function showCopyNotification() {
  const notification = document.getElementById("copyNotification");
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Handle WhatsApp button
function handleWhatsApp() {
  const message = encodeURIComponent(
    "Halo, saya tertarik dengan layanan AC Anda!"
  );
  const phoneNumber = "628986254466"; // Replace with actual phone number
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappUrl, "_blank");
}

// Handle settings button
function handleSettings() {
  alert("Settings functionality coming soon!");
}

// Handle link clicks with analytics
function handleLinkClick(event) {
  const linkText = event.currentTarget.querySelector("span").textContent;
  console.log("Link clicked:", linkText);

  // Add your analytics tracking here
  // Example: gtag('event', 'click', { 'event_category': 'link', 'event_label': linkText });

  // Create ripple effect
  createRippleEffect(event);
}

// Create sparkle effect on hover
function createSparkleEffect(event) {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle-effect";
      sparkle.innerHTML = "✨";
      sparkle.style.position = "absolute";
      sparkle.style.left = rect.left + Math.random() * rect.width + "px";
      sparkle.style.top = rect.top + Math.random() * rect.height + "px";
      sparkle.style.fontSize = Math.random() * 10 + 10 + "px";
      sparkle.style.zIndex = "1000";

      document.body.appendChild(sparkle);

      setTimeout(() => {
        document.body.removeChild(sparkle);
      }, 1000);
    }, i * 100);
  }
}

// Create ripple effect on click
function createRippleEffect(event) {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();
  const ripple = document.createElement("div");

  ripple.style.position = "absolute";
  ripple.style.borderRadius = "50%";
  ripple.style.background = "rgba(255, 255, 255, 0.6)";
  ripple.style.transform = "scale(0)";
  ripple.style.animation = "ripple 0.6s linear";
  ripple.style.left = event.clientX - rect.left - 25 + "px";
  ripple.style.top = event.clientY - rect.top - 25 + "px";
  ripple.style.width = "50px";
  ripple.style.height = "50px";
  ripple.style.pointerEvents = "none";

  button.style.position = "relative";
  button.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Add ripple animation CSS
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Add intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe link buttons for scroll animations
document.querySelectorAll(".link-btn").forEach((btn) => {
  btn.style.opacity = "0";
  btn.style.transform = "translateY(20px)";
  btn.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(btn);
});
